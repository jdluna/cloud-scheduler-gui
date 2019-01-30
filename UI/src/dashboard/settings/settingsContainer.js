import React,{Component} from 'react'
import Settings from './settings'
import SuccessDialog from './successDialog'
import ErrorDialog from './ErrorDialog'
import Resource from './resource'
import TimezoneContainer from './timezoneContainer'
import ResourceContainer from './resourceContainer'
export default class SettingsContainer extends Component {
    componentDidMount(){
        if(this.state.settingCard == 'TimezoneContainer'){
            this.onChangeTab(1)
        }else if(this.state.settingCard == 'ResourceContainer'){
            this.onChangeTab(2)
        }
    } 
    constructor(props){
        super(props)
        this.state = {
            timezoneTimer: null,
            dialog: 'main',
            settingCard: this.props.dashBoardContainer.state.settingCard,
            card: null,
            cardName: null,
            style:{
               height:{}
            }
        }
        this.setSettingCard = this.setSettingCard.bind(this)
        this.setTimezoneThick = this.setTimezoneThick.bind(this)
        this.onChangeTab = this.onChangeTab.bind(this)
    }
    setSettingCard(){
        this.setState({
            card: <this.state.settingCard settingContainer={this} dashBoardContainer={this.props.dashBoardContinaer} app={this.props.app}/>
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
    onChangeTab(tab){
        switch(tab){
            case 1 : 
                this.setState({
                    card: <TimezoneContainer settingContainer={this} dashBoardContainer={this.props.dashBoardContainer} app={this.props.app}/>,
                    cardName: 'Setting',
                    style:{
                        height: { height: '400px' }
                    }
                });
                break
            case 2 : 
                clearInterval(this.state.timezoneTimer);
                this.setState({
                    card: <ResourceContainer settingContainer={this} dashBoardContainer={this.props.dashBoardContainer} app={this.props.app}/>,
                    cardName: 'Resource',
                    style:{
                        height: {height: '700px'}
                    }
                });
                break
        }
    }
    onClose(){
        clearInterval(this.state.timezoneTimer)
        this.props.dashBoardContainer.onCloseModal()
    }

    render() {
        let dialog = null
        switch(this.state.dialog){
            case 'main'     : dialog = <Settings settingContainer={this} dashBoardContainer={this.props.dashBoardContainer} app={this.props.app}/>;break;
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
