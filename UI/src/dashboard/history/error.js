import React, { Component } from 'react'
import Style from './history.scss'

export default class Error extends Component {
    render() {
        return (
            <div>
                <div className={Style.title}>
                    <img src='img/ic_close.svg' onClick={this.props.onClose} />
                </div>
                <div className={Style.content}>
                    <div className={Style.row}>
                        <img className={Style.iconstatus} src='img/ic_cancel_circle.svg'/>
                    </div>
                    <div className={Style.row}>
                        Error!
                    </div>
                </div>
            </div>
        )
    }
}