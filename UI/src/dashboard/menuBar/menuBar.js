import style from './menuBar.scss'
import React,{Component} from 'react'

export default class MenuBar extends Component{
    render(){
        return(
            <nav id={style.navigate}>
                <div className={style.menu} onClick={()=>this.props.menubarContainer.onSelectMenu('Search')} onMouseOver={()=>this.props.menubarContainer.onSearchOver()} onMouseOut={()=>this.props.menubarContainer.onSearchOut()}><img src='img/ic_search.svg' /><span className={style.text}>{this.props.menubarContainer.state.select}</span></div>
                <div className={style.menu} onClick={()=>this.props.menubarContainer.onSelectMenu('Runnings')} onMouseOver={()=>this.props.menubarContainer.onReserveOver()} onMouseOut={()=>this.props.menubarContainer.onReserveOut()}><img src='img/ic_play.svg' /><span className={style.text}>{this.props.menubarContainer.state.reservation}</span></div>
                <div className={style.menu} onClick={()=>this.props.menubarContainer.onSelectMenu('History')} onMouseOver={()=>this.props.menubarContainer.onHistoryOver()} onMouseOut={()=>this.props.menubarContainer.onHistoryOut()}><img src='img/ic_history.svg' /><span className={style.text}>{this.props.menubarContainer.state.history}</span></div>
                <div className={style.menu} onClick={()=>this.props.menubarContainer.onSelectMenu('Settings')} onMouseOver={()=>this.props.menubarContainer.onSettingOver()} onMouseOut={()=>this.props.menubarContainer.onSettingOut()}><img src='img/ic_settings.svg' /><span className={style.text}>{this.props.menubarContainer.state.setting}</span></div>
            </nav>
        )
    }
}