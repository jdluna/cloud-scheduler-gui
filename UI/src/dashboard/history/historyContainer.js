import React, { Component } from 'react'
import History from './history'
import moment from 'moment'
import axios from 'axios'
import {ALL_RESERVATIONS_ENDPOINT,MY_RESERVATIONS_ENDPOINT} from '../../config/endpoints'

export default class HistoryContainer extends Component {
    constructor(props){
        super(props)
        this.appContainer = this.props.dashBoardContainer.props.app
        this.dashboardContainer = this.props.dashBoardContainer
        this.timezone = moment.tz(this.appContainer.state.authen.timezone)

        this.state = {
            user: this.appContainer.state.authen.data.position.toLowerCase(),
            reservationsItem: [],
            extendDate:{
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            extendTime: this.timezone.format().slice(11,13)+':00'
        }

        this.onClose = this.onClose.bind(this)
        this.onExtendDateChange = this.onExtendDateChange.bind(this)
        this.onExtendTimeChange = this.onExtendTimeChange.bind(this)
        this.getReservationsCountDown = this.getReservationsCountDown.bind(this)
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

    getReservationsCountDown(endDate){
        let start = this.timezone.format('YYYY-MM-DD HH:mm')
        let end = moment(endDate,'YYYY-MM-DD HH:mm')

        let day = end.diff(start,'days')
        let hour = end.diff(start,'hours')
        let year = end.diff(start,'years')
        let minute = end.diff(start,'minutes')
        let second = end.diff(start,'seconds')

        let leftDate = ''
        if(year>=1){
            leftDate = year+' year(s) left'
        }else{
            if(day>=1){
                leftDate = day+' day(s) left'
            }else{
                if(hour>=1){
                    leftDate = hour+' hour(s) left'
                }else{
                    if(minute>=1){
                        leftDate = minute+' minute(s) left'
                    }else{
                        if(second>=1){
                            leftDate = second+' second(s) left'
                        }else{
                            leftDate = 'calceled'
                        }
                    }
                }
            }
        }
        return leftDate
    }

    queryReservationsItem(ENDPOINT){
        let params = {
            params:{
                session_id: this.appContainer.state.authen.session
            }
        }
        axios.get(ENDPOINT,params).then(response=>{
            let {status,data} = response
            if(status==200&&data.result){
                this.setState({
                    reservationsItem: data.result
                })
                console.log(data)
            }else{
                console.log(response)
            }
        }).catch(error=>{
            console.log('QUERY RESERVATIONS ERROR: '+ENDPOINT+' '+error)
        })
    }

    componentWillMount(){
        this.queryReservationsItem(MY_RESERVATIONS_ENDPOINT)
    }

    render() {
        return (
            <History historyContainer={this}/>
        )
    }
}