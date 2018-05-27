import React, { Component } from 'react'
import Reservation from './reservation'
import axios from 'axios'
import moment from 'moment'
import {CHECK_RESERVATION_ENDPOINT,CONFIRM_RESERVATION_ENDPOINT,TEST} from '../../config/endpoints'
import SuccessDialog from './successDialog'
import ErrorDialog from './ErrorDialog'
import { RESOURCES } from '../../config/attributes'

export default class ReservationContainer extends Component {
    constructor(props){
        super(props)
        this.appContainer = this.props.dashBoardContainer.props.app
        this.dashboardContainer = this.props.dashBoardContainer
        this.timezone = moment.tz(this.appContainer.state.authen.timezone)
        this.sites = this.props.sites
      
        this.tmp = this.timezone.format().slice(11,13)+':00'
        this.tmp2 = this.timezone.add(1,'hours').format().slice(11,13)+':00'
        this.timezone.subtract(1,'hours').format().slice(11,13)+':00'

        let resource = []
        let siteInputDom = []
        this.sites.map((data,key)=>{
            let attr = []
            RESOURCES.map((dataSub,keySub)=>{
                attr.push('')
            })
            resource.push(attr)
        })
        this.state = {
            // STEP1
            resource: resource,
            startDate: {
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            endDate: {
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            startTime: this.tmp,
            endTime: this.tmp2,
            reservationLength: '',
            day: 0,
            hour: 1,
            month: 0,
            imageType: 'Any',
            startBeginDuration: this.tmp,
            endBeginDuration: 23,
            startEndDuration: this.tmp2,
            endEndDuration: 23,
            minDate: {
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            dashboardContainer: this.props.dashBoardContainer,

            // STEP2
            title: '',
            description: '',

            // OTHER
            card: 'step1',
            dialog: (this.dashboardContainer.state.isSameConnectionType) ? 'error-type' : 'main',
            alertNode: {},
            siteInputDom: siteInputDom,
            sites: this.props.sites
        }

        //for set value from search
        if(this.dashboardContainer.state.selectCard[0].CPU != undefined){
            for(let i=0;i<this.dashboardContainer.state.selectCard.length;i++){
                this.state.resource[i][0] = this.dashboardContainer.state.selectCard[i].CPU
                this.state.resource[i][1] = this.dashboardContainer.state.selectCard[i].Memory
            }
        }
        if(this.dashboardContainer.state.selectCard[0].image != undefined) 
            this.state.imageType = this.dashboardContainer.state.selectCard[0].image
        if(this.dashboardContainer.state.selectCard[0].endDate != undefined) 
            this.state.endDate = this.dashboardContainer.state.selectCard[0].endDate
        if(this.dashboardContainer.state.selectCard[0].startDate != undefined) 
            this.state.startDate = this.dashboardContainer.state.selectCard[0].startDate
        if(this.dashboardContainer.state.selectCard[0].startTime != undefined)
            this.state.startTime = this.dashboardContainer.state.selectCard[0].startTime
        if(this.dashboardContainer.state.selectCard[0].endTime != undefined)
            this.state.endTime = this.dashboardContainer.state.selectCard[0].endTime

        this.onStartDateChange = this.onStartDateChange.bind(this)
        this.onEndDateChange = this.onEndDateChange.bind(this)
        this.onTimeStartChange = this.onTimeStartChange.bind(this)
        this.onTimeEndChange = this.onTimeEndChange.bind(this)
        this.onImageTypeChange = this.onImageTypeChange.bind(this)
        this.onPreviousStep = this.onPreviousStep.bind(this)
        this.onNextStep = this.onNextStep.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onEnterInputStep2 = this.onEnterInputStep2.bind(this)
        this.onEnterResource = this.onEnterResource.bind(this)
        this.queryCheckReservation = this.queryCheckReservation.bind(this)
        this.checkStartTime()
    }

    onClose(){
        this.dashboardContainer.setState({
            isSameConnectionType: false
        })
        this.dashboardContainer.onCloseModal()
    }

    checkStartTime(){
        let t = this.timezone
        if(this.state.startTime=='23:00'){
            this.setState({
                endDate: {
                    obj: t.add(1,'day'),
                    date: t.add(1,'day').format('YYYY-MM-DD')
                }
            },()=>{t.subtract(2,'day')})
        }
    }

    setReservationLength(){
        let startDate = this.state.startDate.date
        let endDate = this.state.endDate.date
        let {startTime,endTime} = this.state
        let start = moment(startDate+' '+startTime,'YYYY-MM-DD HH:mm')
        let end = moment(endDate+' '+endTime,'YYYY-MM-DD HH:mm')

        let month = end.diff(start,'months')
        let day = end.diff(start,'days')
        let hour = end.diff(start,'hours')
        let length = ''
        if(day>=1){
            length = day+' Days, '+(hour-(24*day))+' Hours'
        }else{
            length = day+' Days, '+hour+' Hours'
        }
        this.setState({
            reservationLength: length,
            day: day,
            hour: hour,
            month: month
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
                                this.setReservationLength()
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
                                this.setReservationLength()
                                this.setState({
                                    minDate: this.state.endDate
                                })
                            })
                            
                        }

                    }else{
                        this.setStartEndDuration() 
                        this.setStartBeginDuration()  
                        this.setReservationLength()
                        this.setState({
                            minDate: this.state.endDate
                        })
                    }   

                })//end of this.setState for endDate
                
            }//end if 
            else{
                this.setStartEndDuration()
                this.setStartBeginDuration()
                this.setReservationLength()

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
        if(date.format()>=this.state.startDate.obj.format()){
            this.setState({
                endDate:{
                    obj: date,
                    date: moment(date).format('YYYY-MM-DD')
                } 
            },()=>{
                this.setStartEndDuration() 
                this.setReservationLength()
            })
        }
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
                            this.setReservationLength()
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
                            this.setReservationLength()
                            this.setState({
                                minDate: this.state.endDate
                            })
                        })
                    }
                
                }else{
                    this.setStartEndDuration()
                    this.setReservationLength()

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
        },()=>{
            this.setReservationLength()
        })
    }

    setStartBeginDuration(){

        if(this.state.startDate.date==this.timezone.format('YYYY-MM-DD')){
            //start date = today
            this.setState({
                startBeginDuration : this.tmp
            })
        }else{
            // not today
            this.setState({
                startBeginDuration : 0
            })
        }
    }

    setStartEndDuration(){
        let startTime = parseInt(this.state.startTime.replace(':00'))
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


    onImageTypeChange(event){
        this.setState({
            imageType: event.target.value
        })
    }

    onPreviousStep(event){
        switch(event.target.name){
            case 'step1' : this.onClose();break
            case 'step3' : this.setState({card: 'step1'});break
        }
    }

    onNextStep(event){
        let step = event.target.name

        let {startDate,endDate,startTime,endTime} = this.state
        let startDateObj = moment(startDate.date+' '+startTime).add(1,'months')
        let endDateLengthObj = moment(endDate.date+' '+endTime)
        let diff = endDateLengthObj.diff(startDateObj,'hours')
        
        if(diff<=0){
            if(step=='step1'){
                this.state.alertNode.innerHTML = ''
                this.state.alertNode.style.display = 'none'

                
                if(this.state.imageType == 'Any'){
                    let images = this.dashboardContainer.state.images
                    this.setState({
                        imageType: images[0].name
                    },()=>{
                        this.checkReservation();
                    })
                }else{
                    this.checkReservation();
                }   
            }else if(step=='step3'){
                this.queryConfirmReservation();
            }
            
        }else{
            this.state.alertNode.innerHTML = 'Cannot reserve any resources more than 1 month. Please try again.'
            this.state.alertNode.style.display = 'block'
        }
    }

    checkStep1Input(){
        let empty = false
        this.state.resource.map((data,key)=>{
            data.map((dataSub,keySub)=>{
                if(dataSub==''){
                    if(empty==false){
                        this.state.siteInputDom[key][keySub].focus()
                    }
                    empty = true
                    this.state.siteInputDom[key][keySub].style.border = '1px solid red'
                }else{
                    this.state.siteInputDom[key][keySub].style.border = '1px solid #464a5f'
                }
            })
        })
        return empty
    }

    onEnterResource(event){
        let name = event.target.name
        let value = event.target.value
        let REGEX = /^\d+$/
        if (value.match(REGEX)) {
            let {resource} = this.state
            let index = name.split('-')
            resource[parseInt(index[0])][parseInt(index[1])] = value
            this.setState({
                resource: resource
            })
        } else {
            if (value.length <= 1) {
                let {resource} = this.state
                let index = name.split('-')
                resource[parseInt(index[0])][parseInt(index[1])] = ''
                this.setState({
                    resource: resource
                })
            }
        }
    }

    onEnterInputStep2(event){
        let name = event.target.name
        this.setState({
            [name]: event.target.value
        })
    }

    checkReservation(){
        if(this.checkStep1Input()==false){
            this.queryCheckReservation()
        }
    }

    queryConfirmReservation(){
        let sitesId = ''
        let resources = ''

        this.sites.map((data,key)=>{
            if(key==0){
                sitesId += data.id
            }else{
                sitesId += ','+data.id
            }
        })

        this.state.resource.map((data,key)=>{
            if(key!=0){
                resources+="|"
            }
            data.map((d,k)=>{
                if(k==0){
                    resources+=d
                }else{
                    resources+=','+d
                }
            })
        })

        let {startDate,endDate,startTime,endTime} = this.state
        let startDateLength = startDate.date+' '+startTime
        let endDateLength = endDate.date+' '+endTime

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

        let params = {
            params:{
                session_id: this.appContainer.state.authen.session,
                begin: startDateUTC,
                end: endDateUTC,
                sites_id: sitesId,
                resources: resources,
                img_type: this.state.imageType,
                title: (this.state.title!='') ? this.state.title : '-',
                description: (this.state.description!='') ? this.state.description : '-',
                type: (this.dashboardContainer.state.reserveMode=='single') ? 'single cluster on single site' : 'single cluster spanning multiple sites'
            }
        }
        axios.get(CONFIRM_RESERVATION_ENDPOINT,params).then(response=>{
            let {data,status} = response
            console.log(data)
            if(status==200&&data.result){
                if(data.result=='success'){
                    this.changeDialog('success')
                    this.dashboardContainer.clearRightBar()
                }else{
                    this.changeDialog('error')
                }
            }
        }).catch(error=>{
            console.log('QUERY CONFIRM RESERVATION ERROR: '+error)
        })
    }

    queryCheckReservation(){
        let sitesId = ''
        let resources = ''

        this.sites.map((data,key)=>{
            if(key==0){
                sitesId += data.id
            }else{
                sitesId += ','+data.id
            }
        })

        this.state.resource.map((data,key)=>{
            if(key!=0){
                resources+="|"
            }
            data.map((d,k)=>{
                if(k==0){
                    resources+=d
                }else{
                    resources+=','+d
                }
            })
        })


        let {startDate,endDate,startTime,endTime} = this.state
        let startDateLength = startDate.date+' '+startTime
        let endDateLength = endDate.date+' '+endTime

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

        let params = {
            params:{
                session_id: this.appContainer.state.authen.session,
                begin: startDateUTC,
                end: endDateUTC,
                sites_id: sitesId,
                resources: resources,
                img_type: this.state.imageType,
                type:this.dashboardContainer.state.reserveMode
            }
        }

        if(this.dashboardContainer.state.case==4){
            this.dashboardContainer.setState({
                out3:params.params.sites_id
            })
        }
        if(this.dashboardContainer.state.case==5){
            this.dashboardContainer.setState({
                out5:params.params.sites_id
            })
        }        

        axios.get(CHECK_RESERVATION_ENDPOINT,params).then(response=>{
            let {data,status} = response
            if(status==200&&data.result){
                if(data.result=='True'){
                    this.state.alertNode.innerHTML = ''
                    this.state.alertNode.style.display = 'none'
                    this.setState({card: 'step3'})
                }else if(data.isResourceError=='True'){
                    this.state.alertNode.innerHTML = 'The resources are not available enough. Please try again.'
                    this.state.alertNode.style.display = 'block'
                    if(data.site_error){
                        data.site_error.map((rs,key)=>{
                            let id = parseInt(rs.site_id)
                            this.sites.map((d,k)=>{
                                if(id==parseInt(d.id)){
                                    this.state.siteInputDom[k][parseInt(rs.resource_index)].style.border = '1px solid red'
                                }
                            })
                        })
                    }
                }else if(data.isImageTypeError == 'True'){
                    this.state.alertNode.innerHTML = 'This image type is not available on these sites. Please try again.'
                    this.state.alertNode.style.display = 'block'
                }else{
                    this.state.alertNode.innerHTML = 'Network connection failed. Please try again later.'
                    this.state.alertNode.style.display = 'block'
                }
            }
        }).catch(error=>{
            console.log('QUERY CHECK RESERVATION ERROR: '+error)
        })
    }

    changeDialog(name){
        this.setState({
            dialog: name
        })
    }

    componentWillMount(){
        this.setReservationLength()
    }

    onCloseDialog(){
        this.onClose()
    }

    render() {
        let dialog
        switch(this.state.dialog){
            case 'main' : dialog = <Reservation reservationContainer={this}/>;break;
            case 'success' : dialog = <SuccessDialog onCloseDialog={()=>this.onCloseDialog()}/>;break;
            case 'error' : dialog = <ErrorDialog msg='Reservation Fail.' onCloseDialog={()=>this.onCloseDialog()}/>;break;
            case 'error-type' : dialog = <ErrorDialog msg='All selected sites do not have any same connection type.' onCloseDialog={()=>this.onCloseDialog()}/>;break;
        }

        //for test
        // if(this.state.dialog=='success'||this.state.dialog=='error'){
        //     if(this.dashboardContainer.state.case==4)
        //     {
        //         this.dashboardContainer.setState({
        //             message8:'end task 3 '+(new Date()).toLocaleTimeString()
        //         })
        //         setTimeout(function() { 
        //             alert('Please back to search menu and use form for see your next task')
        //         }.bind(this), 1);
        //     }
            
        //     if(this.dashboardContainer.state.case==5){
        //         this.dashboardContainer.setState({
        //             message12:'end task 5 '+(new Date()).toLocaleTimeString()
        //         },()=>{
        //             let name = prompt("Thank you for testing. \nFinaly, please input your email.", "");
        //             let result = 'email : '+name+'\n'+this.dashboardContainer.state.message1+'\n'
        //             +this.dashboardContainer.state.message2+'\n'
        //             +this.dashboardContainer.state.message3+'\n'
        //             +this.dashboardContainer.state.message4+'\n'
        //             +this.dashboardContainer.state.out1+'\n'
        //             +this.dashboardContainer.state.message5+'\n'
        //             +this.dashboardContainer.state.message6+'\n'
        //             +this.dashboardContainer.state.out2+'\n'
        //             +this.dashboardContainer.state.message7+'\n'
        //             +this.dashboardContainer.state.message8+'\n'
        //             +this.dashboardContainer.state.out3+'\n'
        //             +this.dashboardContainer.state.message9+'\n'
        //             +this.dashboardContainer.state.message10+'\n'
        //             +this.dashboardContainer.state.out4+'\n'
        //             +this.dashboardContainer.state.message11+'\n'
        //             +this.dashboardContainer.state.message12+'\n'
        //             +this.dashboardContainer.state.out5+'\n'+' end'

        //             let params = {
        //                 params:{
        //                     message:result
        //                 }
        //             }
        //             axios.get(TEST,params).then(response=>{
                        
        //             }).catch(error=>{
        //                 console.log('ERROR: '+error)
        //             })
        //         })
        //         // setTimeout(function(){
        //         //     alert('Final, Please capture this alert screen in one or more (up to 5) image files and upload the files to the google form. \nThank you for testing\n'
        //         //     +this.dashboardContainer.state.message1+'\n'
        //         //     +this.dashboardContainer.state.message2+'\n'
        //         //     +this.dashboardContainer.state.message3+'\n'
        //         //     +this.dashboardContainer.state.message4+'\n'
        //         //     +this.dashboardContainer.state.out1+'\n'
        //         //     +this.dashboardContainer.state.message5+'\n'
        //         //     +this.dashboardContainer.state.message6+'\n'
        //         //     +this.dashboardContainer.state.out2+'\n'
        //         //     +this.dashboardContainer.state.message7+'\n'
        //         //     +this.dashboardContainer.state.message8+'\n'
        //         //     +this.dashboardContainer.state.out3+'\n'
        //         //     +this.dashboardContainer.state.message9+'\n'
        //         //     +this.dashboardContainer.state.message10+'\n'
        //         //     +this.dashboardContainer.state.out4+'\n'
        //         //     +this.dashboardContainer.state.message11+'\n'
        //         //     +this.dashboardContainer.state.message12+'\n'
        //         //     +this.dashboardContainer.state.out5+'\n')   
        //         //     console.log('Final, I want you capture text in this alert and send that to me(visaruth.p@gmail.com). \nThank you for testing\n'
        //         //     +this.dashboardContainer.state.message1+'\n'
        //         //     +this.dashboardContainer.state.message2+'\n'
        //         //     +this.dashboardContainer.state.message3+'\n'
        //         //     +this.dashboardContainer.state.message4+'\n'
        //         //     +this.dashboardContainer.state.out1+'\n'
        //         //     +this.dashboardContainer.state.message5+'\n'
        //         //     +this.dashboardContainer.state.message6+'\n'
        //         //     +this.dashboardContainer.state.out2+'\n'
        //         //     +this.dashboardContainer.state.message7+'\n'
        //         //     +this.dashboardContainer.state.message8+'\n'
        //         //     +this.dashboardContainer.state.out3+'\n'
        //         //     +this.dashboardContainer.state.message9+'\n'
        //         //     +this.dashboardContainer.state.message10+'\n'
        //         //     +this.dashboardContainer.state.out4+'\n'
        //         //     +this.dashboardContainer.state.message11+'\n'
        //         //     +this.dashboardContainer.state.message12+'\n'
        //         //     +this.dashboardContainer.state.out5+'\n')                 
        //         // }.bind(this),1)
                
        //     }
        // }

        return (
            <section className='modal'>
                {dialog}
            </section>
        )
    }
}