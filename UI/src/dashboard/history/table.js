import React, { Component } from 'react'
import Style from './history.scss'
import moment from 'moment'

const BTN_CONTROL = (props) => (
    <div className={Style.control}>
        <img className={Style.icon} src='img/ic_add_circle.svg' onClick={props.historyContainer.onExtendBtnClick}/>
        <img className={Style.icon} src='img/ic_remove_circle.svg' onClick={props.historyContainer.onDeleteBtnClick}/>
    </div>
)

export default class Table extends Component {
    componentDidMount(){
        if(this.props.historyContainer.state.user!='admin'){
            this.refs.list.style.height = '360px'
        }
    }

    render() {
        let btnControl
        let {user,tab} = this.props.historyContainer.state
        let modalName = this.props.historyContainer.dashboardContainer.state.modalName.toLowerCase()
        if(user=='admin'&&modalName!='history'&&tab!='all'||user!='admin'&&modalName!='history'){
            btnControl = <BTN_CONTROL historyContainer={this.props.historyContainer}/>
        }
        return (
            <section>
                <div className={Style.header}>
                    <div className={Style.text}>End</div>
                    <div className={Style.text}>Title</div>
                    <div className={Style.text}>Owner</div>
                    <div className={Style.text}>Note</div>
                </div>
                <div ref='list' className={Style.itemlist}>
                    {  
                        this.props.historyContainer.state.reservationsItem.map((data,key)=>{
                            let leftDate = this.props.historyContainer.getReservationsCountDown(data.end)
                            let leftDateSplit = leftDate.split(' ')
                            let leftDateElement = []
                            if(leftDateSplit[1]=='year(s)'||leftDateSplit[1]=='day(s)'||leftDateSplit[0]=='-'){
                                leftDateElement = <span>{leftDate}</span>
                            }else{
                                leftDateElement = <span className={Style.warning}>{leftDate}</span>
                            }
                            return(
                                <div className={(this.props.historyContainer.state.viewDetailKey==key) ? Style.itemactive : Style.item} key={key} onClick={()=>this.props.historyContainer.onViewReservationDetail(key,data.reservation_id)}>
                                    <div className={Style.text}>{moment(data.end).format('DD-MMM-YYYY HH:mm').toUpperCase()}</div>
                                    <div className={Style.text}>{data.title}</div>
                                    <div className={Style.text}>{data.owner}</div>
                                    <div className={Style.text}>
                                        {leftDateElement}
                                        {btnControl}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        )
    }
}