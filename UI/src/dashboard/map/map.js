import style from './map.scss'
import React,{Component} from 'react'

const OPTIONS = {
    center: {
        lat: 48.873947,
        lng: 2.295038
    },
    zoom: 2,
    minZoom: 2,  
    backgroundColor: '#191E2C',
    disableDefaultUI: true,
    mapTypeControl: false,
        styles: [{
            featureType: 'water',
            stylers: [{ color: '#191E2C' }]
        },{
            featureType: 'landscape',
            stylers: [{ color: '#3D4153' }]
        },{
            featureType: 'poi',
            stylers: [{ color: '#4E5265' }]
        },{
            featureType: 'all',
            elementsType: 'all',
            stylers: [{ visibility: 'off'}]
        },{
            featureType: 'water',
            elementsType: 'geometry',
            stylers: [{ visibility: 'on'}]
        },{
            featureType: 'landscape',
            elementsType: 'geometry',
            stylers: [{ visibility: 'on'}]
        },{
            featureType: 'administrative.country',
            elementsType: 'geometry.stroke',
            stylers: [{ visibility: 'off'}]
        }]
}

export default class map extends Component {
    componentDidMount(){
        this.props.container.showMap(this.refs.map,OPTIONS)
    }

    render() {
        return (
            <section id={style.map}>
                <div className={style.timezone}>
                    <img src='img/ic_access_time.svg'/>
                    <div className={style.text}>
                        <div className={style.time}>{this.props.container.state.date}</div>
                        <div className={style.utc}>BANGKOK/HANOI UTC +07:00</div>
                    </div>
                </div>
                <div className={style.search}>
                    <input type='text' placeholder='Search by name' className={style.input}/>
                    <img src='img/ic_search_input.svg'/>
                </div>
                <div className={style.display} ref="map"></div>
            </section>
        )
    }
}