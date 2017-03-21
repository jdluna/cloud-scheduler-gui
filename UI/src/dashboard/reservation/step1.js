import React, { Component } from 'react'
import Style from './reservation.scss'
import DatePicker from 'react-datepicker'

const TimeItem = (props) => (
    <select name={props.name} className={Style.inputtime} value={props.value} onChange={props.handle}>
        <option value='00:00'>00 : 00</option>
        <option value='01:00'>01 : 00</option>
        <option value='02:00'>02 : 00</option>
        <option value='03:00'>03 : 00</option>
        <option value='04:00'>04 : 00</option>
        <option value='05:00'>05 : 00</option>
        <option value='06:00'>06 : 00</option>
        <option value='07:00'>07 : 00</option>
        <option value='08:00'>08 : 00</option>
        <option value='09:00'>09 : 00</option>
        <option value='10:00'>10 : 00</option>
        <option value='11:00'>11 : 00</option>
        <option value='12:00'>12 : 00</option>
        <option value='13:00'>13 : 00</option>
        <option value='14:00'>14 : 00</option>
        <option value='15:00'>15 : 00</option>
        <option value='16:00'>16 : 00</option>
        <option value='17:00'>17 : 00</option>
        <option value='18:00'>18 : 00</option>
        <option value='19:00'>19 : 00</option>
        <option value='20:00'>20 : 00</option>
        <option value='21:00'>21 : 00</option>
        <option value='22:00'>22 : 00</option>
        <option value='23:00'>23 : 00</option>
    </select>
)

export default class Step1 extends Component {
    componentDidMount(){
        this.props.reservationContainer.setState({
            alert:{
                card1: this.refs.alerts
            }
        })
    }

    render() {
        return (
            <section className={Style.content}>
                <div className={Style.alert}>
                    <div className={Style.text} ref='alert'>The resource are not available enough. Please try again.</div>
                </div>
                <div className={Style.step}>
                    <div className={Style.fillcircle}>1</div>
                    <div className={Style.line}></div>
                    <div className={Style.circle}>2</div>
                    <div className={Style.line}></div>
                    <div className={Style.circle}>3</div>
                </div>
                <div className={Style.steptext}>
                    <div className={Style.text}>Specify description</div>
                    <div className={Style.text}>Additional description</div>
                    <div className={Style.text}>Confirm reservation</div>
                </div>
                <div className={Style.form}>
                    <form>
                        <div className={Style.row}>
                            <div className={Style.block}>
                                <div>Begin:</div>
                                <DatePicker className={Style.inputdate} minDate={this.props.reservationContainer.timezone} dateFormat='DD - MMM - YYYY' selected={this.props.reservationContainer.state.startDate.obj} onChange={this.props.reservationContainer.onStartDateChange} />
                                <img className={Style.icon} src='img/ic_date_range.svg' />
                                <TimeItem name='startTime' value={this.props.reservationContainer.state.startTime} handle={this.props.reservationContainer.onTimeChange} />
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.block}>
                                <div>End:</div>
                                <DatePicker className={Style.inputdate} minDate={this.props.reservationContainer.state.startDate.obj} dateFormat='DD - MMM - YYYY' selected={this.props.reservationContainer.state.endDate.obj} onChange={this.props.reservationContainer.onEndDateChange} />
                                <img className={Style.icon} src='img/ic_date_range.svg' />
                                <TimeItem name='endTime' value={this.props.reservationContainer.state.endTime} handle={this.props.reservationContainer.onTimeChange} />
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.block}>
                                <div className={Style.space}>Reservation Length: 2 Days, 5 Hours</div>
                            </div>
                        </div>
                        <div className={Style.sitelist}>
                            <div className={Style.row}>
                                <div className={Style.block}>
                                    <div className={Style.siteblock}><span>AIST</span></div>
                                </div>
                                <div className={Style.block}>
                                    <span>CPUs :</span>
                                </div>
                                <div className={Style.block}>
                                    <input className={Style.inputradio} type='text' />
                                </div>
                                <div className={Style.block}>
                                    <span>Memory (GB) :</span>
                                </div>
                                <div className={Style.block}>
                                    <input className={Style.inputradio} type='text' />
                                </div>
                            </div>
                            <div className={Style.row}>
                                <div className={Style.block}>
                                    <div className={Style.siteblock}><span>AIST</span></div>
                                </div>
                                <div className={Style.block}>
                                    <span>CPUs :</span>
                                </div>
                                <div className={Style.block}>
                                    <input className={Style.inputradio} type='text' />
                                </div>
                                <div className={Style.block}>
                                    <span>Memory (GB) :</span>
                                </div>
                                <div className={Style.block}>
                                    <input className={Style.inputradio} type='text' />
                                </div>
                            </div>
                            <div className={Style.row}>
                                <div className={Style.block}>
                                    <div className={Style.siteblock}><span>AIST</span></div>
                                </div>
                                <div className={Style.block}>
                                    <span>CPUs :</span>
                                </div>
                                <div className={Style.block}>
                                    <input className={Style.inputradio} type='text' />
                                </div>
                                <div className={Style.block}>
                                    <span>Memory (GB) :</span>
                                </div>
                                <div className={Style.block}>
                                    <input className={Style.inputradio} type='text' />
                                </div>
                            </div>
                            <div className={Style.row}>
                                <div className={Style.block}>
                                    <div className={Style.siteblock}><span>AIST</span></div>
                                </div>
                                <div className={Style.block}>
                                    <span>CPUs :</span>
                                </div>
                                <div className={Style.block}>
                                    <input className={Style.inputradio} type='text' />
                                </div>
                                <div className={Style.block}>
                                    <span>Memory (GB) :</span>
                                </div>
                                <div className={Style.block}>
                                    <input className={Style.inputradio} type='text' />
                                </div>
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.block}>
                                <div>Image type:</div>
                                <select className={Style.inputtype} value={this.props.reservationContainer.state.imageType} onChange={this.props.reservationContainer.onImageTypeChange}>
                                    <option value='Any'>Any</option>
                                    <option value='centOS7'>centOS7</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={Style.btn}>
                    <button name='step1' className={Style.cancel} onClick={this.props.reservationContainer.onPreviousStep}>CANCEL</button>
                    <button name='step1' className={Style.ok}>NEXT</button>
                </div>
            </section>
        )
    }
}