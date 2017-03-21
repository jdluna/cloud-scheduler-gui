import React, { Component } from 'react'
import Style from './reservation.scss'

export default class Step2 extends Component {
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
                    <div className={Style.fillcircle}>2</div>
                    <div className={Style.line}></div>
                    <div className={Style.circle}>3</div>
                </div>
                <div className={Style.steptext}>
                    <div className={Style.text}>Specify description</div>
                    <div className={Style.text}>Additional description</div>
                    <div className={Style.text}>Confirm reservation</div>
                </div>
                <div className={Style.form2}>
                    <form>
                        <div className={Style.row}>
                            <div className={Style.block}>
                                <div>Title of reservation:</div>
                                <input className={Style.inputtitle} type='text' autoFocus/>
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.block}>
                                <div>Description of reservation:</div>
                                <textarea className={Style.textarea}></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={Style.btn}>
                    <button name='step2' className={Style.cancel} onClick={this.props.reservationContainer.onPreviousStep}>BACK</button>
                    <button name='step2' className={Style.ok} onClick={this.props.reservationContainer.onNextStep}>NEXT</button>
                </div>
            </section>
        )
    }
}