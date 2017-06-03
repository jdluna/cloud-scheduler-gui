import React, { Component } from 'react'
import Style from './dialog.scss'

export default class ErrorDialog extends Component {
    render() {
        return (
            <section className={Style.panel}>
                <header><div>Error</div></header>
                <section className={Style.content}>
                    <div className={Style.icon}>
                        <img className={Style.success} src='img/ic_cancel_circle.svg' />
                    </div>
                    <div className={Style.text}>
                        <div>{this.props.title}</div>
                        <div>{this.props.msg}</div>
                    </div>
                    <div className={Style.btn}>
                        <button className={Style.ok} onClick={this.props.onCloseDialog}>OK</button>
                    </div>
                </section>
            </section>
        )
    }
}