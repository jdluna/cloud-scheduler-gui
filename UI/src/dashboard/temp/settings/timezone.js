import React,{Component} from 'react'
import Style from './timezone.scss'

export default class Timezone extends Component {
    render() {
        return (
            <section className={Style.wrap}>
                <section className={Style.content}>
                    <div className={Style.top}>
                        <img src='img/timezone_map.png' width='80%'/>
                    </div>
                    <div className={Style.bottom}>
                        <div className={Style.left}>
                            <div className={Style.time}>{this.props.timezonesContainer.state.time}</div>
                            <div className={Style.date}>{this.props.timezonesContainer.state.date}</div>
                        </div>
                        <div className={Style.right}>
                            <div className={Style.width}>
                                <select className={Style.list} onChange={this.props.timezonesContainer.onSelectTimezone} value={this.props.timezonesContainer.state.nowTimezone}>
                                    {this.props.timezonesContainer.state.timezones}
                                </select>
                                <div className={Style.btn}>
                                    <button onClick={this.props.timezonesContainer.onCloseSettings} className={Style.cancel}>CANCEL</button>
                                    <button onClick={this.props.timezonesContainer.onSetTimezone} className={Style.ok}>OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}