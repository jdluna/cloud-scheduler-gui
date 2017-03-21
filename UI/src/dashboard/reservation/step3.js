import React, { Component } from 'react'
import Style from './reservation.scss'

export default class Step3 extends Component {
    componentDidMount(){
        this.props.reservationContainer.setState({
            alertNode: this.refs.alerts
        })
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
                                <div className={Style.east}>UCSD/SDSC, AIST</div>
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.column}>
                                <div className={Style.west}>Begin:</div>
                                <div className={Style.east}>09-NOV-2017 10:00</div>
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.column}>
                                <div className={Style.west}>End:</div>
                                <div className={Style.east}>09-NOV-2017 11:00</div>
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.column}>
                                <div className={Style.west}>Reservation Length:</div>
                                <div className={Style.east}>2 Days, 5 Hours</div>
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.column}>
                                <div className={Style.west}>Image type:</div>
                                <div className={Style.east}>centOS7</div>
                            </div>
                        </div>

                        <div className={Style.confirmlist}>
                            <div className={Style.item}>
                                <div className={Style.row}>
                                    <div className={Style.column}>
                                        <div className={Style.west}>UCSD/SDSC CPUs:</div>
                                        <div className={Style.east}>32</div>
                                    </div>
                                </div>
                                <div className={Style.row}>
                                    <div className={Style.column}>
                                        <div className={Style.west}>Memory (GB):</div>
                                        <div className={Style.east}>64</div>
                                    </div>
                                </div>
                            </div>
                            <div className={Style.item}>
                                <div className={Style.row}>
                                    <div className={Style.column}>
                                        <div className={Style.west}>UCSD/SDSC CPUs:</div>
                                        <div className={Style.east}>32</div>
                                    </div>
                                </div>
                                <div className={Style.row}>
                                    <div className={Style.column}>
                                        <div className={Style.west}>Memory (GB):</div>
                                        <div className={Style.east}>64</div>
                                    </div>
                                </div>
                            </div>
                            <div className={Style.item}>
                                <div className={Style.row}>
                                    <div className={Style.column}>
                                        <div className={Style.west}>UCSD/SDSC CPUs:</div>
                                        <div className={Style.east}>32</div>
                                    </div>
                                </div>
                                <div className={Style.row}>
                                    <div className={Style.column}>
                                        <div className={Style.west}>Memory (GB):</div>
                                        <div className={Style.east}>64</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={Style.row}>
                            <div className={Style.column}>
                                <div className={Style.west}>Title of reservation:</div>
                                <div className={Style.east}>Test reservation 1</div>
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.column}>
                                <div className={Style.west}>Description of reservation:</div>
                                <div className={Style.east}>-</div>
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