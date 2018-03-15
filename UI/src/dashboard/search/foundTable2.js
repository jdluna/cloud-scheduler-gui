import React, { Component } from 'react'
import Style from './search.scss'
import moment from 'moment'
import { RESOURCES } from '../../config/attributes'

export default class FoundTable2 extends Component {
    constructor(props){
        super(props)
        this.state = {
            hover: null
        }
    }
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

    onSelect(name,key,type){
        if(type=='SINGLE'){
            this.setState({
                hover: 'SINGLE'+key
            })
            this.props.searchContainer.onSelectItem(name,key,type)
        }else{
            this.setState({
                hover: 'MULTI'+key
            })
            this.props.searchContainer.onSelectItem(name,key,type)
        }
        
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
                    <div>Search result ({this.props.searchContainer.state.dataResult.amount}):</div>
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
                <div className={Style.cardData}>
                            {this.props.searchContainer.state.dataResult.sites.map((cardData,key) =>{
                                cardData.network = ''
                                if(cardData.speedCPU==undefined){
                                    cardData.speedCPU = ''
                                }
                                if(cardData.speedNet==undefined){
                                    cardData.speedNet = ''
                                }
                                if(cardData.region==undefined){
                                    cardData.region = ''
                                }
                                if(cardData.connection_type.length==0){
                                    cardData.network = 'NONE'
                                }else{
                                    for(var i = 0;i<cardData.connection_type.length;i++){
                                        cardData.network = cardData.network + cardData.connection_type[i].name
                                        if( i != cardData.connection_type.length-1){
                                            cardData.network = cardData.network + ' / '
                                        }
                                    }
                                }
                                
                                let timezoneOffset = parseInt(moment.tz(this.props.appContainer.state.authen.timezone).utcOffset()) / 60

                                let startDate = moment.utc(cardData.time.begin).utcOffset(moment.tz(this.props.appContainer.state.authen.timezone).utcOffset()).format('YYYY-MM-DD HH:mm:00');
                                let endDate = moment.utc(cardData.time.end).utcOffset(moment.tz(this.props.appContainer.state.authen.timezone).utcOffset()).format('YYYY-MM-DD HH:mm:00');

                                return(
                                    <div className={(this.state.hover=='SINGLE'+key) ? Style.cardResultActive : Style.cardResult} key={key} onClick={()=>this.onSelect(cardData.name,key,'SINGLE')}>
                                        <span className={Style.siteName}>{cardData.name}<span className={Style.region}>{(cardData.region=='')?'':'('+cardData.region+')'}</span></span>
                                        <br/>
                                        <span className={Style.date}>{startDate} <span>to</span> {endDate}</span>
                                        <div className={Style.detail}>
                                            <div>
                                                <span>CPU : <span>{(data.resource[0]=='')? '0':data.resource[0]}</span></span><br/>
                                                <span>Memory : <span>{(data.resource[0]=='')? '0':data.resource[1]} GB</span></span>
                                            </div>
                                            <div> 
                                                <span>free / total <span>{cardData.CPU.available+'/'+cardData.CPU.total} CPUs</span></span><br/>
                                                <span>free / total <span>{cardData.memory.available+'/'+cardData.memory.total} GB</span></span>
                                            </div>
                                            <div>
                                                <span>CPU speed : <span>{(cardData.speedCPU=='')?'':cardData.speedCPU+' GHz'}</span></span><br/>
                                                <span>Network : <span>{cardData.network} {(cardData.speedNet=='') ? '': '('+ cardData.speedNet+' Mbps)'}</span></span>
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
                        {/* {this.props.searchContainer.state.dataResult.results.map((data,key) =>{
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
                        )} */}
                </div>
                )}
            </section>
        )
    }
}