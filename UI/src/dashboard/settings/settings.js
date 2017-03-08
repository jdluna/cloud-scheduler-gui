import React,{Component} from 'react'
import Style from './settings.scss'
import TimezoneContainer from './timezoneContainer'

export default class Settings extends Component {
    render() {
        return (
            <section className='modal'>
                    <section className={Style.panel}>
                        <header><div>Settings</div></header>
                        <nav>
                            <div className={Style.menu}>
                                <div>
                                    <img src='img/ic_access_time_white.svg'/>
                                    <div className={Style.text}>Time zone</div>
                                </div>
                            </div>
                        </nav>
                        <div className={Style.content}>
                            <TimezoneContainer dashBoardContainer={this.props.dashBoardContainer}/>
                        </div>
                    </section>
            </section>
        )
    }
}