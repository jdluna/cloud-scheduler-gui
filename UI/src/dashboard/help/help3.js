import React, { Component } from 'react'
import Style from './help.scss'

export default class Help3 extends Component {
    render() {
        return (
            <section className={Style.cardwrap}>
                <div className={Style.title}>Creating a resource reservation</div>
                <div className={Style.content2}>
                    <div className={Style.img+' '+Style.img1}><div className={Style.border}><img width='100%' height='100%' src='img/tutorial-3-1.png'/></div></div>
                    <div className={Style.img}><div className={Style.border}><img width='100%' height='100%' src='img/tutorial-3-2.png'/></div></div>
                    <div className={Style.img+' '+Style.img3}><div className={Style.border}><img width='100%' height='100%' src='img/tutorial-3-3.png'/></div></div>
                </div>
                <div className={Style.detail2}>
                    <div className={Style.data2}>
                        <div><div className={Style.circle}>1</div></div>
                        <span>Choose your preferred site to see site's information by clicking on any site's marker on the map.</span>
                    </div>
                    <div className={Style.data2}>
                        <div><div className={Style.circle}>2</div></div>
                        <span>Select cards of site you want to reserve.</span>
                    </div>
                    <div className={Style.data2}>
                        <div><div className={Style.circle}>3</div></div>
                        <span>Choose the reservation type and click a RESERVE button.</span>
                    </div>
                </div>
                <div className={Style.btn}>
                    <button className={Style.previous} onClick={()=>this.props.container.onChangeCard(2)}>PREVIOUS</button>
                    <button className={Style.next} onClick={()=>this.props.container.onChangeCard(0)}>DONE</button>
                </div>
            </section>
        )
    }
}