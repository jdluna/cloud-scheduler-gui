import style from './reservationBar.scss'
import React,{Component} from 'react'
import CardContainer from './cardContainer'

export default class reservationBar extends Component {
    componentDidMount(){
        this.props.dashBoardContainer.setState({
            reservationPanel:{
                multipleTextNode: this.refs.multiple,
                reserveBtnNode: this.refs.reserveBtn
            }
        })
    }
    render() {
        return (
            <section id={style.panel}>
                <section className={style.reserve}>
                    <form>
                        <div><span className={style.title}>RESERVATION</span></div>
                        <div className={style.choose}>
                            <input type='radio' name='type' value='single' checked={this.props.dashBoardContainer.state.reserveMode=='single'} onChange={this.props.reservationBarContainer.onReserveModeChange}/>
                            <span className={style.text}>Single cluster on single site</span>
                        </div>
                        <div className={style.choose}>
                            <input type='radio' name='type' value='multiple' checked={this.props.dashBoardContainer.state.reserveMode=='multiple'} onChange={this.props.reservationBarContainer.onReserveModeChange} disabled={this.props.dashBoardContainer.state.selectCard.length<2}/>
                            <span ref='multiple' className={style.multipletext}>Single cluster spaning multiple sites</span>
                        </div>
                        <span className={style.select}>Selected : {this.props.dashBoardContainer.state.selectCard.length}</span>
                        <button ref='reserveBtn' className='btn--disabled' disabled={this.props.dashBoardContainer.state.selectCard.length<1} onClick={this.props.reservationBarContainer.onReserveClick}>RESERVE</button>
                    </form>
                </section>
                <p style={this.props.dashBoardContainer.state.cardPanel.notfound} className={style.status}>Click on the marker to view Info.</p>
                <section className={style.cardpanel}>
                    {this.props.dashBoardContainer.state.map.card}
                </section>
            </section>
        )
    }
}