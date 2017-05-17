import React,{Component} from 'react'
import Timezone from './timezone'
import TimeZoneName from '../../lib/timezones/timezones'
import axios from 'axios'
import {SET_TIMEZONE_ENDPOINT} from '../../config/endpoints'
import moment from 'moment-timezone'

export default class TimezoneContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            timezones: [],
            selectTimezone: this.props.app.state.authen.timezone,
            time: '',
            date: '',
            nowTimezone: this.props.app.state.authen.timezone
        }
        this.onSelectTimezone = this.onSelectTimezone.bind(this)
        this.onCloseSettings = this.onCloseSettings.bind(this)
        this.onSetTimezone = this.onSetTimezone.bind(this)
    }

    getDateTimeZone(){
        let zone = moment.tz(this.state.nowTimezone)
        let zoneDate = zone.format('DD MMMM YYYY').toUpperCase()
        return zoneDate
    }

    getTime(){
        let zone = moment.tz(this.state.nowTimezone)
        let zoneTime = zone.format().slice(11,19)
        return zoneTime.replace(/:/g,' : ')
    }

    setDateThick(){
        let thick = setInterval(()=>{
            this.setState({
                time: this.getTime(),
                date: this.getDateTimeZone()
            })
        },1000)
        this.props.settingContainer.setTimezoneThick(thick)
    }

    onSelectTimezone(event){
        this.setState({
            selectTimezone: event.target.value,
            nowTimezone: event.target.value
        })
    }

    setListTimezones(){
        let listTimezones = []
        let timezones = new TimeZoneName()
        let obj = timezones.getTimezonesName()
        let count = 0
        obj.map((data,index)=>{
            if(index<11){
                listTimezones.push(<optgroup label={data.group} key={count}>{
                    data.zones.map((data,key)=>(
                        <option key={count+key} value={data.value}>{data.value}</option>
                    ))
                }</optgroup>)
                count++
            }
        })
        this.setState({
            timezones: listTimezones
        })
    }

    componentWillMount(){
        this.setListTimezones()
        this.setState({
            time: this.getTime(),
            date: this.getDateTimeZone()
        })
        this.setDateThick()
    }

    onSetTimezone(){
        let {session} = this.props.app.state.authen
        let timezone = this.state.selectTimezone
        if(session!=''){
            let options = {
                params:{
                    session_id: session,
                    timezone: timezone
                }
            }
            axios.get(SET_TIMEZONE_ENDPOINT,options).then(response=>{
                let {data,status} = response
                if(status==200&&data.result=='True'){
                    this.props.app.setTimeZone(this.state.selectTimezone)
                    this.props.settingContainer.showStatus('success')
                }else{
                    this.props.settingContainer.showStatus('error')
                }
            }).catch(error=>{
                console.log('SETTING TIMEZONE: '+error)
                this.props.settingContainer.showStatus('error')
            })
        }
    }

    onCloseSettings(){
        this.props.settingContainer.onClose()
    }

    render() {
        return (
            <Timezone timezonesContainer={this}/>
        )
    }
}