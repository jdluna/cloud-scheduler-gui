import React, { Component } from 'react'
import Reservation from './reservation'
import axios from 'axios'
import moment from 'moment'

export default class ReservationContainer extends Component {
    constructor(props){
        super(props)
        this.appContainer = this.props.dashBoardContainer.props.app
        this.dashboardContainer = this.props.dashBoardContainer
        this.timezone = moment.tz(this.appContainer.state.authen.timezone)
        this.sites = this.props.sites

        this.state = {
            // STEP1
            startDate: {
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            endDate: {
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            startTime: this.timezone.format().slice(11,13)+':00',
            endTime: this.timezone.add(1,'hours').format().slice(11,13)+':00',
            reservationLength: '',
            imageType: 'Any',
            cpu: [],
            mem: [],

            // STEP2
            title: '',
            description: '',

            // OTHER
            card: 'step1',
            alertNode: {}
        }

        this.onStartDateChange = this.onStartDateChange.bind(this)
        this.onEndDateChange = this.onEndDateChange.bind(this)
        this.onTimeChange = this.onTimeChange.bind(this)
        this.onImageTypeChange = this.onImageTypeChange.bind(this)
        this.onPreviousStep = this.onPreviousStep.bind(this)
        this.onNextStep = this.onNextStep.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onEnterCPU = this.onEnterCPU.bind(this)
        this.onEnterMEM = this.onEnterMEM.bind(this)
        this.setCPUAndMEM = this.setCPUAndMEM.bind(this)
        this.onEnterInputStep2 = this.onEnterInputStep2.bind(this)
    }

    onClose(){
        this.dashboardContainer.onCloseModal()
    }

    setReservationLength(){
        let startDate = this.state.startDate.date
        let endDate = this.state.endDate.date
        let {startTime,endTime} = this.state
        let start = moment(startDate+' '+startTime,'YYYY-MM-DD HH:mm')
        let end = moment(endDate+' '+endTime,'YYYY-MM-DD HH:mm')

        let day = end.diff(start,'days')
        let hour = end.diff(start,'hours')
        let length = ''
        if(day>=1){
            length = day+' Days, '+(hour-(24*day))+' Hours'
        }else{
            length = day+' Days, '+hour+' Hours'
        }
        this.setState({
            reservationLength: length
        })
    }

    onStartDateChange(date) {
        if(date.format()<this.state.endDate.obj.format()){
            this.setState({
                startDate:{
                    obj: date,
                    date: moment(date).format('YYYY-MM-DD')
                } 
            },this.setReservationLength)
        }else{
            this.setState({
                startDate:{
                    obj: date,
                    date: moment(date).format('YYYY-MM-DD')
                }, 
                endDate:{
                    obj: date,
                    date: moment(date).format('YYYY-MM-DD')
                } 
            },this.setReservationLength)
            let startTime = parseInt(this.state.startTime.replace(':00'))
            let endTime = parseInt(this.state.endTime.replace(':00'))
            if(endTime<=startTime){
                let time = ((startTime+1)>=23) ? 23 : (startTime+1)
                if((startTime+1)<=23){
                    this.setState({
                        endTime: ((time)>=10) ? (time)+':00' : '0'+(time)+':00'
                    },this.setReservationLength)
                }else{
                    this.setState({
                        endDate:{
                            obj: moment(date).add(1,'days'),
                            date: moment(date).add(1,'days').format('YYYY-MM-DD')
                        },
                        endTime: '00:00'
                    },this.setReservationLength)
                }
            }
        }
    }

    onEndDateChange(date) {
        if(date.format()>=this.state.startDate.obj.format()){
            this.setState({
                endDate:{
                    obj: date,
                    date: moment(date).format('YYYY-MM-DD')
                } 
            },this.setReservationLength)
        }
    }

    onTimeChange(event){
        let name = event.target.name
        this.setState({
            [name]: event.target.value
        },this.setReservationLength)
    }

    onImageTypeChange(event){
        this.setState({
            imageType: event.target.value
        })
    }

    onPreviousStep(event){
        switch(event.target.name){
            case 'step1' : this.onClose();break
            case 'step2' : this.setState({card: 'step1'});break
            case 'step3' : this.setState({card: 'step2'});break
        }
    }

    onNextStep(event){
        switch(event.target.name){
            case 'step1' : this.setState({card: 'step2'});break
            case 'step2' : this.setState({card: 'step3'});break
            case 'step3' : ;break
        }
    }

    setCPUAndMEM(index){
        let {cpu,mem} = this.state
        cpu[index] = ''
        mem[index] = ''
        this.setState({
            cpu: cpu,
            mem: mem
        })
    }

    onEnterCPU(event){
        let {cpu} = this.state
        cpu[parseInt(event.target.name)] = event.target.value
        this.setState({
            cpu: cpu
        })
    }

    onEnterMEM(event){
        let {mem} = this.state
        mem[parseInt(event.target.name)] = event.target.value
        this.setState({
            mem: mem
        })
    }

    onEnterInputStep2(event){
        let name = event.target.name
        this.setState({
            [name]: event.target.value
        })
    }

    componentWillMount(){
        this.setReservationLength()
    }

    render() {
        return (
            <section>
                <Reservation reservationContainer={this}/>
            </section>
        )
    }
}