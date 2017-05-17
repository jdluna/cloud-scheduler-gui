import React, { Component } from 'react'
import Style from './help.scss'

export default class Help1 extends Component {
    render() {
        return (
            <section className={Style.cardwrap}>
                <div className={Style.title}>PRAGMA Cloud Testbed services</div>
                <div className={Style.content}>
                    <img width='85%' height='100%' src='img/tutorial-1.png'/>
                </div>
                <div className={Style.detail}>
                    <div>This system visualizes all sitets on the map</div>
                    <div>refering from each site location.</div>
                </div>
                <div className={Style.btn}>
                    <button className={Style.disabled} disabled>PREVIOUS</button>
                    <button className={Style.next} onClick={()=>this.props.container.onChangeCard(2)}>NEXT</button>
                </div>
            </section>
        )
    }
}