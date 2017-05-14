import React,{Component} from 'react'
import Settings from './settings'

export default class SettingsContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            timezoneTimer: null
        }
    }

    setTimezoneThick(obj){
        this.setState({
            timezoneTimer: obj
        })
    }

    onClose(){
        clearInterval(this.state.timezoneTimer)
        this.props.dashBoardContainer.onCloseModal()
    }

    render() {
        return (
            <section>
                <Settings settingContainer={this} dashBoardContainer={this.props.dashBoardContainer} app={this.props.app}/>
            </section>
        )
    }
}