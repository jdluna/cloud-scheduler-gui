import React, { Component } from 'react'
import Style from './search.scss'
import moment from 'moment'
import { RESOURCES } from '../../config/attributes'

const LABEL = ()=>(
    <span>
        <div className={Style.secondlabel}>Click on site's name for more description.</div>
        <div>Suggest sites which match all criterias except the available time:</div>  
    </span>    
)

export default class NotFoundTable extends Component {
    constructor(props){
        super(props)
        this.container = this.props.searchContainer

        this.state = {
            dataResult: this.container.state.dataResult,
            sort: {
                select: 0,
                asc: [true,true]
            },
            hover: null
        }
    }

    onSelect(name,key,available){
        let time = available.slice(0,16)
        this.props.searchContainer.setDateForCard(time)
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
                this.container.getAscSortByDate(this.state.dataResult, parameter)
            }else{
                this.container.getDescSortByDate(this.state.dataResult, parameter)
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
        let label 
        if(this.props.data.sites.length!=0){
            label = <LABEL/>
        }

        let {reservationLength} = this.props.searchContainer.state
        let time = reservationLength.days+' days '+reservationLength.hours+' hours'
        return (
            <section>
                <div className={Style.label}>
                    <div className={Style.firstlabel}>Search result (0): No result matches</div>
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
                    {label}
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
                                    <th>
                                        <span className={Style.cursor} onClick={()=>this.onSort(1, 'time.begin')}>
                                            <span>Available on</span>
                                            {(sort.select==1) ? <img className={Style.icon} src={(sort.asc[1]==true) ? 'img/ic_arrow_drop_up.svg' : 'img/ic_arrow_drop_down.svg'} /> : null}
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.dataResult.sites.map((data,key)=>{
                                        let temp = data.time.begin
                                        return(
                                            <tr className={(this.state.hover==key) ? Style.itemactive : Style.item} key={key} onClick={()=>this.onSelect(data.name,key,temp)}>
                                                <td className={Style.text}>{data.name}</td>
                                                <td className={Style.text}>{moment(temp.slice(0,16)+'+0000').tz(this.props.searchContainer.appContainer.state.authen.timezone).format('DD-MMM-YYYY HH:mm').toUpperCase()}</td>
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