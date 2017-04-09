import React, { Component } from 'react'
import History from './history'
import moment from 'moment'
import axios from 'axios'
import {
    ALL_RESERVATIONS_ENDPOINT,
    MY_RESERVATIONS_ENDPOINT,
    MY_ENDED_RESERVATIONS_ENDPOINT,
    ALL_ENDED_RESERVATIONS_ENDPOINT,
    EXTEND_RESERVATION_ENDPOINT,
    DELETE_RESERVATION_ENDPOINT
} from '../../config/endpoints'

export default class HistoryContainer extends Component {
    constructor(props){
        super(props)
        this.appContainer = this.props.dashBoardContainer.props.app
        this.dashboardContainer = this.props.dashBoardContainer
        this.timezone = moment.tz(this.appContainer.state.authen.timezone)

        this.state = {
            user: this.appContainer.state.authen.data.status.toLowerCase(),
            viewDetail: false,
            reserveId: null,
            viewDetailKey: null,
            tab: 'all',
            reservationsItem: [],
            extendDate:{
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            extendTime: this.timezone.format().slice(11,13)+':00',
            reasonOfDelete: '',
            popup: null,
            extendStatus: '',
            deleteStatus: ''
        }

        this.onClose = this.onClose.bind(this)
        this.onReasonOfDeleteChange = this.onReasonOfDeleteChange.bind(this)
        this.onExtendConfirm = this.onExtendConfirm.bind(this)
        this.onDeleteConfirm = this.onDeleteConfirm.bind(this)
        this.onClosePopup = this.onClosePopup.bind(this)
        this.onExtendBtnClick = this.onExtendBtnClick.bind(this)
        this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this)
        this.onViewReservationDetail = this.onViewReservationDetail.bind(this)
        this.onSelectAllRunningTab = this.onSelectAllRunningTab.bind(this)
        this.onSelectMyRunningTab = this.onSelectMyRunningTab.bind(this)
        this.onExtendDateChange = this.onExtendDateChange.bind(this)
        this.onExtendTimeChange = this.onExtendTimeChange.bind(this)
        this.getReservationsCountDown = this.getReservationsCountDown.bind(this)
    }

    onClose(){
        this.dashboardContainer.onCloseModal()
    }

    onReasonOfDeleteChange(event){
        this.setState({
            reasonOfDelete: event.target.value
        })
    }

    onExtendConfirm(){
        let params = {
            params:{
                session_id: this.appContainer.state.authen.session,
                end: this.state.extendDate.date+' '+this.state.extendTime+':00',
                reservation_id: this.state.reserveId
            }
        }
        axios.get(EXTEND_RESERVATION_ENDPOINT,params).then(response=>{
            let {status,data} = response
            if(status==200&&data){
                if(data.result=='True'){
                    this.setState({
                        extendStatus: 'success'
                    },this.setCountDownClosePopup)
                }else{
                    this.setState({
                        extendStatus: 'fail'
                    },this.setCountDownClosePopup)
                }
            }
        }).catch(error=>{
            console.log('QUERY EXTEND RESERVATIONS ERROR: '+error)
        })
    }

    onDeleteConfirm(){
        let params = {
            params:{
                session_id: this.appContainer.state.authen.session,
                reservation_id: this.state.reserveId,
                reason: this.state.reasonOfDelete
            }
        }
        axios.get(DELETE_RESERVATION_ENDPOINT,params).then(response=>{
            let {status,data} = response
            if(status==200&&data){
                if(data.result=='True'){
                    this.setState({
                        reasonOfDelete: '',
                        deleteStatus: 'success'
                    },this.setCountDownClosePopup)
                }else{
                    this.setState({
                        reasonOfDelete: '',
                        deleteStatus: 'fail'
                    },this.setCountDownClosePopup)
                }
            }
        }).catch(error=>{
            console.log('QUERY DELETE RESERVATIONS ERROR: '+error)
        })
    }

    onClosePopup(){
        this.setState({
            popup: null,
            extendStatus: null,
            deleteStatus: null
        })
    }

    onExtendBtnClick(event){
        this.setState({
            popup: 'extend'
        })
    }

    onDeleteBtnClick(event){
        this.setState({
            popup: 'delete'
        })
    }
    
    onViewReservationDetail(key,reservation_id){
        let end = this.state.reservationsItem[key].end
        let time = (parseInt(moment(end).format().slice(11,13))<23) ? parseInt(moment(end).format().slice(11,13))+1 : '00'
        time = (time<10) ? '0'+time : time
        this.setState({
            extendDate:{
                obj: moment(end),
                date: moment(end).format('YYYY-MM-DD')
            },
            extendTime: time+':00',
            viewDetail: true,
            reserveId: reservation_id,
            viewDetailKey: key
        })
    }

    onSelectAllRunningTab(){
        let {modalName} = this.dashboardContainer.state
        modalName = modalName.toLowerCase()
        if(this.state.user=='admin'&&modalName!='history'){
            this.queryReservationsItem(ALL_RESERVATIONS_ENDPOINT)
        }else if(this.state.user=='admin'&&modalName=='history'){
            this.queryReservationsItem(ALL_ENDED_RESERVATIONS_ENDPOINT)
        }
        this.setState({
            viewDetail: false
        })
    }

    onSelectMyRunningTab(){
        let {modalName} = this.dashboardContainer.state
        modalName = modalName.toLowerCase()
        if(this.state.user=='admin'&&modalName!='history'){
            this.queryReservationsItem(MY_RESERVATIONS_ENDPOINT,'my')
        }else if(this.state.user=='admin'&&modalName=='history'){
            this.queryReservationsItem(MY_ENDED_RESERVATIONS_ENDPOINT,'my')
        }
        this.setState({
            viewDetail: false
        })
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
                            leftDate = '-'
                        }
                    }
                }
            }
        }
        return leftDate
    }

    queryReservationsItem(ENDPOINT,TAB='all'){
        let params = {
            params:{
                session_id: this.appContainer.state.authen.session
            }
        }
        axios.get(ENDPOINT,params).then(response=>{
            let {status,data} = response
            if(status==200&&data.result){
                this.setState({
                    popup: null,
                    // viewDetail: false,
                    tab: TAB,
                    viewDetailKey: -1,
                    reservationsItem: data.result
                })
            }
        }).catch(error=>{
            console.log('QUERY RESERVATIONS ERROR: '+ENDPOINT+' '+error)
        })
    }

    componentWillMount(){
        let {modalName} = this.dashboardContainer.state
        modalName = modalName.toLowerCase()
        if(this.state.user=='admin'&&modalName!='history'){
            this.queryReservationsItem(ALL_RESERVATIONS_ENDPOINT)
        }else if(this.state.user=='admin'&&modalName=='history'){
            this.queryReservationsItem(ALL_ENDED_RESERVATIONS_ENDPOINT)
        }else if(this.state.user!='admin'&&modalName!='history'){
            this.queryReservationsItem(MY_RESERVATIONS_ENDPOINT)
        }else if(this.state.user!='admin'&&modalName=='history'){
            this.queryReservationsItem(MY_ENDED_RESERVATIONS_ENDPOINT)
        }
    }

    setCountDownClosePopup(){
        setTimeout(()=>{
            this.setState({
                popup: null,
                extendStatus: '',
                deleteStatus: ''
            },this.queryReservationsItem(MY_RESERVATIONS_ENDPOINT,'my'))
        },5000)
    }

    render() {
        return (
            <History historyContainer={this}/>
        )
    }
}