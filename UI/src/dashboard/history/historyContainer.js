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
            startExtendDate:{
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            maxExtendDate:{
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            startExtendTime: this.timezone.format().slice(11,13)+':00',
            maxExtendTime: 23,
            reasonOfDelete: '',
            popup: null,
            extendStatus: '',
            deleteStatus: '',
            startDuration: this.timezone.format().slice(11,13)+':00',
            endDuration: 23,
            loading: true,
            extendTime: this.timezone.format().slice(11,13)+':00'
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
        let extendDateTime = this.state.extendDate.date+' '+this.state.extendTime

        let timezoneOffset = parseInt(moment.tz(this.appContainer.state.authen.timezone).utcOffset()) / 60

        if(timezoneOffset >=10 || timezoneOffset<=-10){
            if(timezoneOffset < 0){
                timezoneOffset = timezoneOffset.toString() +'00'
            }else{
                timezoneOffset = '+'+timezoneOffset.toString() +'00'
            }
        }else{
            if(timezoneOffset < 0){
                timezoneOffset = timezoneOffset.toString()
                timezoneOffset = timezoneOffset.slice(0,1)+'0'+timezoneOffset.slice(1,2)+'00'
            }else{
                timezoneOffset = timezoneOffset.toString()
                timezoneOffset = '+0'+timezoneOffset.toString()+'00'
            }
        }
        
        let extendDateTimeUTC = moment(extendDateTime+" "+timezoneOffset, "YYYY-MM-DD HH:mm Z").tz("UTC").format('YYYY-MM-DD HH:mm:00');

        let params = {
            params:{
                session_id: this.appContainer.state.authen.session,
                end: extendDateTimeUTC,
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
        end = moment(end+" +0000", "YYYY-MM-DD HH:mm Z").tz(this.appContainer.state.authen.timezone)
        end = (parseInt(moment(end).format('HH'))<23) ? moment(end).format('YYYY-MM-DD') : moment(end).add(1,'days').format('YYYY-MM-DD')

        let time = (parseInt(moment(end).format().slice(11,13))<23) ? parseInt(moment(end).format().slice(11,13))+1 : '00'
        time = (time<10) ? '0'+time : time
        let timeMax = time - 1
        timeMax = (timeMax<10) ? '0'+timeMax : timeMax
        let currentTime = moment.tz(this.appContainer.state.authen.timezone)
        let nextMonth = moment.tz(this.appContainer.state.authen.timezone).add(1,'months')
        moment.tz(this.appContainer.state.authen.timezone).subtract(1,'months')

        this.setState({
            extendDate:{
                obj: moment(end),
                date: end
            },
            startExtendTime: moment(end+" +0000", "YYYY-MM-DD HH:mm Z").tz(this.appContainer.state.authen.timezone).add(1,'hours').format('HH:00'),
            maxExtendTime: currentTime.format('HH:00'),
            viewDetail: true,
            reserveId: reservation_id,
            viewDetailKey: key,
            startExtendDate: {
                obj: moment(end),
                date: end
            },
            maxExtendDate: {
                obj: nextMonth,
                date: nextMonth.format('YYYY-MM-DD')
            },
            startDuration : moment(end+" +0000", "YYYY-MM-DD HH:mm Z").tz(this.appContainer.state.authen.timezone).add(1,'hours').format('HH:00')
        },()=>{
            this.setState({
                extendTime: this.state.startExtendTime
            })
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
            viewDetail: false,
            loading: true,
            tab: 'all'
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
            viewDetail: false,
            loading: true,
            tab: 'my'
        })
    }

    onExtendDateChange(date){
         this.setState({
            extendDate:{
                obj: date,
                date: moment(date).format('YYYY-MM-DD')
            } 
        },()=>{
            
            if(this.state.extendDate.date==this.state.startExtendDate.date){
                //old end date
                this.setState({
                    startDuration: this.state.startExtendTime,
                    endDuration: 23
                })   
            }
            else if(this.state.extendDate.date==this.state.maxExtendDate.date){
                //last date able to reservation
                this.setState({
                    startDuration: 0,
                    endDuration: this.state.maxExtendTime
                }) 
            }
            else{
                this.setState({
                    startDuration: 0,
                    endDuration: 23
                }) 
            }
            
        })
    }

    onExtendTimeChange(event){
        this.setState({
            extendTime: event.target.value
        })
    }

    getReservationsCountDown(endDate){
        let start = moment.utc().format('YYYY-MM-DD HH:mm')
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

    queryReservationsItem(ENDPOINT,TAB='all',RM_TAB=true,POPUP=false){
        let params = {
            params:{
                session_id: this.appContainer.state.authen.session
            }
        }
        axios.get(ENDPOINT,params).then(response=>{
            let {status,data} = response
            if(status==200&&data.result){
                data.result.sort((a,b)=>{
                    let nowDateTime = this.timezone.format('YYYY-MM-DD HH:mm')
                    let first = moment(a.end,'YYYY-MM-DD HH:mm')
                    let second = moment(b.end,'YYYY-MM-DD HH:mm')
                    let firstDiff = first.diff(nowDateTime)
                    let secondDiff = second.diff(nowDateTime)
                    return firstDiff-secondDiff
                })
                this.setState({
                    popup: (POPUP==false) ? null : this.state.popup,
                    // viewDetail: false,
                    tab: TAB,
                    viewDetailKey: (RM_TAB==true) ? -1 : this.state.viewDetailKey,
                    reservationsItem: data.result,
                    loading: false
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
        this.queryReservationsItem(MY_RESERVATIONS_ENDPOINT,'my',false,true)
        setTimeout(()=>{
            this.setState({
                popup: null,
                extendStatus: '',
                deleteStatus: ''
            })
        },5000)
    }

    render() {
        return (
            <History historyContainer={this}/>
        )
    }
}