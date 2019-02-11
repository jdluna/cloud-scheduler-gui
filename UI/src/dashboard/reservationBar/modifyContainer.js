import React,{Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import Modify from './modify'
import {SET_TIMEZONE_ENDPOINT,CONFIRM_RESOURCE_RESERVATION_ENDPOINT} from '../../config/endpoints'
import { RESOURCES } from '../../config/attributes'

export default class ModifyContainer extends Component{
	constructor(props){
		super(props);
		this.appContainer = this.props.dashBoardContainer.props.app
        this.dashboardContainer = this.props.dashBoardContainer
        
        this.cardData = this.props.dashBoardContainer.state.cardModifyInfo
	
		this.state = {
            value:this.cardData.value, 
            _name:this.cardData.name, 
            description:this.cardData.description, 
            contact:this.cardData.contact, 
            location:this.cardData.location, 
            pragma_boot_path:this.cardData.pragma_boot_path, 
            pragma_boot_version:this.cardData.pragma_boot_version, 
            python_path:this.cardData.python_path, 
            temp_dir:this.cardData.temp_dir, 
            username:this.cardData.username, 
            deployment_type:this.cardData.deployment_type, 
            site_hostname:this.cardData.site_hostname, 
            latitude:this.cardData.latitude, 
            longitude:this.cardData.longitude, 
            total_cpu:this.cardData.CPU.total, 
            total_memory:this.cardData.memory.total,
            network:(this.cardData.connection_type[0] == null) ? '':this.cardData.connection_type[0].name, 
            image_type:this.cardData.image_type
        };
	
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageTypeChange = this.handleImageTypeChange.bind(this);
	
	this.onSubmit = this.onSubmit.bind(this);
	this.queryConfirmReservation = this.queryConfirmReservation.bind(this);
	this.onClose = this.onClose.bind(this)
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

	onSubmit(event){
		console.log('mysubmit');
	     let { _name, description, contact, location, pragma_boot_path, pragma_boot_version, python_path, temp_dir, username, latitude, longitude, total_cpu, total_memory, network, image_type} = this.state;
            
		alert(this.state._name);


	   let params = {
            params:{
                session_id: this.appContainer.state.authen.session,
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
                session_id: this.appContainer.state.authen.session,
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
    onClose(){
        this.props.dashBoardContainer.onCloseModal()
    }
    render(){
        return (
            <Modify modifyContainer={this} dashBoardContainer={this.props.dashBoardContainer}/>
        )
    }
                
}
