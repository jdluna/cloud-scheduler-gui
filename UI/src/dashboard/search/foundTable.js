import React, { Component } from 'react'
import Style from './search.scss'
import moment from 'moment'

export default class FoundTable extends Component {
    constructor(props){
        super(props)
        this.container = this.props.searchContainer
        this.state = {
            dataResult: this.container.state.dataResult,
            sort: {
                select: 0,
                asc: [true,true,true]
            }
        }
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
                                <span>CPU : </span>
                                <span className={Style.hilight}>{(data.cpu!='') ? data.cpu : 0}</span>
                            </div>
                            <div>
                                <span>Begin : </span>
                                <span className={Style.hilight}>{startDate}</span>
                            </div>
                            <div>
                                <span>Reservation length : </span>
                                <span className={Style.hilight}>{(reservationLength.value=='all') ? this.props.searchContainer.getReservationsLength(startDateLength,endDateLength) : time}</span>
                            </div>
                            <div>
                                <span>Additional network : </span>
                                <span className={Style.hilight}>{data.additionalNetwork}</span>
                            </div>
                        </div>
                        <div className={Style.column2}>
                            <div>
                                <span>Memory : </span>
                                <span className={Style.hilight}>{(data.mem!='') ? data.mem : 0}</span>
                            </div>
                            <div>
                                <span>End : </span>
                                <span className={Style.hilight}>{endDate}</span>
                            </div>
                            <div className={Style.empty}></div>
                            <div>
                                <span>Image type : </span>
                                <span className={Style.hilight}>{data.imageType}</span>
                            </div>
                        </div>    
                    </div>
                    <div className={Style.secondlabel}>Click on site's name for more description.</div>
                </div>
                <div className={Style.data}>
                    <div className={Style.header}>
                        <div className={Style.text}>
                            <span className={Style.cursor} onClick={()=>this.onSort(0)}>
                                <span>Name</span>
                                {(sort.select==0) ? <img className={Style.icon} src={(sort.asc[0]==true) ? 'img/ic_arrow_drop_up.svg' : 'img/ic_arrow_drop_down.svg'} /> : null}
                            </span>
                        </div>
                        <div className={Style.text}>
                            <span className={Style.cursor} onClick={()=>this.onSort(1, 'CPU.available')}>
                                <span>Available CPU</span>
                                {(sort.select==1) ? <img className={Style.icon} src={(sort.asc[1]==true) ? 'img/ic_arrow_drop_up.svg' : 'img/ic_arrow_drop_down.svg'} /> : null}
                            </span>
                        </div>
                        <div className={Style.text}>
                            <span className={Style.cursor} onClick={()=>this.onSort(2, 'memory.available')}>
                                <span>Available Memory (GB)</span>
                                {(sort.select==2) ? <img className={Style.icon} src={(sort.asc[2]==true) ? 'img/ic_arrow_drop_up.svg' : 'img/ic_arrow_drop_down.svg'} /> : null}
                            </span>
                        </div>
                    </div>
                    <div className={Style.itemlist}>
                        {
                            this.state.dataResult.sites.map((data,key)=>{
                            return(
                                <div className={(this.props.searchContainer.viewCardKey==key) ? Style.itemactive : Style.item} key={key} onClick={()=>this.props.searchContainer.onSelectItem(data.name,key)}>
                                    <div className={Style.text}>{data.name}</div>
                                    <div className={Style.text}>{data.CPU.available}</div>
                                    <div className={Style.text}>{data.memory.available}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        )
    }
}