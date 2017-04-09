import React, { Component } from 'react'
import Style from './search.scss'
import moment from 'moment'

const LABEL = ()=>(
    <span>
        <div className={Style.secondlabel}>Click on site's name for more description.</div>
        <div>Suggest sites which match all criterias except the available time:</div>  
    </span>    
)

export default class NotFoundTable extends Component {
    render() {
        let data = this.props.searchContainer.state
        let startDate = moment(data.startDate.date+' '+data.startTime).format('DD-MMM-YYYY HH:mm').toUpperCase()
        let endDate = moment(data.endDate.date+' '+data.endTime).format('DD-MMM-YYYY HH:mm').toUpperCase() 
        let startDateLength = data.startDate.date+' '+data.startTime
        let endDateLength = data.endDate.date+' '+data.endTime
        let label 
        if(this.props.data.sites.length!=0){
            label = <LABEL/>
        }

        return (
            <section>
                <div className={Style.label}>
                    <div className={Style.firstlabel}>Search result (0): No result matches</div>
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
                    {label}
                </div>
                <div className={Style.data}>
                    <div className={Style.header}>
                        <div className={Style.text}>Name</div>
                        <div className={Style.text}>
                            <span>Available on</span>
                            <img className={Style.icon} src='img/ic_arrow_drop_down.svg' />
                        </div>
                    </div>
                    <div className={Style.itemlist}>
                        {
                            console.log(this.props.data)
                            /*{this.props.data.sites.map((data,key)=>{
                            return(
                                <div className={Style.item} key={key}>
                                    <div className={Style.text}>AIST Cloud</div>
                                    <div className={Style.text}>10-NOV-2016 00:00</div>
                                </div>
                            )
                        })}   */}
                    </div>
                </div>
            </section>
        )
    }
}