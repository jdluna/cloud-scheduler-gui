import React, { Component } from 'react'
import Style from './search.scss'

export default class NotFoundTable extends Component {
    render() {
        return (
            <section>
                <div className={Style.label}>
                    <div className={Style.firstlabel}>Search result (0): No result matches</div>
                    <div className={Style.secondlabel}>Click on site's name for more description.</div>
                    <div>Suggest sites which match all criterias except the available time:</div>
                </div>
                <div className={Style.data}>
                    <div className={Style.header}>
                        <div className={Style.text}>Name</div>
                        <div className={Style.text}>
                            <span>Available on</span>
                            <img className={Style.icon} src='img/ic_arrow_drop_down.svg' />
                        </div>
                    </div>
                    <div className={Style.itemlist}>
                        <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>10-NOV-2016 00:00</div>
                        </div>
                        <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>10-NOV-2016 00:00</div>
                        </div>
                        <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>10-NOV-2016 00:00</div>
                        </div>
                        <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>10-NOV-2016 00:00</div>
                        </div>
                        <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>10-NOV-2016 00:00</div>
                        </div>
                        <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>10-NOV-2016 00:00</div>
                        </div>
                        <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>10-NOV-2016 00:00</div>
                        </div>
                        <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>10-NOV-2016 00:00</div>
                        </div>
                        <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>10-NOV-2016 00:00</div>
                        </div>
                        <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>10-NOV-2016 00:00</div>
                        </div>
                        <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>10-NOV-2016 00:00</div>
                        </div>
                        <div className={Style.item}>
                            <div className={Style.text}>AIST Cloud</div>
                            <div className={Style.text}>10-NOV-2016 00:00</div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}