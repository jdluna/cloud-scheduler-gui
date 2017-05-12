import React, { Component } from 'react'
import Style from './help.scss'

export default class Help extends Component {
    render() {
        return (
            <section className='modal'>
                <section className={Style.panel}>
                    <header>
                        <div>Helps</div>
                        <img src='img/ic_close.svg' onClick={()=>this.props.container.onClose()}/>
                    </header>
                    <section className={Style.content}>

                    </section>
                </section>
            </section>
        )
    }
}