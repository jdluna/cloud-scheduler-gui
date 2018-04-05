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

    onSelect(name,network,id,key,type,resource){
        if(type=='SINGLE'){
            this.setState({
                hover: 'SINGLE'+key
            })
            resource.CPU = resource[0]
            resource.memory = resource[1]
            this.props.searchContainer.onSelectItem(name,network,id,resource,true)
        }else{
            this.setState({
                hover: 'MULTI'+key
            })
            this.props.searchContainer.onSelectItemMulti(name,network,id,resource)
        }
        
    }

    getCardResult(data,mode){
        if(mode=='SINGLE'){
            return(
                <div className={Style.cardData}>
                    {data.sites.map((cardData,key) =>{
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
                            <div className={(this.state.hover=='SINGLE'+key) ? Style.cardResultActive : Style.cardResult} key={key} onClick={()=>this.onSelect(cardData.name,cardData.connection_type,cardData.id,key,'SINGLE',this.props.searchContainer.state.resource)}>
                                <span className={Style.siteName}>{cardData.name}<span className={Style.region}>{(cardData.region=='')?'':'('+cardData.region+')'}</span></span>
                                <br/>
                                <span className={Style.date}>{startDate} <span>to</span> {endDate}</span>
                                <div className={Style.detail}>
                                    <div>
                                        <span>CPU : <span>{(this.props.searchContainer.state.resource[0]=='')? '0':this.props.searchContainer.state.resource[0]}</span></span><br/>
                                        <span>Memory : <span>{(this.props.searchContainer.state.resource[1]=='')? '0':this.props.searchContainer.state.resource[1]} GB</span></span>
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
            )
        }else if(mode=='MULTI'){
            return(
                <div className={Style.cardData}>
                    {data.multiSites.map((cardData,key) =>{
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
                        
                        //set defaul value
                        cardData.namelabel = ''
                        cardData.totalCPU = 0
                        cardData.totalMem = 0
                        cardData.avaiCPU = 0
                        cardData.avaiMem = 0
                        cardData.CPUlabel = '('
                        cardData.Memorylabel = '('
                        cardData.names = []
                        cardData.ids = []

                        //loop for calculate data
                        for(let i=0;i<cardData.sites.length;i++){
                            cardData.totalCPU = cardData.totalCPU + cardData.sites[i].CPU.total
                            cardData.totalMem = cardData.totalMem + cardData.sites[i].memory.total
                            cardData.avaiCPU = cardData.avaiCPU + cardData.sites[i].CPU.available
                            cardData.avaiMem = cardData.avaiMem + cardData.sites[i].memory.available
                            cardData.names.push(cardData.sites[i].name)
                            cardData.ids.push(cardData.sites[i].id)
                        }

                        //loop each site cpu and mem
                        for(let i=0;i<cardData.sites.length;i++){
                            cardData.CPUlabel = cardData.CPUlabel + cardData.sites[i].CPU.use
                            cardData.Memorylabel = cardData.Memorylabel + cardData.sites[i].memory.use
                            if( i != cardData.sites.length-1){
                                cardData.CPUlabel = cardData.CPUlabel + ':'
                                cardData.Memorylabel = cardData.Memorylabel + ':'
                            }
                        }
                        cardData.CPUlabel = cardData.CPUlabel + ')'
                        cardData.Memorylabel = cardData.Memorylabel + ')'

                        let siteLength = cardData.sites.length

                        return(
                            <div className={(this.state.hover=='MULTI'+key) ? Style.cardResultActive : Style.cardResult} key={key} onClick={()=>this.onSelect(cardData.names,cardData.connection_type,cardData.ids,key,'MULTI',cardData.sites)}>
                                {cardData.sites.map((data,key)=>{
                                    return(
                                        <span className={Style.siteName} key={key}>{data.name}<span className={Style.region}>{(data.region==undefined)?'':'('+data.region+')'}</span> {this.ifRender(key!=siteLength-1,<span>x</span>)} </span>
                                    )
                                })}

                                {/* <span className={Style.siteName}>{cardData.namelabel}<span className={Style.region}>{(cardData.region=='')?'':'('+cardData.region+')'}</span></span> */}
                                <br/>
                                <span className={Style.date}>{startDate} <span>to</span> {endDate}</span>
                                <div className={Style.detail}>
                                    <div>
                                        <span>CPU : <span>{(this.props.searchContainer.state.resource[0]=='')? '0':this.props.searchContainer.state.resource[0]} {cardData.CPUlabel}</span></span><br/>
                                        <span>Memory : <span>{(this.props.searchContainer.state.resource[0]=='')? '0':this.props.searchContainer.state.resource[1]} GB {cardData.Memorylabel}</span></span>
                                    </div>
                                    <div> 
                                        <span>free / total <span>{cardData.avaiCPU+'/'+cardData.totalCPU} CPUs</span></span><br/>
                                        <span>free / total <span>{cardData.avaiMem+'/'+cardData.totalMem} GB</span></span>
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
            )
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
                {this.getCardResult(this.props.searchContainer.state.dataResult,this.props.searchContainer.state.mode)}
            </section>
        )
    }
}