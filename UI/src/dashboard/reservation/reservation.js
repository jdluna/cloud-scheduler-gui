import React, { Component } from 'react'
import Style from './reservation.scss'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'

export default class Reservation extends Component {
    render() {
        let card
        switch(this.props.reservationContainer.state.card){
            case 'step1' : card = <Step1 reservationContainer={this.props.reservationContainer}/>;break;
            case 'step2' : card = <Step2 reservationContainer={this.props.reservationContainer}/>;break;
            case 'step3' : card = <Step3 reservationContainer={this.props.reservationContainer}/>;break;
        }

        return (
            <section className='modal'>
                <section className={Style.panel}>
                    <header>
                        <div>Create a New Reservation</div>
                        <img src='img/ic_close.svg' onClick={this.props.reservationContainer.onClose}/>
                    </header>
                    {/*<Step1 reservationContainer={this.props.reservationContainer}/>*/}
                    {/*{this.props.reservationContainer.state.card}*/}
                    {card}
                </section>
            </section>
        )
    }
}