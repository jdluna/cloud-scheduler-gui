import React,{Component} from 'react'
import Timezone from './timezone'
import TimeZoneName from '../../lib/timezones/timezones'

export default class TimezoneContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            timezones: [],
            selectTimezone: ''
        }
        this.onSelectTimezone = this.onSelectTimezone.bind(this)
        this.onCloseSettings = this.onCloseSettings.bind(this)
    }

    onSelectTimezone(event){
        let group = event.target.value.split('/')
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
    }

    onCloseSettings(){
        this.props.dashBoardContainer.onCloseModal()
    }

    render() {
        return (
            <Timezone timezonesContainer={this}/>
        )
    }
}