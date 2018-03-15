import React, { Component } from 'react'
import Search from './search'
import axios from 'axios'
import moment from 'moment'
import {SEARCH_RESOURCE_ENDPOINT} from '../../config/endpoints'
import NotFoundTable from './notFoundTable'
import NotFoundTable2 from './notFoundTable2'
import FoundTable from './foundTable'
import FoundTable2 from './foundTable2'
import Loading from './loading.js'
import { RESOURCES } from '../../config/attributes'

export default class SearchContainer extends Component {
    constructor(props) {
        super(props)
        this.appContainer = this.props.dashBoardContainer.props.app
        this.dashboardContainer = this.props.dashBoardContainer
        this.timezone = moment.tz(this.appContainer.state.authen.timezone)
       
        this.tmp = this.timezone.format().slice(11,13)+':00'
        this.tmp2 = this.timezone.add(1,'hours').format().slice(11,13)+':00'
        this.timezone.subtract(1,'hours').format().slice(11,13)+':00'

        let resource = []
        RESOURCES.map((data,key)=>{
            resource.push('')
        })
        this.state = {
            resource: resource,
            mode:'SINGLE',
            startDate: {
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            endDate: {
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            region:'Any',
            numSite:'Any',
            startTime: this.tmp,
            endTime: this.tmp2,
            reservationLength: {
                value: 'all',
                days: '',
                hours: ''
            },
            additionalNetwork: 'None',
            imageType: this.dashboardContainer.state.images[0].name,
            dataResult: null,
            resultTable: [],
            viewCardKey: null,
            startBeginDuration: this.tmp,
            endBeginDuration: 23,
            startEndDuration: this.tmp2,
            endEndDuration: 23,
            minDate: {
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            reservationLengthNode:{
                daysInput: null,
                hoursInput: null,
                daysLabel: null,
                hoursLabel: null
            },
            helpComponent: null,
            helpIcon: null,
            timezone: moment.tz(this.appContainer.state.authen.timezone),
            maxLengthDate: 0,
            maxLengthHour: 1
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
        this.onRegionChange = this.onRegionChange.bind(this)
        this.onSiteNumChange = this.onSiteNumChange.bind(this)
        this.getReservationsLength = this.getReservationsLength.bind(this)
        this.getDescSortByName = this.getDescSortByName.bind(this)
        this.getAscSortByName = this.getAscSortByName.bind(this)
        this.getAscSort = this.getAscSort.bind(this)
        this.getDescSort = this.getDescSort.bind(this)
        this.getAscSortByDate = this.getAscSortByDate.bind(this)
        this.getDescByDate = this.getDescSortByDate.bind(this)
        this.helpSearch = this.helpSearch.bind(this)
        this.helpIconOver = this.helpIconOver.bind(this)
        this.helpIconOut = this.helpIconOut.bind(this)
        this.onHelpClose = this.onHelpClose.bind(this)
        this.setDateForCard = this.setDateForCard.bind(this)
        this.changeMode = this.changeMode.bind(this)
    }

    onClose() {
        this.props.dashBoardContainer.setState({
            dateForCard: null             
        })
        this.props.dashBoardContainer.onCloseModal()
    }

    onResourceChange(event) {
        let index = parseInt(event.target.name)
        let value = event.target.value
        let REGEX = /^\d+$/
        if (value.match(REGEX)) {
            let data = this.state.resource
            data[index] = value
            this.setState({
                resource: data
            })
        } else {
            if (value.length <= 1) {
                let data = this.state.resource
                data[index] = ''
                this.setState({
                    resource: data
                })
            }
        }
    }

    // onResourceChange(event) {
    //     let name = event.target.name
    //     let value = event.target.value
    //     let REGEX = /^\d+$/
    //     if (value.match(REGEX)) {
    //         this.setState({
    //             [name]: value
    //         })
    //     } else {
    //         if (value.length <= 1) {
    //             this.setState({
    //                 [name]: ''
    //             })
    //         }
    //     }
    // }

    setMaxLength(){
        let {startDate, endDate, startTime, endTime} = this.state
        let diffDate = moment(endDate.date+' '+endTime).diff(moment(startDate.date+' '+startTime),'days')
        let diffTime = moment(endDate.date+' '+endTime).diff(moment(startDate.date+' '+startTime),'hours')-(24*diffDate)
        this.setState({
            maxLengthDate: diffDate,
            maxLengthHour: diffTime
        })
    }

    changeMode(e){
        this.setState({
            mode:e.target.id
        })
    }

    onRegionChange(region){
        this.setState({
            region:region.target.value
        })
    }

    onSiteNumChange(num){
        this.setState({
            numSite:num.target.value
        })
    }

    onStartDateChange(date) {

        this.setState({
            startDate:{
                obj: date,
                date: moment(date).format('YYYY-MM-DD')
            } 
        },()=>{

            let startTime = parseInt(this.state.startTime.replace(':00'))
            let endTime = parseInt(this.state.endTime.replace(':00'))

            if(date.format()>=this.state.endDate.obj.format()){

                this.setState({
                    endDate: this.state.startDate
                },()=>{

                    if(endTime<=startTime){

                        let time = ((startTime+1)>=23) ? 23 : (startTime+1)
                        if((startTime+1)<=23){
                            this.setState({
                                endTime: ((time)>=10) ? (time)+':00' : '0'+(time)+':00'
                            },()=>{
                                this.setStartEndDuration()
                                this.setStartBeginDuration()
                                this.setState({
                                    minDate: this.state.endDate
                                })
                            })
                        }else{
                            this.setState({
                                endDate:{
                                    obj: moment(date).add(1,'days'),
                                    date: moment(date).add(1,'days').format('YYYY-MM-DD')
                                },
                                endTime: '00:00'
                            },()=>{
                                this.setStartEndDuration()
                                this.setStartBeginDuration()
                                this.setState({
                                    minDate: this.state.endDate
                                })
                            })
                            
                        }

                    }else{
                        this.setStartEndDuration() 
                        this.setStartBeginDuration()  
                        this.setState({
                            minDate: this.state.endDate
                        })
                    }   

                })//end of this.setState for endDate
                
            }//end if 
            else{
                this.setStartEndDuration()
                this.setStartBeginDuration()

                if((startTime+1)<=23){
                    this.setState({
                        minDate: this.state.startDate
                    })
                }else{
                    this.setState({
                        minDate: {
                            obj : moment(this.state.startDate.obj).add(1,'days'),
                            date: moment(this.state.startDate.obj).add(1,'days').format('YYYY-MM-DD')
                        }
                    })
                }
            }
        
        }) //end of this.setState for startDate

    }
        

    onEndDateChange(date) {
        this.setState({
            endDate:{
                obj: date,
                date: moment(date).format('YYYY-MM-DD')
            } 
        },()=>{
            this.setStartEndDuration() 
        })
        
    }

    onTimeStartChange(time){

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
                            this.setStartEndDuration()
                            this.setState({
                                minDate: this.state.endDate
                            })
                        })
                    }else{
                        this.setState({
                            endDate:{
                                obj: moment(this.state.startDate.obj).add(1,'days'),
                                date: moment(this.state.startDate.obj).add(1,'days').format('YYYY-MM-DD')
                            },
                            endTime: '00:00',
                            minDate: this.state.endDate
                        },()=>{
                            this.setStartEndDuration()
                            this.setState({
                                minDate: this.state.endDate
                            })
                        })
                    }
                
                }else{
                    this.setStartEndDuration()

                    if((startTime+1)<=23){
                        this.setState({
                            minDate: this.state.startDate
                        })
                    }else{
                        this.setState({
                            minDate: {
                                obj : moment(this.state.startDate.obj).add(1,'days'),
                                date: moment(this.state.startDate.obj).add(1,'days').format('YYYY-MM-DD')
                            }
                        })
                    }
                    
                }

        })  
    
    }

    onTimeEndChange(time){
        
        let endTime = parseInt(time.target.value.replace(':00'))

        this.setState({
            endTime: ((endTime)>=10) ? (endTime)+':00' : '0'+(endTime)+':00'
        },()=>{this.setMaxLength()})
    }

    setStartBeginDuration(){
        if(this.state.startDate.date==this.timezone.format('YYYY-MM-DD')){
            //start date = today
            this.setState({
                startBeginDuration : this.tmp
            },()=>{this.setMaxLength()})
        }else{
            // not today
            this.setState({
                startBeginDuration : 0
            },()=>{this.setMaxLength()})
        }
    }

    setStartEndDuration(){
        let startTime = parseInt(this.state.startTime.replace(':00'))
        
        if(this.state.endDate.obj.format()==this.state.startDate.obj.format()){
            //begin and end are on same day
            if((startTime+1)<=23){
                this.setState({
                    startEndDuration : startTime+1
                },()=>{
                    let endTime = parseInt(this.state.endTime.replace(':00'))
                    let e = parseInt(this.state.startEndDuration) >= endTime ? this.state.startEndDuration : this.state.endTime
                    e = e>=10 ? e+':00' : '0'+e+':00' 
                    this.setState({
                        endTime: e
                    },()=>{
                        this.setMaxLength()
                    })
                    
                })
            }else{
                this.setState({
                    startEndDuration : 0
                },()=>{this.setMaxLength()})
            }
        }else{
            //end day after begin
            this.setState({
                startEndDuration : 0
            },()=>{this.setMaxLength()})
        }
    }
        

    onReserveLengthChange(type){
        let {daysInput, hoursInput, daysLabel, hoursLabel} = this.state.reservationLengthNode
        if(type=='all'){
            this.setState({
                reservationLength: {
                    value: type,
                    days: '',
                    hours: ''
                }
            })
            daysInput.style.opacity = '0.5'
            hoursInput.style.opacity = '0.5'
            daysLabel.style.opacity = '0.5'
            hoursLabel.style.opacity = '0.5'
            
            daysInput.style.border = '0px';
            hoursInput.style.border = '0px';
        }else{
            this.setState({
                reservationLength: {
                    value: 'time',
                    days: this.state.reservationLength.days,
                    hours: this.state.reservationLength.hours
                }
                },()=>{
                    daysInput.style.opacity = '1'
                    hoursInput.style.opacity = '1'
                    daysLabel.style.opacity = '1'
                    hoursLabel.style.opacity = '1'
            })
        }
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

    onSelectItem(name,key,type){
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
        console.log(params)
        this.setState({
            resultTable: <Loading/>
        })
        // console.log(data)
        // this.getAscSortByName(data)
                    // this.setState({
                    //     dataResult: data,
                    //     resultTable: []
                    // },()=>{
                    //     this.setState({
                    //         resultTable: <FoundTable searchContainer={this}/>
                    //     })
                    // })
        // axios.get(SEARCH_RESOURCE_ENDPOINT,params).then(response=>{
        //     console.log(response.data)
        // }).catch(error=>{
        //     console.log('QUERY SEARCH RESOURCE ERROR: '+error)
        // })
        // let data;
        // if(this.state.mode=='SINGLE'){
        //     data = {
        //         results:[
        //             {
        //                 sites:[
        //                     {name:'BU',
        //                     region:'Thailand'
        //                     }
        //                 ],
        //                 begin:'01-MAR-2018 13:00',
        //                 end:'01-MAR-2018 16:00',
        //                 totalCPU:[100],
        //                 totalMem:[100],
        //                 speedCPU:1.1,
        //                 speedNet:1.0,
        //                 netType:'IPOP',
        //                 avaiCPU:'100/100',
        //                 avaiMem:'200/200'
        //             },{
        //                 sites:[
        //                     {name:'KU',
        //                     region:'Thailand'
        //                     }
        //                 ],
        //                 begin:'01-MAR-2018 13:00',
        //                 end:'01-MAR-2018 16:00',
        //                 totalCPU:[100],
        //                 totalMem:[100],
        //                 speedCPU:1.1,
        //                 speedNet:1.0,
        //                 netType:'IPOP',
        //                 avaiCPU:'100/100',
        //                 avaiMem:'200/200'
        //             }
        //         ]
        //     }
        // }else{
        //     data ={
        //         results:[
        //             {
        //                 sites:[
        //                     {name:'BU',
        //                     region:'Thailand'
        //                     },{name:'KU',
        //                     region:'Thailand'
        //                     }
        //                 ],
        //                 begin:'01-MAR-2018 13:00',
        //                 end:'01-MAR-2018 16:00',
        //                 totalCPU:[100,200],
        //                 totalMem:[100,200],
        //                 speedCPU:1.1,
        //                 speedNet:1.0,
        //                 netType:'IPOP',
        //                 avaiCPU:'100/100',
        //                 avaiMem:'200/200'
        //             },{
        //                 sites:[
        //                     {name:'MU',
        //                     region:'Thailand'
        //                     },{name:'KU',
        //                     region:'Thailand'
        //                     }
        //                 ],
        //                 begin:'01-MAR-2018 13:00',
        //                 end:'01-MAR-2018 16:00',
        //                 totalCPU:[100,200],
        //                 totalMem:[100,200],
        //                 speedCPU:1.1,
        //                 speedNet:1.0,
        //                 netType:'IPOP',
        //                 avaiCPU:'100/100',
        //                 avaiMem:'200/200'
        //             }
        //         ]
        //     }
        // }
        
        // this.setState({
        //      dataResult: data
        // },
        // this.setState({
        //     resultTable: <FoundTable2 searchContainer={this} />
        // }))
        
        axios.get(SEARCH_RESOURCE_ENDPOINT,params).then(response=>{
            let {data,status} = response
            if(status==200&&data.result_type){
                if(data.result_type=='result'){
                    this.getAscSortByName(data)
                    this.setState({
                        dataResult: data,
                        resultTable: []
                    },()=>{
                        this.setState({
                            resultTable: <FoundTable2 searchContainer={this} appContainer={this.appContainer}/>
                            // resultTable:             <FoundTable searchContainer={this}/>
                    })
                })
                }else{
                    console.log('sss')
                    this.getAscSortByName(data)
                    this.setState({
                        dataResult: data,
                        resultTable: []
                    },()=>{
                        this.setState({
                            resultTable: <NotFoundTable2 searchContainer={this} />
                            // resultTable:             <FoundTable searchContainer={this}/>
                        })
                    })
                    // if(data.amount>0){
                    //     this.getAscSortByName(data)
                    // }
                    // this.setState({
                    //     dataResult: data,
                    //     resultTable: []
                    // },()=>{
                    //     this.setState({
                    //         resultTable: <NotFoundTable data={data} searchContainer={this}/>
                    //     })
                    // })
                }
            }
        }).catch(error=>{
            console.log('QUERY SEARCH RESOURCE ERROR: '+error)
        })
    }

    getAscSortByDate(data, parameter){
        data.sites.sort((a,b)=>{
            return moment().diff(eval('a.'+parameter),'minutes')-moment().diff(eval('b.'+parameter),'minutes')
        })
    }

    getDescSortByDate(data, parameter){
        data.sites.sort((a,b)=>{
            return moment().diff(eval('b.'+parameter),'minutes')-moment().diff(eval('a.'+parameter),'minutes')
        })
    }

    getAscSort(data, parameter){
        data.sites.sort((a,b)=>{
            try{
                return eval('a.'+parameter)-eval('b.'+parameter)
            }catch(error){
                
            }
        })
    }

    getDescSort(data, parameter){
        data.sites.sort((a,b)=>{
            try{
                return eval('b.'+parameter)-eval('a.'+parameter)
            }catch(error){
                
            }
        })
    }
    
    getDescSortByName(data){
        data.sites.sort((a,b)=>{
            return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0)
        })
    }

    getAscSortByName(data){
        data.sites.sort((a,b)=>{
            return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
        })
    }

    setDateForCard(date){
        this.dashboardContainer.setState({
            dateForCard: date
        })
    }

    alertShow(text){
        this.state.alertNode.innerHTML = text
        this.state.alertBox.style.display = 'block'
        this.state.contentBox.style.height = 'calc(100% - 53px)'
    }

    alertClear(){
        this.state.alertBox.style.display = 'none'
        this.state.contentBox.style.height = 'calc(100% - 29px)'
    }

    onSearchSubmit(event){

        event.preventDefault()
        this.alertClear()
        let {startDate,endDate,startTime,endTime,maxLengthDate,maxLengthHour,reservationLength} = this.state
        if(this.state.resource[0]==''||this.state.resource[1]==''){
            this.alertShow('Please input some CPU and memory.')
            return;
        }
        if(reservationLength.days>maxLengthDate || (reservationLength.days==maxLengthDate&&reservationLength.hours>maxLengthHour))
        {
            let {daysInput, hoursInput} = this.state.reservationLengthNode
            daysInput.style.border = '1.5px solid #ef303e';
            hoursInput.style.border = '1.5px solid #ef303e';

            this.setState({
                resultTable: []
            })
        }else{

            let {daysInput, hoursInput} = this.state.reservationLengthNode
            daysInput.style.border = '0px';
            hoursInput.style.border = '0px';

            this.dashboardContainer.setState({
                dateForCard: this.state.startDate.date+' '+this.state.startTime
            })
            let startDateLength = startDate.date+' '+startTime
            let endDateLength = endDate.date+' '+endTime
            let time = this.getReservationsLength(startDateLength,endDateLength).split(' ')

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
            
            let startDateUTC = moment(startDateLength+" "+timezoneOffset, "YYYY-MM-DD HH:mm Z").tz("UTC").format('YYYY-MM-DD HH:mm:00');
            let endDateUTC = moment(endDateLength+" "+timezoneOffset, "YYYY-MM-DD HH:mm Z").tz("UTC").format('YYYY-MM-DD HH:mm:00');

            let resource = []
            this.state.resource.map((data,key)=>{
                if(data==''){
                    resource.push(0)
                }else{
                    resource.push(data)
                }
            })

            let diffDate = moment(endDate.date+' '+endTime).diff(moment(startDate.date+' '+startTime),'days')
            let diffTime = moment(endDate.date+' '+endTime).diff(moment(startDate.date+' '+startTime),'hours')-(24*diffDate)

            let params = {
                params:{
                    type:this.state.mode,
                    numOfSite:this.state.numSite,
                    resources: resource.toString(),
                    connection_type: this.state.additionalNetwork,
                    image_type: this.state.imageType,
                    begin: startDateUTC,
                    end: endDateUTC,
                    all_period: (this.state.reservationLength.value=='all') ? 'True' : 'False',
                    days: (this.state.reservationLength.value=='all') ? diffDate : ((this.state.reservationLength.days=='') ? 0 : this.state.reservationLength.days),
                    hours: (this.state.reservationLength.value=='all') ? diffTime : ((this.state.reservationLength.hours=='') ? 0 : this.state.reservationLength.hours),
                    region:this.state.region
                }
            }
            this.queryResource(params)
        }

       
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
        // leftDate = '? days ? hours'
        return leftDate
    }

    helpSearch(){
        let helpComponent = this.state.helpComponent
        if(helpComponent.style.display==='block'){
            helpComponent.style.display = 'none'
        }else{
            helpComponent.style.display = 'block'
        }  
    }

    helpIconOver(){
        let helpIcon = this.state.helpIcon
        helpIcon.src = 'img/ic_help_white.svg'
    }

    helpIconOut(){
        let helpIcon = this.state.helpIcon
        helpIcon.src = 'img/ic_help_outline_white.svg'
    }

    onHelpClose(){
        let helpComponent = this.state.helpComponent
        helpComponent.style.display = 'none' 
    }

    render() {
        return (
            <section>
                <Search searchContainer={this} dashboardContainer={this.dashboardContainer}/>
            </section>
        )
    }
}