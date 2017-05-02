import React,{Component} from 'react'
import ReservationBar from './reservationBar'
import CardDescriptionContainer from './cardDescriptionContainer'

export default class reservationBarContainer extends Component {
    constructor(props){
        super(props)
        this.onReserveModeChange = this.onReserveModeChange.bind(this)
        this.onReserveClick = this.onReserveClick.bind(this)
    }

    onReserveModeChange(event){
        this.props.dashBoardContainer.setState({
            reserveMode: event.target.value
        })
    }

    onReserveClick(event){
        event.preventDefault()
        this.props.dashBoardContainer.state.reservationPanel.reserveBarNode.style.zIndex = 1
        let {app} = this.props.dashBoardContainer.props
        if(app.state.authen.isLogedIn){
            this.props.dashBoardContainer.onSelectMenu('ReservationSites')
        }else{
            app.setState({
                isOpenReserveModal: true
            },app.authentication)
        }
    }

    render() {
        return (
            <section>
                <ReservationBar dashBoardContainer={this.props.dashBoardContainer} reservationBarContainer={this}/>
                {this.props.dashBoardContainer.state.cardDetail.panel}
            </section>
        )
    }
}