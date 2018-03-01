import React, { Component } from 'react'
import Style from './search.scss'
import moment from 'moment'
import { RESOURCES } from '../../config/attributes'

export default class FoundTable2 extends Component {
    ifRender(condition,view){
        if(condition) return view;
        else return null;
    }

    sum(arr){
        let sum =0
        for(var i=0;i<arr.length;i++){
            sum+=arr[i]
        }
        return sum
    }

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
                            {this.ifRender(this.props.searchContainer.state.mode=='MULTI',
                                <div>
                                    <span>Number of sites : </span>
                                    <span className={Style.hilight}>{data.numSite}</span>
                                </div>
                            )}
                            
                        </div>    
                    </div>
                    <div className={Style.secondlabel}>Click on site's name for more description.</div>
                </div>
                {this.ifRender(this.props.searchContainer.state.mode=='SINGLE',
                <div className={Style.data}>
                            {this.props.searchContainer.state.dataResult.results.map((data,key) =>{
                                return(
                                    <div className={Style.cardResult} key={key}>
                                        <span className={Style.siteName}>{data.sites[0].name}<span className={Style.region}>({data.sites[0].region})</span></span>
                                        <br/>
                                        <span className={Style.date}>{data.begin} <span>to</span> {data.end}</span>
                                        <div className={Style.detail}>
                                            <div>
                                                <span>CPU : <span>{data.totalCPU[0]}</span></span><br/>
                                                <span>Memory : <span>{data.totalMem[0]} GB</span></span>
                                            </div>
                                            <div> 
                                                <span>from available <span>{data.avaiCPU} CPUs</span></span><br/>
                                                <span>from available <span>{data.avaiMem} GB</span></span>
                                            </div>
                                            <div>
                                                <span>CPU speed : <span>{data.speedCPU} GHz</span></span><br/>
                                                <span>Network : <span>{data.netType} ({data.speedNet} Mbps)</span></span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                </div>
                )}
                {this.ifRender(this.props.searchContainer.state.mode=='MULTI',
                <div className={Style.data}>
                        {this.props.searchContainer.state.dataResult.results.map((data,key) =>{
                                let sites = data.sites
                                let siteLength = sites.length
                                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                                return(
                                    <div className={Style.cardResult} key={key}>
                                        {sites.map((data,key)=>{
                                            return(
                                                <span className={Style.siteName} key={key}>{data.name}<span className={Style.region}>({data.region})</span> {this.ifRender(key!=siteLength-1,<span>x</span>)} </span>
                                            )
                                        })}
                                        <br/>
                                        <span className={Style.date}>{data.begin} <span>to</span> {data.end}</span>
                                        <div className={Style.detail}>
                                            <div>
                                                <span>CPU : <span>{this.sum(data.totalCPU)}</span></span><br/>
                                                <span>Memory : <span>{this.sum(data.totalMem)} GB</span></span>
                                            </div>
                                            <div> 
                                                <span>from available <span>{data.avaiCPU} CPUs</span></span><br/>
                                                <span>from available <span>{data.avaiMem} GB</span></span>
                                            </div>
                                            <div>
                                                <span>CPU speed : <span>{data.speedCPU} GHz</span></span><br/>
                                                <span>Network : <span>{data.netType} ({data.speedNet} Mbps)</span></span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                </div>
                )}
            </section>
        )
    }
}