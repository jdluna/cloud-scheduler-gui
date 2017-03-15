import React,{Component} from 'react'
import axios from 'axios'
import Map from './map'
import {MAP_ENDPOINT} from '../../config/endpoints'
import DateTime from '../../lib/dateTime'
import moment from 'moment-timezone'

const date = new DateTime()
export default class mapContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            date: this.getDateTimeZone(),
            timezone: this.getNameTimeZone()
        }
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
        let marker = []
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

            marker[key] = new google.maps.Marker({
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
            google.maps.event.addListener(marker[key], 'mouseover', this.onMouseOver)
            google.maps.event.addListener(marker[key], 'mouseout', this.onMouseOut)
            google.maps.event.addListener(marker[key], 'click', ()=>this.onMouseClick(id,{node:marker[key],icon:markerIcon}))
        })
        this.markerCluster = new MarkerClusterer(this.map, marker, {imagePath: 'img/marker_cluster'})
        this.props.dashBoardContainer.setMarkerNode(marker)
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

    componentDidMount(){
        this.setDateThick()
    }

    render() {
        return (
            <Map container={this}/>
        )
    }
}