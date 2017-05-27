import React, { Component } from 'react'
import Style from './history.scss'
import moment from 'moment'
import {RESOURCES} from '../../config/attributes'

export default class Detail extends Component {
    render() {
        let {viewDetailKey,reservationsItem} = this.props.historyContainer.state
        let data = reservationsItem[viewDetailKey]
        let leftDate = this.props.historyContainer.getReservationsCountDown(data.end)
        let leftDateSplit = leftDate.split(' ')
        let leftDateElement = []
        if(leftDateSplit[1]=='year(s)'||leftDateSplit[1]=='day(s)'||leftDateSplit[0]=='-'){
            leftDateElement = <span>{leftDate}</span>
        }else{
            leftDateElement = <span className={Style.warning}>{leftDate}</span>
        }

        let userTimezone = this.props.historyContainer.dashboardContainer.getUserTimeZone()
        let b = moment(data.begin+' +0000', "YYYY-MM-DD HH:mm Z").tz(userTimezone).format('YYYY-MM-DD HH:mm');
        let e = moment(data.end+' +0000', "YYYY-MM-DD HH:mm Z").tz(userTimezone).format('YYYY-MM-DD HH:mm');

        return (
            <section>
                <div className={Style.top}>
                    <div className={Style.col1}>
                        <div className={Style.space}>Title</div>
                        <div className={Style.space}>Description</div>
                        <div className={Style.space}>Begin</div>
                        <div className={Style.space}>End</div>
                        <div className={Style.space}>Image type</div>
                        <div className={Style.space}>Type</div>
                        <div>Remaining</div>
                    </div>
                    <div className={Style.col2}>
                        <div className={Style.space}>: {data.title}</div>
                        <div className={Style.space}>: {data.description}</div>
                        <div className={Style.space}>: {b.toUpperCase()}</div>
                        <div className={Style.space}>: {e.toUpperCase()}</div>
                        <div className={Style.space}>: {data.image_type}</div>
                        <div className={Style.space}>: {(data.type!='') ? data.type.charAt(0).toUpperCase()+data.type.slice(1) : '-'}</div>
                        <div>: {leftDateElement}</div>
                    </div>
                </div>
                <div className={Style.line}></div>
                <div className={Style.title}>Sites ({data.sites.length}):</div>
                {
                    data.sites.map((site,key)=>{
                        let statusElement
                        switch(site.status){
                            case 'waiting'  : statusElement = <div> <span className={Style.colon}> : </span> <span className={Style.yellowCircle}> </span> {site.status} </div>;break
                            case 'created'  : statusElement = <div> <span className={Style.colon}> : </span> <span className={Style.yellowCircle}> </span> {site.status} </div>;break
                            case 'starting'  : statusElement = <div> <span className={Style.colon}> : </span> <span className={Style.greenCircle}> </span> {site.status} </div>;break
                            case 'running'  : statusElement = <div> <span className={Style.colon}> : </span> <span className={Style.greenCircle}> </span> {site.status} </div>;break
                            case 'cancel'   : statusElement = <div> <span className={Style.colon}> : </span> <span className={Style.redCircle}> </span> {site.status} </div>;break
                            case 'stopping'   : statusElement = <div> <span className={Style.colon}> : </span> <span className={Style.redCircle}> </span> {site.status} </div>;break
                            case 'stopped'   : statusElement = <div> <span className={Style.colon}> : </span> <span className={Style.redCircle}> </span> {site.status} </div>;break
                            default : statusElement = <div> <span className={Style.colon}> : </span> <span className={Style.redCircle}> </span> {site.status} </div>;break
                        }
                        return(
                            <div className={Style.site} key={key}>
                                <div className={Style.col1}>
                                    <div  className={Style.space}>Name</div>
                                    {
                                        RESOURCES.map((data,key)=>{
                                            return(
                                                <div className={Style.space} key={key}>{data.name} reserved</div>
                                            )
                                        })
                                    }
                                    <div>Status</div>
                                </div>
                                <div className={Style.col2}>
                                    <div  className={Style.space}>: {site.site_name}</div>
                                    {
                                        RESOURCES.map((data,key)=>{
                                            let dataTemp
                                            try{
                                                dataTemp = site[data.parameter]
                                            }catch(error){
                                                dataTemp = '-'
                                            }
                                            return(
                                                <div className={Style.space} key={key}>: {dataTemp}</div>
                                            )
                                        })
                                    }
                                    {statusElement}
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        )
    }
}