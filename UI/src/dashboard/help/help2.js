import React, { Component } from 'react'
import Style from './help.scss'

export default class Help2 extends Component {
    render() {
        return (
            <section className={Style.cardwrap}>
                <div className={Style.title}></div>
                <div className={Style.content2}>
                    <div className={Style.img}><div className={Style.border2}><img width='100%' height='100%' src='img/tutorial-2-1.png'/></div></div>
                    <div className={Style.img}><div className={Style.border2}><img width='100%' height='100%' src='img/tutorial-2-2.png'/></div></div>
                </div>
                <div className={Style.detail2}>
                    <div className={Style.data}>
                        <span>A circle marker on the map represents to a group of sites.</span>
                        <span>Number inside the circle shows th amount of site in that group.</span>
                    </div>
                    <div className={Style.data}>
                        <span>After clicking on the circle marker or zoom in the map,</span>
                        <span>it seperates to regular markers in that group.</span>
                    </div>
                </div>
                <div className={Style.btn}>
                    <button className={Style.previous} onClick={()=>this.props.container.onChangeCard(1)}>PREVIOUS</button>
                    <button className={Style.next} onClick={()=>this.props.container.onChangeCard(3)}>NEXT</button>
                </div>
            </section>
        )
    }
}