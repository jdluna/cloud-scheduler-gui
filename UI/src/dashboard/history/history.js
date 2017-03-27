import React, { Component } from 'react'
import Style from './history.scss'
import Table from './table'
import Detail from './detail'
import ExtendPopup from './extendPopup'
import DeletePopup from './deletePopup'

const TAB_MENU = () => (
    <div className={Style.menu}>
        <div className={Style.selecttableft}>
            <div>All reservations</div>
        </div>
        <div className={Style.tab}>
            <div>My reservations</div>
        </div>
    </div>
)

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
        return (
            <section className='modal'>
                <section className={Style.panel}>
                    <header>
                        <div>Reservations</div>
                        <img src='img/ic_close.svg' onClick={this.props.historyContainer.onClose} />
                    </header>
                    <section className={Style.content}>
                        <div className={Style.result}>
                            <div className={Style.header}>
                                {<TAB_MENU />}
                            </div>
                            <div className={Style.data}>
                                <Table />
                            </div>
                            {<FOOTER_TABLE/>}
                        </div>
                        <div className={Style.resultdetail}>
                            <div className={Style.header}>
                                <div className={Style.text}>Reservation detail</div>
                            </div>
                            <div className={Style.data}>
                                {<Detail />}
                            </div>
                            {<ExtendPopup historyContainer={this.props.historyContainer} />}
                        </div>
                    </section>
                </section>
            </section>
        )
    }
}