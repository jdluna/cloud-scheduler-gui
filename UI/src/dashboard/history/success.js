import React, { Component } from 'react'
import Style from './history.scss'

export default class Success extends Component {
    render() {
        return (
            <div className={Style.footer}>
                <div className={Style.title}>
                    <img src='img/ic_close.svg' />
                </div>
                <div className={Style.content}>
                    <div className={Style.row}>
                        <img className={Style.iconstatus} src='img/ic_check_circle.svg'/>
                    </div>
                    <div className={Style.row}>
                        Success!
                    </div>
                </div>
            </div>
        )
    }
}