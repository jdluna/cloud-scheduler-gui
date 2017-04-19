import React, { Component } from 'react'
import Search from './search'
import axios from 'axios'
import moment from 'moment'
import {SEARCH_RESOURCE_ENDPOINT} from '../../config/endpoints'
import NotFoundTable from './notFoundTable'
import FoundTable from './foundTable'

export default class SearchContainer extends Component {
    constructor(props) {
        super(props)
        this.appContainer = this.props.dashBoardContainer.props.app
        this.dashboardContainer = this.props.dashBoardContainer
        this.timezone = moment.tz(this.appContainer.state.authen.timezone)
       
        let tmp = this.timezone.add(2,'hours').format().slice(11,13)+':00'
        this.timezone.subtract(2,'hours').format().slice(11,13)+':00'

        this.state = {
            cpu: '',
            mem: '',
            startDate: {
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            endDate: {
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            startTime: this.timezone.add(1,'hours').format().slice(11,13)+':00',
            endTime: this.timezone.add(1,'hours').format().slice(11,13)+':00',
            reservationLength: {
                value: 'all',
                days: '',
                hours: ''
            },
            additionalNetwork: 'None',
            imageType: 'Any',
            dataResult: null,
            resultTable: [],
            viewCardKey: null,
            startBeginDuration: 0,
            endBeginDuration: 23,
            startEndDuration: tmp,
            endEndDuration: 23,
        }


        this.onClose = this.onClose.bind(this)
        this.onResourceChange = this.onResourceChange.bind(this)
        this.onStartDateChange = this.onStartDateChange.bind(this)
        this.onEndDateChange = this.onEndDateChange.bind(this)
        this.onTimeStartChange = this.onTimeStartChange.bind(this)
        this.onTimeEndChange = this.onTimeEndChange.bind(this)
        this.onReserveLengthChange = this.onReserveLengthChange.bind(this)
        this.onImageTypeChange = this.onImageTypeChange.bind(this)
        this.onAdditionNetwordChange = this.onAdditionNetwordChange.bind(this)
        this.onReserveLengthDataChange = this.onReserveLengthDataChange.bind(this)
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
        this.onSelectItem = this.onSelectItem.bind(this)
        this.getReservationsLength = this.getReservationsLength.bind(this)
    }

    onClose() {
        this.props.dashBoardContainer.onCloseModal()
    }

    onResourceChange(event) {
        let name = event.target.name
        let value = event.target.value
        let REGEX = /^\d+$/
        if (value.match(REGEX)) {
            this.setState({
                [name]: value
            })
        } else {
            if (value.length <= 1) {
                this.setState({
                    [name]: ''
                })
            }
        }
    }

    onStartDateChange(date) {

        this.setState({
            startDate:{
                obj: date,
                date: moment(date).format('YYYY-MM-DD')
            } 
        },()=>{

            if(date.format()>=this.state.endDate.obj.format()){

                this.setState({
                    endDate: this.state.startDate
                },()=>{

                    let startTime = parseInt(this.state.startTime.replace(':00'))
                    let endTime = parseInt(this.state.endTime.replace(':00'))

                    if(endTime<=startTime){

                        let time = ((startTime+1)>=23) ? 23 : (startTime+1)
                        if((startTime+1)<=23){
                            this.setState({
                                endTime: ((time)>=10) ? (time)+':00' : '0'+(time)+':00'
                            },()=>{
                                this.setStartEndDuration(startTime)
                            })
                        }else{
                            this.setState({
                                endDate:{
                                    obj: moment(date).add(1,'days'),
                                    date: moment(date).add(1,'days').format('YYYY-MM-DD')
                                },
                                endTime: '00:00'
                            },()=>{
                                this.setStartEndDuration(startTime)
                            })
                        }

                    }else{
                        this.setStartEndDuration(startTime)   
                    }   

                })//end of this.setState for endDate
                
            }//end if 
            else{
                let startTime = parseInt(this.state.startTime.replace(':00'))
                this.setStartEndDuration(startTime) 
            }

            console.log('start date : '+this.state.startDate.date)
            console.log('end date : '+this.state.endDate.date)
        
        }) //end of this.setState for startDate

    }
        

    onEndDateChange(date) {
        if(date.format()>=this.state.startDate.obj.format()){
            this.setState({
                endDate:{
                    obj: date,
                    date: moment(date).format('YYYY-MM-DD')
                } 
            },()=>{console.log('end date : '+this.state.endDate.date)})
        }
    }

    onTimeStartChange(time){
        
        console.log('start time change:',time.target.value)

        this.setState({
            startTime: time.target.value
        },()=>{

                let startTime = parseInt(this.state.startTime.replace(':00'))
                let endTime = parseInt(this.state.endTime.replace(':00'))
                

                if( (this.state.endDate.obj.format()==this.state.startDate.obj.format()&&endTime<=startTime) || this.state.endDate.obj.format()<this.state.startDate.obj.format() ){
                    
                    let t = ((startTime+1)>=23) ? 23 : (startTime+1)
                    if((startTime+1)<=23){
                        this.setState({
                            endTime: ((t)>=10) ? (t)+':00' : '0'+(t)+':00'
                        },()=>{
                            this.setStartEndDuration(startTime)
                        })
                    }else{
                        this.setState({
                            endDate:{
                                obj: moment(this.state.startDate.obj).add(1,'days'),
                                date: moment(this.state.startDate.obj).add(1,'days').format('YYYY-MM-DD')
                            },
                            endTime: '00:00'
                        },()=>{
                            this.setStartEndDuration(startTime)
                        })
                    }
                
                }else{
                    this.setStartEndDuration(startTime)
                }

                

                // console.log('start date : '+this.state.endDate.date)
                // console.log('end date : '+this.state.endDate.date)
                // console.log('start time : '+this.state.startTime)
                // console.log('end time : '+this.state.endTime)

        })  
    
    }

    onTimeEndChange(time){
        
        let endTime = parseInt(time.target.value.replace(':00'))

        this.setState({
            endTime: ((endTime)>=10) ? (endTime)+':00' : '0'+(endTime)+':00'
        })
    }

    setStartEndDuration(startTime){
        if(this.state.endDate.obj.format()==this.state.startDate.obj.format()){
            //begin and end are on same day
            if((startTime+1)<=23){
                this.setState({
                    startEndDuration : startTime+1
                })
            }else{
                this.setState({
                    startEndDuration : 0
                })
            }
        }else{
            //end day after begin
            this.setState({
                startEndDuration : 0
            })
        }
    }
        

    onReserveLengthChange(event){
        this.setState({
            reservationLength: {
                value: event.target.value,
                days: '',
                hours: ''
            }
        })
    }

    onReserveLengthDataChange(event){
        let name = event.target.name
        let value = event.target.value
        let REGEX = /^\d+$/
        if (value.match(REGEX)) {
            this.setState({
                reservationLength: {
                    value: this.state.reservationLength.value,
                    days: (name=='days') ? value : this.state.reservationLength.days,
                    hours: (name=='days') ? this.state.reservationLength.hours : value
                }
            })
        } else {
            if (value.length <= 1) {
                this.setState({
                    reservationLength: {
                        value: this.state.reservationLength.value,
                        days: (name=='days') ? '' : this.state.reservationLength.days,
                        hours: (name=='days') ? this.state.reservationLength.hours : ''
                    }
                })
            }
        }
    }

    onAdditionNetwordChange(event){
        this.setState({
            additionalNetwork: event.target.value
        })
    }

    onImageTypeChange(event){
        this.setState({
            imageType: event.target.value
        })
    }

    onSelectItem(name,key){
        this.setState({
            viewCardKey: key
        })
        let markerNode = this.dashboardContainer.state.markerNode
        for(let i=0;i<markerNode.length;i++){
            if(markerNode[i].name.toLowerCase()==name.toLowerCase()){
                let id = markerNode[i].id
                let icon = (markerNode[i].icon.url) ? markerNode[i].icon.url : markerNode[i].icon
                this.props.dashBoardContainer.onSelectMarker(id,{node:markerNode[i],icon:icon})
                if(icon=='img/marker.png'){
                    markerNode[i].setIcon('img/marker_select.png')
                }else if(icon=='img/marker_ent.png'){
                    markerNode[i].setIcon('img/marker_ent_select.png')
                }
                break
            }
        }
    }

    queryResource(params){
        axios.get(SEARCH_RESOURCE_ENDPOINT,params).then(response=>{
            let {data,status} = response
            if(status==200&&data.result_type){
                if(data.result_type=='result'){
                    this.setState({
                        dataResult: data,
                        resultTable: <FoundTable data={data} searchContainer={this}/>
                    })
                }else{
                    this.setState({
                        dataResult: data,
                        resultTable: <NotFoundTable data={data} searchContainer={this}/>
                    })
                }
            }
        }).catch(error=>{
            console.log('QUERY SEARCH RESOURCE ERROR: '+error)
        })
    }

    onSearchSubmit(event){
        event.preventDefault()
        let {startDate,endDate,startTime,endTime} = this.state
        let startDateLength = startDate.date+' '+startTime
        let endDateLength = endDate.date+' '+endTime
        let time = this.getReservationsLength(startDateLength,endDateLength).split(' ')

        let params = {
            params:{
                cpu_amt: (this.state.cpu=='') ? 0 : this.state.cpu,
                memory_amt: (this.state.mem=='') ? 0 : this.state.mem,
                connection_type: this.state.additionalNetwork,
                image_type: this.state.imageType,
                begin: this.state.startDate.date+' '+this.state.startTime+':00',
                end: this.state.endDate.date+' '+this.state.endTime+':00',
                all_period: (this.state.reservationLength.value=='all') ? 'True' : 'False',
                days: (this.state.reservationLength.value=='all') ? 0 : ((this.state.reservationLength.days=='') ? 0 : this.state.reservationLength.days),
                hours: (this.state.reservationLength.value=='all') ? 0 : ((this.state.reservationLength.hours=='') ? 0 : this.state.reservationLength.hours)
            }
        }
        this.queryResource(params)
    }

    getReservationsLength(startDate,endDate){
        let start = moment(startDate,'YYYY-MM-DD HH:mm')
        let end = moment(endDate,'YYYY-MM-DD HH:mm')

        let day = end.diff(start,'days')
        let hour = end.diff(start,'hours')
        let year = end.diff(start,'years')
        let minute = end.diff(start,'minutes')
        let second = end.diff(start,'seconds')

        let leftDate = ''
        if(year>=1){
            leftDate = year+' years '+parseInt((day%12))+' days'
        }else{
            if(day>=1){
                leftDate = day+' days '+parseInt((hour%24))+' hours'
            }else{
                if(hour>=1){
                    leftDate = hour+' hours '+parseInt((minute%60))+' minutes'
                }else{
                    if(minute>=1){
                        leftDate = minute+' minutes'
                    }else{
                        if(second>=1){
                            leftDate = second+' seconds'
                        }else{
                            leftDate = '-'
                        }
                    }
                }
            }
        }
        return leftDate
    }

    render() {
        return (
            <section>
                <Search searchContainer={this} />
            </section>
        )
    }
}