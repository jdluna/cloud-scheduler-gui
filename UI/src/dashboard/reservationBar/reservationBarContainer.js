import React,{Component} from 'react'
import ReservationBar from './reservationBar'
import CardDescriptionContainer from './cardDescriptionContainer'

export default class reservationBarContainer extends Component {
    render() {
        return (
            <section>
                <ReservationBar dashBoardContainer={this.props.dashBoardContainer}/>
                {this.props.dashBoardContainer.state.cardDetail.panel}
            </section>
        )
    }
}