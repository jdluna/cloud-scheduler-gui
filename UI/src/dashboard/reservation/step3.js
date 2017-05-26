import React, { Component } from 'react'
import Style from './reservation.scss'
import { RESOURCES } from '../../config/attributes'

export default class Step3 extends Component {
    componentDidMount(){
        this.props.reservationContainer.setState({
            alertNode: this.refs.alerts
        })
        let card = this.props.reservationContainer.dashboardContainer.state.selectCard
        this.cardName = ''
        card.map((data)=>{
            if(this.cardName==''){
                this.cardName+=data.name
            }else{
                this.cardName+=', '+data.name
            }
        })
        if(this.cardName.length>40){
            this.cardName = this.cardName.slice(0,40)+'...'
        }

        this.begin = this.props.reservationContainer.state.startDate.obj.format('DD-MMM-YYYY').toUpperCase()+' '+this.props.reservationContainer.state.startTime
        this.end = this.props.reservationContainer.state.endDate.obj.format('DD-MMM-YYYY').toUpperCase()+' '+this.props.reservationContainer.state.endTime
        this.title = (this.props.reservationContainer.state.title!='') ? this.props.reservationContainer.state.title : '-'
        this.desc = (this.props.reservationContainer.state.description!='') ? this.props.reservationContainer.state.description : '-'
        if(this.title.length>40){
            this.title = this.title.slice(0,40)+'...'
        }
        if(this.desc.length>40){
            this.desc = this.desc.slice(0,40)+'...'
        }
    }

    render() {
        return (
            <section className={Style.content}>
                <div className={Style.alert}>
                    <div className={Style.text} ref='alert'>The resource are not available enough. Please try again.</div>
                </div>
                <div className={Style.step}>
                    <div className={Style.circle}>1</div>
                    <div className={Style.line}></div>
                    <div className={Style.circle}>2</div>
                    <div className={Style.line}></div>
                    <div className={Style.fillcircle}>3</div>
                </div>
                <div className={Style.steptext}>
                    <div className={Style.text}>Specify description</div>
                    <div className={Style.text}>Additional description</div>
                    <div className={Style.text}>Confirm reservation</div>
                </div>
                <div className={Style.form3}>
                        <div className={Style.row}>
                            <div className={Style.column}>
                                <div className={Style.west}>Site's name:</div>
                                <div className={Style.east}>{this.cardName}</div>
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.column}>
                                <div className={Style.west}>Begin:</div>
                                <div className={Style.east}>{this.begin}</div>
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.column}>
                                <div className={Style.west}>End:</div>
                                <div className={Style.east}>{this.end}</div>
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.column}>
                                <div className={Style.west}>Reservation Length:</div>
                                <div className={Style.east}>{this.props.reservationContainer.state.reservationLength}</div>
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.column}>
                                <div className={Style.west}>Image type:</div>
                                <div className={Style.east}>{this.props.reservationContainer.state.imageType}</div>
                            </div>
                        </div>

                        <div className={Style.confirmlist}>
                            {
                                this.props.reservationContainer.dashboardContainer.state.selectCard.map((data,key)=>{
                                    return(
                                        <div className={Style.item} key={key}>
                                            {
                                                RESOURCES.map((attr,k)=>{
                                                    let unit = (attr.unit!=null) ? '('+attr.unit+')' : ''
                                                    return(
                                                        <div className={Style.row} key={k}>
                                                            <div className={Style.column}>
                                                                <div className={Style.west}>{((k==0) ? data.name : '')+' '+attr.name+' '+unit}:</div>
                                                                <div className={Style.east}>{this.props.reservationContainer.state.resource[key][k]}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>        
                                    )
                                })
                            }
                        </div>

                        <div className={Style.row}>
                            <div className={Style.column}>
                                <div className={Style.west}>Title of reservation:</div>
                                <div className={Style.east}>{this.title}</div>
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.column}>
                                <div className={Style.west}>Description of reservation:</div>
                                <div className={Style.east}>{this.desc}</div>
                            </div>
                        </div>
                </div>
                <div className={Style.btn}>
                    <button name='step3' className={Style.cancel} onClick={this.props.reservationContainer.onPreviousStep}>BACK</button>
                    <button name='step3' className={Style.ok} onClick={this.props.reservationContainer.onNextStep}>CONFIRM</button>
                </div>
            </section>
        )
    }
}