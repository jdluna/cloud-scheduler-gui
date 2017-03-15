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
        this.state = {
            cpu: '',
            mem: '',
            startDate: {
                obj: moment(),
                date: moment().format('DD-MMM-YYYY').toUpperCase()
            },
            endDate: {
                obj: moment(),
                date: moment().format('DD-MMM-YYYY').toUpperCase()
            },
            startTime: '00:00',
            endTime: '00:00',
            reservationLength: {
                value: 'all',
                days: '',
                hours: ''
            },
            additionalNetwork: 'None',
            imageType: 'Any',
            dataResult: null,
            resultTable: []
        }
        this.appContainer = this.props.dashBoardContainer.props.app
        this.dashboardContainer = this.props.dashBoardContainer

        this.onClose = this.onClose.bind(this)
        this.onResourceChange = this.onResourceChange.bind(this)
        this.onStartDateChange = this.onStartDateChange.bind(this)
        this.onEndDateChange = this.onEndDateChange.bind(this)
        this.onTimeChange = this.onTimeChange.bind(this)
        this.onReserveLengthChange = this.onReserveLengthChange.bind(this)
        this.onImageTypeChange = this.onImageTypeChange.bind(this)
        this.onAdditionNetwordChange = this.onAdditionNetwordChange.bind(this)
        this.onReserveLengthDataChange = this.onReserveLengthDataChange.bind(this)
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
        this.onSelectItem = this.onSelectItem.bind(this)
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
        })
    }

    onEndDateChange(date) {
        this.setState({
            endDate:{
                obj: date,
                date: moment(date).format('YYYY-MM-DD')
            } 
        })
    }

    onTimeChange(event){
        let name = event.target.name
        this.setState({
            [name]: event.target.value
        })
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

    onSelectItem(name){
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
        let params = {
            params:{
                cpu_amt: (this.state.cpu=='') ? 0 : this.state.cpu,
                memory_amt: (this.state.mem=='') ? 0 : this.state.mem,
                connection_type: this.state.additionalNetwork,
                image_type: this.state.imageType,
                begin: this.state.startDate.date+' '+this.state.startTime+':00',
                end: this.state.endDate.date+' '+this.state.endTime+':00',
                all_period: (this.state.reservationLength.value=='all') ? 'True' : 'False',
                days: (this.state.reservationLength.days=='') ? 0 : this.state.reservationLength.days,
                hours: (this.state.reservationLength.hours=='') ? 0 : this.state.reservationLength.hours
            }
        }
        this.queryResource(params)
    }

    render() {
        return (
            <section>
                <Search searchContainer={this} />
            </section>
        )
    }
}