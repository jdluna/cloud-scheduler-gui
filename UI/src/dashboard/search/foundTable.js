import React, { Component } from 'react'
import Style from './search.scss'
import moment from 'moment'

export default class NotFoundTable extends Component {
    render() {
        let data = this.props.searchContainer.state
        let startDate = moment(data.startDate.date+' '+data.startTime).format('DD-MMM-YYYY HH:mm').toUpperCase()
        let endDate = moment(data.endDate.date+' '+data.endTime).format('DD-MMM-YYYY HH:mm').toUpperCase() 
        let startDateLength = data.startDate.date+' '+data.startTime
        let endDateLength = data.endDate.date+' '+data.endTime

        return (
            <section>
                <div className={Style.label}>
                    <div>Search result ({this.props.data.amount}):</div>
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
                                <span className={Style.hilight}>{this.props.searchContainer.getReservationsLength(startDateLength,endDateLength)}</span>
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
                            <span>Name</span>
                            <img className={Style.icon} src='img/ic_arrow_drop_down.svg' />
                        </div>
                        <div className={Style.text}>Available CPU</div>
                        <div className={Style.text}>Available Memory (GB)</div>
                    </div>
                    <div className={Style.itemlist}>
                        {
                            this.props.data.sites.map((data,key)=>{
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