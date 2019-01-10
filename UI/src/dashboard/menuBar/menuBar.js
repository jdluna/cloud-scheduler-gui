import style from './menuBar.scss'
import React,{Component} from 'react'

export default class MenuBar extends Component{
    render(){
        return(
            <nav id={style.navigate}>
                <div className={style.menu1} onClick={()=>this.props.menubarContainer.onSelectMenu('Search')} onMouseOver={()=>this.props.menubarContainer.onSearchOver()} onMouseOut={()=>this.props.menubarContainer.onSearchOut()}><img src='img/ic_search.svg' /><span className={style.text}>{this.props.menubarContainer.state.select}</span></div>
                <div className={style.menu2} onClick={()=>this.props.menubarContainer.onSelectMenu('Existing reservations')} onMouseOver={()=>this.props.menubarContainer.onReserveOver()} onMouseOut={()=>this.props.menubarContainer.onReserveOut()}><img width='24' height='24' src='img/exist_reservation.png' className={style.exist}/><span className={style.text}>{this.props.menubarContainer.state.reservation}</span></div>
                <div className={style.menu3} onClick={()=>this.props.menubarContainer.onSelectMenu('Past reservations')} onMouseOver={()=>this.props.menubarContainer.onHistoryOver()} onMouseOut={()=>this.props.menubarContainer.onHistoryOut()}><img src='img/ic_history.svg' /><span className={style.text}>{this.props.menubarContainer.state.history}</span></div>
                <div className={style.menu4} onClick={()=>this.props.menubarContainer.onSelectMenu('Settings')} onMouseOver={()=>this.props.menubarContainer.onSettingOver()} onMouseOut={()=>this.props.menubarContainer.onSettingOut()}><img src='img/ic_settings.svg' /><span className={style.text}>{this.props.menubarContainer.state.setting}</span></div>
                <div className={style.menu5} onClick={()=>this.props.menubarContainer.onSelectMenu('Help')} onMouseOver={()=>this.props.menubarContainer.onHelpsOver()} onMouseOut={()=>this.props.menubarContainer.onHelpsOut()}><img src='img/ic_help.svg' /><span className={style.text}>{this.props.menubarContainer.state.tutorial}</span></div>
            	<div className={style.menu6} onClick={()=>this.props.menubarContainer.onSelectMenu('Resource')} onMouseOver={()=>this.props.menubarContainer.onResourceOver()} onMouseOut={()=>this.props.menubarContainer.onResourceOut()}><img src='img/ic_resource.svg' /><span className={style.text}>{this.props.menubarContainer.state.resource}</span></div>
		</nav>
        )
    }
}
