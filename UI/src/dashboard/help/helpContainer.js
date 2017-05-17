import React, { Component } from 'react'
import Help from './help'
import Help1 from './help1'
import Help2 from './help2'
import Help3 from './help3'

export default class HelpContainer extends Component {
    constructor(props){
        super(props)
        this.dashboardContainer = this.props.dashBoardContainer
        this.state = {
            card: <Help1 container={this}/>
        }
    }

    onClose(){
        this.dashboardContainer.onCloseModal()
    }

    onChangeCard(card){
        switch(card){
            case 0 : this.onClose();break
            case 1 : this.setState({card: <Help1 container={this}/>});break
            case 2 : this.setState({card: <Help2 container={this}/>});break
            case 3 : this.setState({card: <Help3 container={this}/>});break
        }
    }

    render() {
        return (
            <section>
                <Help container={this}/>
            </section>
        )
    }
}