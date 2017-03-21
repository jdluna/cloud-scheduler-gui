import React, { Component } from 'react'
import Style from './reservation.scss'
import DatePicker from 'react-datepicker'

export default class Reservation extends Component {
    render() {
        return (
            <section className='modal'>
                <section className={Style.panel}>
                    <header>
                        <div>Create a New Reservation</div>
                        <img src='img/ic_close.svg' onClick={this.props.reservationContainer.onClose}/>
                    </header>
                    {this.props.reservationContainer.state.card}
                </section>
            </section>
        )
    }
}