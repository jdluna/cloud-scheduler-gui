import React,{Component} from 'react'
import axios from 'axios'
import Map from './map'
import {MAP_ENDPOINT} from '../../config/endpoints'
import DateTime from '../../lib/dateTime'
import moment from 'moment-timezone'
import AutoComplete from './autocomplete'

const date = new DateTime()
export default class mapContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            date: this.getDateTimeZone(),
            timezone: this.getNameTimeZone(),
            search: '',
            autocompletePanel: []
        }
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onItemInAutoCompleteClick = this.onItemInAutoCompleteClick.bind(this)
        this.onSearchPress = this.onSearchPress.bind(this)
    }

    getDateTimeZone(){
        let zone = moment.tz(this.props.dashBoardContainer.getUserTimeZone())
        let zoneDate = zone.format('DD-MMM-YYYY').toUpperCase()
        let zoneTime = zone.format().slice(11,16)
        return zoneDate+' '+zoneTime
    }

    getNameTimeZone(){
        let timezone = this.props.dashBoardContainer.getUserTimeZone()
        let zone = moment.tz(timezone)
        return timezone.toUpperCase()+' '+zone.format('Z z')
    }

    setDateThick(){
        setInterval(()=>{
            this.setState({
                date: this.getDateTimeZone(),
                timezone: this.getNameTimeZone()
            })
        },2000)
    }

    onMouseClick(id,marker){
        this.props.dashBoardContainer.onSelectMarker(id,marker)
        if(marker.icon=='img/marker.png'){
            marker.node.setIcon('img/marker_select.png')
        }else{
            marker.node.setIcon('img/marker_ent_select.png')
        }
    }

    onMouseOver(){
        this.info.open(this.map,this)  
    }

    onMouseOut(){
        this.info.close()
    }

    setMarker(data){
        this.marker = []
        let {amount,sites} = data
        // this.props.dashBoardContainer.setMapData(sites)
        sites.map((data,key)=>{
            let {id,connection_type} = data
            let ent = false
            connection_type.map((data,key)=>{
                if((data.name).toUpperCase()=='ENT'){
                    ent = true
                }
            })
            let markerIcon = (ent) ? 'img/marker_ent.png' : 'img/marker.png'

            this.marker[key] = new google.maps.Marker({
                id: id,
                name: data.name,
                position: { 
                    lat: parseFloat(data.latitude),
                    lng: parseFloat(data.longitude)
                },
                map: this.map,
                icon: {url: markerIcon},
                info: new google.maps.InfoWindow({
                     content: data.name
                })
            })
            google.maps.event.addListener(this.marker[key], 'mouseover', this.onMouseOver)
            google.maps.event.addListener(this.marker[key], 'mouseout', this.onMouseOut)
            google.maps.event.addListener(this.marker[key], 'click', ()=>this.onMouseClick(id,{node:this.marker[key],icon:markerIcon}))
        })
        this.markerCluster = new MarkerClusterer(this.map, this.marker, {imagePath: 'img/marker_cluster'})
        this.markerClusterSearch = new MarkerClusterer(this.map, this.marker, {imagePath: 'img/marker_cluster'})
        this.props.dashBoardContainer.setMarkerNode(this.marker)
    }

    showMap(node,options){
        this.map = new google.maps.Map(node, options);
        axios.get(MAP_ENDPOINT).then(response =>{
            if(response.status==200){
                console.log(response.data)
                this.setMarker(response.data)
            }else{
                console.warn('query map failed!')
            }
        })
    }

    onSearchPress(event){
        if(event.key&&event.key=='Enter'){
            this.setState({
                autocompletePanel: []
            })
            this.clearCluster()
        }
    }

    onSearchChange(event){
        let value = event.target.value
        this.setState({
            search: value
        })
        if (value != '') {
            this.hideMarker(value)
        } else {
            this.showAllMarker()
        }
    }

    hideMarker(name){
        let item = []
        let markerNode = []
        let input = name.toLowerCase()
        let REGEX = '^'+input
        this.marker.map((data,key)=>{
            let marker = data.name.toLowerCase()
            if(!marker.match(REGEX)){
                data.setVisible(false)
            }else{
                data.setVisible(true)
                item.push(data.name)
                markerNode.push(data)
            }
        })
        
        if(markerNode.length>0){
             this.map.panTo(markerNode[0].getPosition())
             this.markerCluster.clearMarkers()
             this.markerClusterSearch.clearMarkers()
             this.markerClusterSearch = new MarkerClusterer(this.map, markerNode, {imagePath: 'img/marker_cluster'})
             this.map.setZoom(2)
        }

        if(item.length>0){
            this.setState({
                autocompletePanel: <AutoComplete item={item} handle={this.onItemInAutoCompleteClick}/>
            })
        }else{
            this.setState({
                autocompletePanel: []
            })
        }
    }

    onItemInAutoCompleteClick(data){
        this.setState({
            search: data,
            autocompletePanel: []
        })
    }

    showAllMarker(){
        this.marker.map(data=>{
            data.setVisible(true)
        })
        this.setState({
            autocompletePanel: []
        })
        this.clearCluster()
        this.marker.map(data=>{
                data.setVisible(true)
            })
        this.markerCluster.clearMarkers()
        this.markerCluster = new MarkerClusterer(this.map, this.marker, {imagePath: 'img/marker_cluster'})
        this.markerClusterSearch.clearMarkers()
        this.map.setZoom(2)
    }

    clearCluster(){
        this.marker.map(data=>{
                data.setVisible(true)
            })
        this.markerCluster.clearMarkers()
        this.markerCluster = new MarkerClusterer(this.map, this.marker, {imagePath: 'img/marker_cluster'})
        this.markerClusterSearch.clearMarkers()
        this.map.setZoom(2)
    }

    componentDidMount(){
        this.setDateThick()
    }

    render() {
        return (
            <Map container={this}/>
        )
    }
}