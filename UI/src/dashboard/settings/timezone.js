import React,{Component} from 'react'
import Style from './timezone.scss'

export default class Timezone extends Component {
    render() {
        return (
            <section className={Style.wrap}>
                {/*<section className={Style.article}>
                    <div className={Style.text}>Time zone</div>
                </section>*/}
                <section className={Style.content}>
                    <div className={Style.data}>
                        <svg width='200' height='217'>
                             <image href='' width='200' height='207' />
                        </svg>
                    </div>
                    <div className={Style.data}>
                        <div className={Style.time}>{this.props.timezonesContainer.state.time}</div>
                        <div className={Style.date}>{this.props.timezonesContainer.state.date}</div>
                        <div className={Style.width}>
                            <select className={Style.list} onChange={this.props.timezonesContainer.onSelectTimezone}>
                                {this.props.timezonesContainer.state.timezones}
                            </select>
                            <div className={Style.btn}>
                                <button onClick={this.props.timezonesContainer.onCloseSettings} className={Style.cancel}>CANCEL</button>
                                <button onClick={this.props.timezonesContainer.onSetTimezone} className={Style.ok}>OK</button>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}