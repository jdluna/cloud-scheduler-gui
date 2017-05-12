import React, { Component } from 'react'
import Help from './help'

export default class HelpContainer extends Component {
    constructor(props){
        super(props)
        this.dashboardContainer = this.props.dashBoardContainer
    }

    onClose(){
        this.dashboardContainer.onCloseModal()
    }

    render() {
        return (
            <section>
                <Help container={this}/>
            </section>
        )
    }
}