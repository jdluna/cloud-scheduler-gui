import style from './menuBar.scss'
import React,{Component} from 'react'

export default class MenuBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            select: '',
            reservation: '',
            history: '',
            setting: ''
        }
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
            reservation: 'Reservations'
        })
    }

    onReserveOut(){
        this.setState({
            reservation: ''
        })
    }

    onHistoryOver(){
        this.setState({
            history: 'History'
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

    onSettingOut(){
        this.setState({
            setting: ''
        })
    }

    render(){
        return(
            <nav id={style.navigate}>
                <div className={style.menu} onMouseOver={()=>this.onSearchOver()} onMouseOut={()=>this.onSearchOut()}><img src='img/ic_search.svg' /><span className={style.text}>{this.state.select}</span></div>
                <div className={style.menu} onMouseOver={()=>this.onReserveOver()} onMouseOut={()=>this.onReserveOut()}><img src='img/ic_play.svg' /><span className={style.text}>{this.state.reservation}</span></div>
                <div className={style.menu} onMouseOver={()=>this.onHistoryOver()} onMouseOut={()=>this.onHistoryOut()}><img src='img/ic_history.svg' /><span className={style.text}>{this.state.history}</span></div>
                <div className={style.menu} onMouseOver={()=>this.onSettingOver()} onMouseOut={()=>this.onSettingOut()}><img src='img/ic_settings.svg' /><span className={style.text}>{this.state.setting}</span></div>
            </nav>
        )
    }
}