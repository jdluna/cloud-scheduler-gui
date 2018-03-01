import React, { Component } from 'react'
import Style from './search.scss'
import moment from 'moment'
import { RESOURCES } from '../../config/attributes'

export default class FoundTable2 extends Component {

    render() {
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
                    <div>Search result (10):</div>
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
                            <div>
                                <span>CPU : </span>
                                <span className={Style.hilight}>0</span>
                            </div>
                            <div>
                                <span>Memory : </span>
                                <span className={Style.hilight}>0</span>
                            </div>
                            <div>
                                <span>Number of sites : </span>
                                <span className={Style.hilight}>None</span>
                            </div>
                        </div>    
                    </div>
                    <div className={Style.secondlabel}>Click on site's name for more description.</div>
                </div>
                <div className={Style.data}>
                        <div className={Style.cardResult}>
                            <span className={Style.siteName}>B1<span className={Style.region}>(Thailand)</span></span>
                            <br/>
                            <span className={Style.date}>01-MAR-2018 13:00 <span>to</span> 01-MAR-2018 16:00</span>
                            <div className={Style.detail}>
                                <div>
                                    <span>CPU : <span>10</span></span><br/>
                                    <span>Memory : <span>8 GB</span></span>
                                </div>
                                <div> 
                                    <span>from available <span>34/34 CPUs</span></span><br/>
                                    <span>from available <span>64/64 GB</span></span>
                                </div>
                                <div>
                                    <span>CPU speed : <span>2.8 GHz</span></span><br/>
                                    <span>Network : <span>IPOP (1 Mbps)</span></span>
                                </div>
                            </div>
                        </div>
                        <div className={Style.cardResult}>
                            <span className={Style.siteName}>B1<span className={Style.region}>(Thailand)</span></span>
                            <br/>
                            <span className={Style.date}>01-MAR-2018 13:00 <span>to</span> 01-MAR-2018 16:00</span>
                            <div className={Style.detail}>
                                <div>
                                    <span>CPU : <span>10</span></span><br/>
                                    <span>Memory : <span>8 GB</span></span>
                                </div>
                                <div> 
                                    <span>from available <span>34/34 CPUs</span></span><br/>
                                    <span>from available <span>64/64 GB</span></span>
                                </div>
                                <div>
                                    <span>CPU speed : <span>2.8 GHz</span></span><br/>
                                    <span>Network : <span>IPOP (1 Mbps)</span></span>
                                </div>
                            </div>
                        </div>
                        <div className={Style.cardResult}>
                            <span className={Style.siteName}>B1<span className={Style.region}>(Thailand)</span></span>
                            <br/>
                            <span className={Style.date}>01-MAR-2018 13:00 <span>to</span> 01-MAR-2018 16:00</span>
                            <div className={Style.detail}>
                                <div>
                                    <span>CPU : <span>10</span></span><br/>
                                    <span>Memory : <span>8 GB</span></span>
                                </div>
                                <div> 
                                    <span>from available <span>34/34 CPUs</span></span><br/>
                                    <span>from available <span>64/64 GB</span></span>
                                </div>
                                <div>
                                    <span>CPU speed : <span>2.8 GHz</span></span><br/>
                                    <span>Network : <span>IPOP (1 Mbps)</span></span>
                                </div>
                            </div>
                        </div>
                        <div className={Style.cardResult}>
                            <span className={Style.siteName}>B1<span className={Style.region}>(Thailand)</span></span>
                            <br/>
                            <span className={Style.date}>01-MAR-2018 13:00 <span>to</span> 01-MAR-2018 16:00</span>
                            <div className={Style.detail}>
                                <div>
                                    <span>CPU : <span>10</span></span><br/>
                                    <span>Memory : <span>8 GB</span></span>
                                </div>
                                <div> 
                                    <span>from available <span>34/34 CPUs</span></span><br/>
                                    <span>from available <span>64/64 GB</span></span>
                                </div>
                                <div>
                                    <span>CPU speed : <span>2.8 GHz</span></span><br/>
                                    <span>Network : <span>IPOP (1 Mbps)</span></span>
                                </div>
                            </div>
                        </div>
                        <div className={Style.cardResult}>
                            <span className={Style.siteName}>B1<span className={Style.region}>(Thailand)</span></span>
                            <br/>
                            <span className={Style.date}>01-MAR-2018 13:00 <span>to</span> 01-MAR-2018 16:00</span>
                            <div className={Style.detail}>
                                <div>
                                    <span>CPU : <span>10</span></span><br/>
                                    <span>Memory : <span>8 GB</span></span>
                                </div>
                                <div> 
                                    <span>from available <span>34/34 CPUs</span></span><br/>
                                    <span>from available <span>64/64 GB</span></span>
                                </div>
                                <div>
                                    <span>CPU speed : <span>2.8 GHz</span></span><br/>
                                    <span>Network : <span>IPOP (1 Mbps)</span></span>
                                </div>
                            </div>
                        </div>
                </div>
            </section>
        )
    }
}