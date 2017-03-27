import React, { Component } from 'react'
import Style from './history.scss'
import SuccessCard from './success'
import ErrorCard from './error'

const DELETE_CARD = ()=>(
    <div className={Style.footer}>
        <div className={Style.title}>
            <div>Why do you cancel this reservation?</div>
            <img src='img/ic_close.svg' />
        </div>
        <div className={Style.content}>
            <div className={Style.row}>
                <div className={Style.block}>
                    <input className={Style.input} type='text' autoFocus />
                </div>
            </div>
            <div className={Style.searchbtn}>
                <button type='submit' className='btn--delete'>CONFIRM</button>
            </div>
        </div>
    </div>
)

export default class DeletePopup extends Component {
    render() {
        return (
            <ErrorCard/>
        )
    }
}