import style from './header.scss'
import React,{Component} from 'react'

export default class Header extends Component {
    render() {
        return (
            <header id={style.titlebar}>
                <div className={style.title}>
                    <span>PRAGMA Cloud Testbed services</span>
                    <span className={style.name}>{this.props.app.state.authen.name}</span> 
                    <span className={style.signin} onClick={this.props.app.authentication}>{this.props.app.state.loginDialog.header}</span>
                </div>
            </header>
        )
    }
}