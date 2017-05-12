import React,{Component} from 'react'
import MenuBar from './menuBar'
import SettingsContainer from '../settings/settingsContainer'

export default class MenuBarContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            select: '',
            reservation: '',
            history: '',
            setting: '',
            tutorial: ''
        }
    }

    onSelectMenu(menu){
        this.props.dashBoardContainer.onSelectMenu(menu)
    }

    onSearchOver(){
        this.setState({
            select: 'Search'
        })
    }

    onSearchOut(){
        this.setState({
            select: ''
        })
    }

    onReserveOver(){
        this.setState({
            reservation: 'Existing reservations'
        })
    }

    onReserveOut(){
        this.setState({
            reservation: ''
        })
    }

    onHistoryOver(){
        this.setState({
            history: 'Past reservations'
        })
    }

    onHistoryOut(){
        this.setState({
            history: ''
        })
    }

    onSettingOver(){
        this.setState({
            setting: 'Settings'
        })
    }

    onHelpsOver(){
        this.setState({
            tutorial: 'Helps'
        })
    }

    onHelpsOut(){
        this.setState({
            tutorial: ''
        })
    }

    onSettingOut(){
        this.setState({
            setting: ''
        })
    }

    render(){
        return(
            <section>
                <MenuBar menubarContainer={this}/>
            </section>
        )
    }
}