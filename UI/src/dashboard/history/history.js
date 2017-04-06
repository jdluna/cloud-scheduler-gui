import React, { Component } from 'react'
import Style from './history.scss'
import Table from './table'
import Detail from './detail'
import ExtendPopup from './extendPopup'
import DeletePopup from './deletePopup'

const TAB_MENU = (props) => {
    if(props.historyContainer.state.tab=='all'){
        return(
            <div className={Style.header}>
                <div className={Style.menu}>
                    <div className={Style.selecttableft} onClick={props.historyContainer.onSelectAllRunningTab}>
                        <div>All reservations</div>
                    </div>
                    <div className={Style.tab} onClick={props.historyContainer.onSelectMyRunningTab}>
                        <div>My reservations</div>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className={Style.header}>
                <div className={Style.menu}>
                    <div className={Style.tab} onClick={props.historyContainer.onSelectAllRunningTab}>
                        <div>All reservations</div>
                    </div>
                    <div className={Style.selecttabright} onClick={props.historyContainer.onSelectMyRunningTab}>
                        <div>My reservations</div>
                    </div>
                </div>
            </div>
        )
    }
}

const DETAIL_LABEL = () => (
    <div className={Style.detaillabel}>
        <div>Click on any reservation's title</div>
        <div>to see more information.</div>
    </div>
)

const FOOTER_TABLE = () => (
    <div className={Style.footer}>
        <div>Click on</div>
        <img className={Style.icon} src='img/ic_add_circle.svg' />
        <div>to extend a reservation or</div>
        <img className={Style.icon} src='img/ic_remove_circle.svg' />
        <div>to cancel a reservation.</div>
    </div>
)

export default class History extends Component {
    render() {
        let {modalName} = this.props.historyContainer.dashboardContainer.state
        let {user,tab,viewDetail,popup} = this.props.historyContainer.state
        let detail = (viewDetail==false) ? <DETAIL_LABEL/> : <Detail historyContainer={this.props.historyContainer}/>
        let tabMenu = (user=='admin') ? <TAB_MENU historyContainer={this.props.historyContainer}/> : []
        let footerTable = (user=='admin'&&modalName.toLowerCase()!='history'&&tab!='all'||user!='admin'&&modalName.toLowerCase()!='history'&&tab=='all') ? <FOOTER_TABLE/> : []
        let popupElement
        switch(popup){
            case 'extend' : popupElement = <ExtendPopup historyContainer={this.props.historyContainer}/>;break
            case 'delete' : popupElement = <DeletePopup historyContainer={this.props.historyContainer}/>;break
        }
        return (
            <section className='modal'>
                <section className={Style.panel}>
                    <header>
                        <div>{modalName}</div>
                        <img src='img/ic_close.svg' onClick={this.props.historyContainer.onClose} />
                    </header>
                    <section className={Style.content}>
                        <div className={Style.result}>
                            {tabMenu}
                            <div ref='wrap' className={Style.data}>
                                <Table historyContainer={this.props.historyContainer}/>
                            </div>
                            {footerTable}
                        </div>
                        <div className={Style.resultdetail}>
                            <div className={Style.header}>
                                <div className={Style.text}>Reservation detail</div>
                            </div>
                            <div className={Style.data}>
                                {detail}
                            </div>
                            {popupElement}
                            {/*{<ExtendPopup historyContainer={this.props.historyContainer} />}*/}
                        </div>
                    </section>
                </section>
            </section>
        )
    }
}