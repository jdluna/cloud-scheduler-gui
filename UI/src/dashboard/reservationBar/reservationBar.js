import style from './reservationBar.scss'
import React,{Component} from 'react'
import CardContainer from './cardContainer'


export default class reservationBar extends Component {
    render() {
        return (
            <section id={style.panel}>
                <section className={style.reserve}>
                    <form>
                        <div><span className={style.title}>RESERVATION</span></div>
                        <div className={style.choose}>
                            <input type='radio' name='type'/>
                            <span className={style.text}>Single cluster on single site</span>
                        </div>
                        <div className={style.choose}>
                            <input type='radio' name='type'/>
                            <span className={style.text}>Single cluster spaning multiple sites</span>
                        </div>
                        <div><span className={style.select}>Selected : 0</span></div>
                        <button className='btn'>RESERVE</button>
                    </form>
                </section>
                <p style={this.props.dashBoardContainer.state.cardPanel.notfound} className={style.status}>No selected resource</p>
                <section className={style.cardpanel}>
                    {this.props.dashBoardContainer.state.map.card}
                </section>
            </section>
        )
    }
}