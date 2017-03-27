import React, { Component } from 'react'
import History from './history'
import moment from 'moment'

export default class HistoryContainer extends Component {
    constructor(props){
        super(props)
        this.appContainer = this.props.dashBoardContainer.props.app
        this.dashboardContainer = this.props.dashBoardContainer
        this.timezone = moment.tz(this.appContainer.state.authen.timezone)

        this.state = {
            extendDate:{
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            extendTime: this.timezone.format().slice(11,13)+':00'
        }

        this.onClose = this.onClose.bind(this)
        this.onExtendDateChange = this.onExtendDateChange.bind(this)
        this.onExtendTimeChange = this.onExtendTimeChange.bind(this)
    }

    onClose(){
        this.dashboardContainer.onCloseModal()
    }

    onExtendDateChange(date){
         this.setState({
            extendDate:{
                obj: date,
                date: moment(date).format('YYYY-MM-DD')
            } 
        })
    }

    onExtendTimeChange(event){
        this.setState({
            extendTime: event.target.value
        })
    }

    render() {
        return (
            <History historyContainer={this}/>
        )
    }
}