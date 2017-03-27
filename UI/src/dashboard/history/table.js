import React, { Component } from 'react'
import Style from './history.scss'
import moment from 'moment'

export default class Table extends Component {
    componentDidMount(){
        if(this.props.historyContainer.state.user!='admin'){
            this.refs.list.style.height = '360px'
        }
    }

    render() {
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
                            if(leftDateSplit[1]=='year(s)'||leftDateSplit[1]=='day(s)'){
                                leftDateElement = <span>{leftDate}</span>
                            }else{
                                leftDateElement = <span className={Style.warning}>{leftDate}</span>
                            }
                            return(
                                <div className={Style.item} key={key}>
                                    <div className={Style.text}>{moment(data.end).format('DD-MMM-YYYY HH:mm').toUpperCase()}</div>
                                    <div className={Style.text}>{data.title}</div>
                                    <div className={Style.text}>{data.owner}</div>
                                    <div className={Style.text}>
                                        {leftDateElement}
                                        <div className={Style.control}>
                                            <img className={Style.icon} src='img/ic_add_circle.svg' />
                                            <img className={Style.icon} src='img/ic_remove_circle.svg' />
                                        </div>
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