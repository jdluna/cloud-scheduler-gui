import React,{Component} from 'react'
import Style from './settings.scss'
import TimezoneContainer from './timezoneContainer'

export default class Settings extends Component {
    render() {
        return (
            <section>
                    <section className={Style.panel}>
                        <header>
                            <div>Settings</div>
                            <img src='img/ic_close.svg' onClick={()=>this.props.settingContainer.onClose()} />
                        </header>
                        <nav>
                            <div className={Style.menu}>
                                <div>
                                    <img src='img/ic_access_time_white.svg'/>
                                    <div className={Style.text}>Timezone</div>
                                </div>
                            </div>
                        </nav>
                        <div className={Style.content}>
                            <TimezoneContainer settingContainer={this.props.settingContainer} dashBoardContainer={this.props.dashBoardContainer} app={this.props.app}/>
                        </div>
                    </section>
            </section>
        )
    }
}