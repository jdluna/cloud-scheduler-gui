import React, { Component } from 'react'
import Style from './history.scss'

export default class Detail extends Component {
    render() {
        return (
            <section>
                <div className={Style.top}>
                    <div className={Style.col1}>
                        <div>Title</div>
                        <div>Description</div>
                        <div>Begin</div>
                        <div>End</div>
                        <div>Remaining</div>
                    </div>
                    <div className={Style.col2}>
                        <div>: First virtual machine</div>
                        <div>: test reservation</div>
                        <div>: 22-MAR-2017 18:00</div>
                        <div>: 24-MAR-2017 12:00</div>
                        <div>: <span className={Style.warning}>3 hour(s) left</span></div>
                    </div>
                </div>
                <div className={Style.line}></div>
                <div className={Style.title}>Sites (4):</div>
                <div className={Style.site}>
                    <div className={Style.col1}>
                        <div>Name</div>
                        <div>CPU reserved</div>
                        <div>Memory reserved</div>
                        <div>Status</div>
                    </div>
                    <div className={Style.col2}>
                        <div>: AIST Cloud</div>
                        <div>: 4</div>
                        <div>: 8</div>
                        <div>: running</div>
                    </div>
                </div>
                <div className={Style.site}>
                    <div className={Style.col1}>
                        <div>Name</div>
                        <div>CPU reserved</div>
                        <div>Memory reserved</div>
                        <div>Status</div>
                    </div>
                    <div className={Style.col2}>
                        <div>: AIST Cloud</div>
                        <div>: 4</div>
                        <div>: 8</div>
                        <div>: running</div>
                    </div>
                </div>
                <div className={Style.site}>
                    <div className={Style.col1}>
                        <div>Name</div>
                        <div>CPU reserved</div>
                        <div>Memory reserved</div>
                        <div>Status</div>
                    </div>
                    <div className={Style.col2}>
                        <div>: AIST Cloud</div>
                        <div>: 4</div>
                        <div>: 8</div>
                        <div>: running</div>
                    </div>
                </div>
                <div className={Style.site}>
                    <div className={Style.col1}>
                        <div>Name</div>
                        <div>CPU reserved</div>
                        <div>Memory reserved</div>
                        <div>Status</div>
                    </div>
                    <div className={Style.col2}>
                        <div>: AIST Cloud</div>
                        <div>: 4</div>
                        <div>: 8</div>
                        <div>: running</div>
                    </div>
                </div>
            </section>
        )
    }
}