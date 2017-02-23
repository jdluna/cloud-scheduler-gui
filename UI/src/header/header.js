import style from './header.scss'
import React,{Component} from 'react'

export default class Header extends Component {
    render() {
        return (
            <header id={style.titlebar}>
                <div className={style.title}>
                    <span>PRAGMA Cloud Testbed services</span>
                    <span className={style.signin}>Sign in</span>
                </div>
            </header>
        )
    }
}