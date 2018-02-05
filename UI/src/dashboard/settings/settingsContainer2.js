import React,{Component} from 'react'
import Settings from './setting2'
import SuccessDialog from './successDialog'
import ErrorDialog from './ErrorDialog'
import Resource from './resource'

export default class SettingsContainer2 extends Component {
    constructor(props){
        super(props)
        this.state = {
            timezoneTimer: null,
            dialog: 'main',
            changeTab: 'timezoneTab'
        }

        this.onChangeTab = this.onChangeTab.bind(this);
    }

    onChangeTab(){
        const currentTab = this.state.changeTab
        this.setState({
            changeTab: currentTab
        })
    }


    setTimezoneThick(obj){
        this.setState({
            timezoneTimer: obj
        })
    }

    showStatus(name){
        clearInterval(this.state.timezoneTimer)
        this.setState({
            dialog: name
        })
    }

    onClose(){
        clearInterval(this.state.timezoneTimer)
        this.props.dashBoardContainer.onCloseModal()
    }

    render() {
        let dialog = null
        switch(this.state.dialog){
            case 'main'     : dialog = <Settings settingContainer2={this} dashBoardContainer={this.props.dashBoardContainer} app={this.props.app}/>;break;
            case 'success'  : dialog = <SuccessDialog msg='Update Success!' onCloseDialog={()=>this.onClose()}/>;break;
            case 'error'    : dialog = <ErrorDialog msg='Update Error!' onCloseDialog={()=>this.onClose()}/>;break;
        }
        return (
            <section className='modal'>
                {dialog}
            </section>
        )
    }
}
