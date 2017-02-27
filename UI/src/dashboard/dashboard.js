import React,{Component} from 'react'
import MenuBarContainer from './menuBar/menuBarContainer'
import ReservationBarContainer from './reservationBar/reservationBarContainer'
import MapContainer from './map/mapContainer'

export default class Dashboard extends Component {
    render() {
        return (
            <section>
                <MenuBarContainer/>
                <MapContainer/>
                <ReservationBarContainer/>
            </section>
        )
    }
}