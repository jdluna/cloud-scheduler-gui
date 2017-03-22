import React, { Component } from 'react'
import Reservation from './reservation'
import axios from 'axios'
import moment from 'moment'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'

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
            reservationLength: {
                days: '',
                hours: ''
            },
            imageType: 'Any',

            // OTHER
            card: <Step1 reservationContainer={this} state={this.state}/>,
            alertNode: {}
        }

        this.onStartDateChange = this.onStartDateChange.bind(this)
        this.onEndDateChange = this.onEndDateChange.bind(this)
        this.onTimeChange = this.onTimeChange.bind(this)
        this.onImageTypeChange = this.onImageTypeChange.bind(this)
        this.onPreviousStep = this.onPreviousStep.bind(this)
        this.onNextStep = this.onNextStep.bind(this)
        this.onClose = this.onClose.bind(this)
    }

    onClose(){
        this.dashboardContainer.onCloseModal()
    }

    onStartDateChange(date) {
        if(date.format()<this.state.endDate.obj.format()){
            this.setState({
                startDate:{
                    obj: date,
                    date: moment(date).format('YYYY-MM-DD')
                } 
            })
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
            })
            let startTime = parseInt(this.state.startTime.replace(':00'))
            let endTime = parseInt(this.state.endTime.replace(':00'))
            if(endTime<=startTime){
                let time = ((startTime+1)>=23) ? 23 : (startTime+1)
                if((startTime+1)<=23){
                    this.setState({
                        endTime: ((time)>=10) ? (time)+':00' : '0'+(time)+':00'
                    })
                }else{
                    this.setState({
                        endDate:{
                            obj: moment(date).add(1,'days'),
                            date: moment(date).add(1,'days').format('YYYY-MM-DD')
                        },
                        endTime: '00:00'
                    })
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
            })
        }
    }

    onTimeChange(event){
        let name = event.target.name
        this.setState({
            [name]: event.target.value
        })
    }

    onImageTypeChange(event){
        this.setState({
            imageType: event.target.value
        })
    }

    onPreviousStep(event){
        switch(event.target.name){
            case 'step1' : this.onClose();break
            case 'step2' : this.setState({card:<Step1 reservationContainer={this}/>});break
            case 'step3' : this.setState({card:<Step2 reservationContainer={this}/>});break
        }
    }

    onNextStep(event){
        switch(event.target.name){
            case 'step1' : this.setState({card:<Step2 reservationContainer={this}/>});break
            case 'step2' : this.setState({card:<Step3 reservationContainer={this}/>});break
            case 'step3' : ;break
        }
    }

    render() {
        return (
            <section>
                <Reservation reservationContainer={this}/>
            </section>
        )
    }
}