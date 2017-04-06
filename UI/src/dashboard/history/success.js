import React, { Component } from 'react'
import Style from './history.scss'

export default class Success extends Component {
    render() {
        return (
            <div>
                <div className={Style.title}>
                    <img src='img/ic_close.svg' onClick={this.props.onClose} />
                </div>
                <div className={Style.content}>
                    <div className={Style.row}>
                        <img className={Style.iconstatus} src='img/ic_check_circle.svg' onClick={this.props.onClose}/>
                    </div>
                    <div className={Style.row}>
                        Success!
                    </div>
                </div>
            </div>
        )
    }
}