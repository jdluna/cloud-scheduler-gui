import React,{Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import Reservation from '../reservation/reservation'
import {SET_TIMEZONE_ENDPOINT,CONFIRM_RESOURCE_RESERVATION_ENDPOINT} from '../../config/endpoints'
import { RESOURCES } from '../../config/attributes'
import SuccessDialog from '../reservation/successDialog'
import ErrorDialog from '../reservation/ErrorDialog'
import Resource from './resource'

export default class ResourceContainer extends Component{
	constructor(props){
		super(props);
		this.appContainer = this.props.dashBoardContainer.props.app
        	this.dashboardContainer = this.props.dashBoardContainer


	
		this.state = {value:'', _name:'', description:'Virtual machines', contact:'', location:'', pragma_boot_path:'/opt/pragma_boot', pragma_boot_version:'1', python_path:'/opt/python/bin/python', temp_dir:'/var/run/pcc', username:'root', deployment_type:'Rocks KVM', site_hostname:'', latitude:'36.060839', longitude:'140.137303', total_cpu:'32', total_memory:'64',network: 'IPOP', image_type:[]};
	
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageTypeChange = this.handleImageTypeChange.bind(this);
	
	this.onSubmit = this.onSubmit.bind(this);
	this.queryConfirmReservation = this.queryConfirmReservation.bind(this);
	this.onCloseSettings = this.onCloseSettings.bind(this)
	}


	handleChange(event){
	    this.setState({value: event.target.value});
	}

	handleInputChange(event){
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;

	    this.setState({[name]: value});
	}
    handleImageTypeChange(event){
        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++){
            if(options[i].selected){
                value.push(options[i].value);
            }
        }
        this.setState({
            image_type: value
        });
    }

	handleSubmit(event){
	    alert('Form was submitted, ' + this.state._name);
	}

	onCloseSettings(){
        this.props.settingContainer.onClose()
	}
	

	onSubmit(event){
		console.log('mysubmit');
	     let { _name, description, contact, location, pragma_boot_path, pragma_boot_version, python_path, temp_dir, username, latitude, longitude, total_cpu, total_memory, network, image_type} = this.state;
            
		alert(this.state._name);


	   let params = {
            params:{
                _name: this.state._name,
                description: this.state.description,
                contact: this.state.contact,
                location: this.state.location,
                pragma_boot_path: this.state.pragma_boot_path,
                pragma_boot_version: this.state.pragma_boot_version,
                python_path: this.state.python_path,
                temp_dir: this.state.temp_dir,
                username: this.state.username,
                deployment_type: this.state.deployment_type,
                site_hostname: this.state.site_hostname,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                total_cpu: this.state.total_cpu,
                total_memory: this.state.total_memory,
				network: this.state.network,
                image_type: this.state.image_type
			}
        };


	axios.get(CONFIRM_RESOURCE_RESERVATION_ENDPOINT,params).then(response=>{
            let {data,status} = response
            if(status==200&&data.result){
                if(data.result=='success'){
                    alert('success')
                }else{
                    
                }
            }
        }).catch(error=>{
            console.log('QUERY CONFIRM RESERVATION ERROR: '+error)
        });
	
		event.preventDefault();
	}


	queryConfirmReservation(event){
        let sitesId = 'root';
        let resources = '';


        let params = {
            params:{
                _name: this.state._name,
                description: this.state.description,
                contact: this.state.contact,
                location: this.state.location,
                pragma_boot_path: this.state.pragma_boot_path,
                pragma_boot_version: this.state.pragma_boot_version,
                python_path: this.state.python_path,
                temp_dir: this.state.temp_dir,
                username: this.state.username,
                deployment_type: this.state.deployment_type,
                site_hostname: this.state.site_hostname,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                total_cpu: this.state.total_cpu,
                total_memory: this.state.total_memory,
                sites_id: sitesId,
				network: this.state.network,
                image_type: this.state.image_type.toString()
            }
        }


        axios.get(CONFIRM_RESOURCE_RESERVATION_ENDPOINT,params).then(response=>{
            let {data,status} = response
            if(status==200&&data.result){
                if(data.result=='success'){
                    this.changeDialog('success')
                    this.dashboardContainer.closeAllCard()
                }else{
                    this.changeDialog('error')
                }
            }
        }).catch(error=>{
            console.log('QUERY CONFIRM RESERVATION ERROR: '+error)
        });

    }



	render(){
		return (
			<Resource resourcesContainer={this}/>
		)
	}

}
