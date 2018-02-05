import React,{Component} from 'react'
import Style from './settings.scss'
import TimezoneContainer from './timezoneContainer'
import ResourceContainer from './resourceContainer'
export default class Settings2 extends Component {
    render() {
        return (
            <section>
                <section className={Style.panel}>
                    <header>
                        <div>Resource Register</div>
                        <img src='img/ic_close.svg' onClick={()=>this.props.settingContainer2.onClose()} />
                    </header>
                    <nav>
                        <div className={Style.menu}>
                            <div className={Style.subMenu} >
                                <img src='img/ic_access_time_white.svg'/>
                                <div className={Style.text}>Timezone</div>
                            </div>
                            <div className={Style.subMenu}>
                                <img src='img/ic_access_time_white.svg'/>
                                <div className={Style.text}>Resource</div>
                            </div>
                        </div>
                    </nav>
                    <div className={Style.content}>
                    	<ResourceContainer settingContainer2={this.props.settingContainer2} dashBoardContainer={this.props.dashBoardContainer} app={this.props.app}/>
		    </div>
                </section>
            </section>
        )
    }
}
