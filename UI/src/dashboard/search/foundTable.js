import React, { Component } from 'react'
import Style from './search.scss'
import moment from 'moment'
import { RESOURCES } from '../../config/attributes'

export default class FoundTable extends Component {
    constructor(props){
        super(props)
        this.container = this.props.searchContainer

        let ascTemp = [true]
        RESOURCES.map((data,key)=>{
            ascTemp.push(true)
        })
        this.state = {
            dataResult: this.container.state.dataResult,
            sort: {
                select: 0,
                asc: ascTemp
            },
            hover: null
        }
    }

    onSelect(name,key){
        this.setState({
            hover: key
        })
        this.props.searchContainer.onSelectItem(name,key)
    }

    onSort(index, parameter=null){
        let asc = this.state.sort.asc
        asc[index] = !asc[index]
        this.setState({
            sort:{
                select: index,
                asc: asc
            }
        })

        if(index==0){
            if(asc[index]){
                this.container.getAscSortByName(this.state.dataResult)
            }else{
                this.container.getDescSortByName(this.state.dataResult)
            }
        }else{
            if(asc[index]){
                this.container.getAscSort(this.state.dataResult, parameter)
            }else{
                this.container.getDescSort(this.state.dataResult, parameter)
            }
        }
    }

    render() {
        let {dataResult, sort} = this.state
        
        let data = this.props.searchContainer.state
        let startDate = moment(data.startDate.date+' '+data.startTime).format('DD-MMM-YYYY HH:mm').toUpperCase()
        let endDate = moment(data.endDate.date+' '+data.endTime).format('DD-MMM-YYYY HH:mm').toUpperCase() 
        let startDateLength = data.startDate.date+' '+data.startTime
        let endDateLength = data.endDate.date+' '+data.endTime

        let {reservationLength} = this.props.searchContainer.state
        let time = reservationLength.days+' days '+reservationLength.hours+' hours'
        return (
            <section>
                <div className={Style.label}>
                    <div>Search result ({dataResult.amount}):</div>
                    <div className={Style.detaillabel}>
                        <div className={Style.column1}>
                            <div>
                                <span>Begin : </span>
                                <span className={Style.hilight}>{startDate}</span>
                            </div>
                            <div>
                                <span>End : </span>
                                <span className={Style.hilight}>{endDate}</span>
                            </div>
                            <div>
                                <span>Reservation length : </span>
                                <span className={Style.hilight}>{(reservationLength.value=='all') ? this.props.searchContainer.getReservationsLength(startDateLength,endDateLength) : time}</span>
                            </div>
                            <div>
                                <span>Additional network : </span>
                                <span className={Style.hilight}>{data.additionalNetwork}</span>
                            </div>
                            <div>
                                <span>Image type : </span>
                                <span className={Style.hilight}>{data.imageType}</span>
                            </div>
                        </div>
                        <div className={Style.column2}>
                            {   
                                RESOURCES.map((resource,key)=>{
                                    return(
                                        <div key={key}>
                                            <span>{resource.name} : </span>
                                            <span className={Style.hilight}>{(data.resource[key]!='') ? data.resource[key] : 0}</span>
                                        </div>
                                    )
                                })
                            }
                            {/*<div className={Style.empty}></div>*/}
                        </div>    
                    </div>
                    <div className={Style.secondlabel}>Click on site's name for more description.</div>
                </div>
                <div className={Style.data}>
                    <div className={Style.container}>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <span className={Style.cursor} onClick={()=>this.onSort(0)}>
                                            <span>Name</span>
                                            {(sort.select==0) ? <img className={Style.icon} src={(sort.asc[0]==true) ? 'img/ic_arrow_drop_up.svg' : 'img/ic_arrow_drop_down.svg'} /> : null}
                                        </span>
                                    </th>
                                    {
                                        RESOURCES.map((data,key)=>{
                                            let unit = (data.unit!=null) ? '('+data.unit+')' : ''
                                            return(
                                                <th key={key}>
                                                    <span className={Style.cursor} onClick={()=>this.onSort((key+1), (data.parameter+'.available'))}>
                                                        <span>Available {data.name+' '+unit}</span>
                                                        {(sort.select==(key+1)) ? <img className={Style.icon} src={(sort.asc[(key+1)]==true) ? 'img/ic_arrow_drop_up.svg' : 'img/ic_arrow_drop_down.svg'} /> : null}
                                                    </span>
                                                </th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.dataResult.sites.map((data,key)=>{
                                        let list = []
                                        RESOURCES.map((temp,key)=>{
                                            try{
                                                let tempData = data[temp.parameter]["available"]
                                                if(typeof(tempData)!='undefined'){
                                                    list.push(<td key={key}>{tempData}</td>)
                                                }else{
                                                    list.push(<td key={key}>-</td>)
                                                }
                                            }catch(error){
                                                list.push(<td key={key}>-</td>)
                                            }
                                        })
                                        return(
                                            <tr className={(this.state.hover==key) ? Style.itemactive : Style.item} key={key} onClick={()=>this.onSelect(data.name,key)}>
                                                <td>{data.name}</td>
                                                {list}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        )
    }
}