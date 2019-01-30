import React,{Component} from 'react'
import Style from './settings.scss'
import TimezoneContainer from './timezoneContainer'
import ResourceContainer from './resourceContainer'

export default class Settings extends Component {
    render() {
        return (
            <section>
                <section className={Style.panel} style={this.props.settingContainer.state.style.height}>
                        <header>
                            <div>{this.props.settingContainer.state.cardName}</div>
                            <img src='img/ic_close.svg' onClick={()=>this.props.settingContainer.onClose()} />
                        </header>
                        <nav>
                            <div className={Style.menu}>
                                <div className={Style.subMenu} onClick={()=>this.props.settingContainer.onChangeTab(1)}>
                                    <img src='img/ic_access_time_white.svg'/>
                                    <div className={Style.text}>Setting</div>
                                </div>
				<div className={Style.subMenu} onClick={()=>this.props.settingContainer.onChangeTab(2)} hidden={this.props.settingContainer.state.adminStatus}>
				    <img src='img/ic_access_time_white.svg'/>
				    <div className={Style.text}>Resource</div>
				</div>
                            </div>
                        </nav>
                        <div className={Style.content}>
                            {this.props.settingContainer.state.card}
                        </div>
                </section>
            </section>
        )
    }
}
