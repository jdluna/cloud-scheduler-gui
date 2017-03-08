import React,{Component} from 'react'
import Style from './timezone.scss'

export default class Timezone extends Component {
    render() {
        return (
            <section className={Style.wrap}>
                <section className={Style.article}>
                    <div className={Style.text}>Time zone</div>
                </section>
                <section className={Style.content}>
                    <div className={Style.data}>
                        <svg width='200' height='217'>
                             <image href='' width='200' height='207' />
                        </svg>
                    </div>
                    <div className={Style.data}>
                        <div className={Style.time}>18:01</div>
                        <div className={Style.date}>09 NOVEMBER 2016</div>
                        
                        <select className={Style.list} onChange={this.props.timezonesContainer.onSelectTimezone}>
                            {this.props.timezonesContainer.state.timezones}
                        </select>
                        <div className={Style.btn}>
                            <button onClick={this.props.timezonesContainer.onCloseSettings} className={Style.cancel}>CANCEL</button>
                            <button className={Style.ok}>OK</button>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}