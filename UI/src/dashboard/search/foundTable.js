import React, { Component } from 'react'
import Style from './search.scss'

export default class NotFoundTable extends Component {
    render() {
        return (
            <section>
                <div className={Style.label}>
                    <div className={Style.firstlabel}>Search result (0):</div>
                    <div className={Style.secondlabel}>Click on site's name for more description.</div>
                </div>
                <div className={Style.data}>
                    <div className={Style.header}>
                        <div className={Style.text}>
                            <span>Name</span>
                            <img className={Style.icon} src='img/ic_arrow_drop_down.svg' />
                        </div>
                        <div className={Style.text}>Available CPU</div>
                        <div className={Style.text}>Available Memory (GB)</div>
                    </div>
                    <div className={Style.itemlist}>
                        <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>128</div>
                            <div className={Style.text}>180</div>
                       </div>
                       <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>128</div>
                            <div className={Style.text}>180</div>
                       </div>
                       <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>128</div>
                            <div className={Style.text}>180</div>
                       </div>
                       <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>128</div>
                            <div className={Style.text}>180</div>
                       </div>
                       <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>128</div>
                            <div className={Style.text}>180</div>
                       </div>
                       <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>128</div>
                            <div className={Style.text}>180</div>
                       </div>
                       <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>128</div>
                            <div className={Style.text}>180</div>
                       </div>
                       <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>128</div>
                            <div className={Style.text}>180</div>
                       </div>
                       <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>128</div>
                            <div className={Style.text}>180</div>
                       </div>
                       <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>128</div>
                            <div className={Style.text}>180</div>
                       </div>
                       <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>128</div>
                            <div className={Style.text}>180</div>
                       </div>
                       <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>128</div>
                            <div className={Style.text}>180</div>
                       </div>
                    </div>
                </div>
            </section>
        )
    }
}