import style from './card.scss'
import React,{Component} from 'react'
import Chart from 'chart.js'

export default class card extends Component {
    componentDidMount(){
        this.props.cardContainer.setChartNode(this.refs.cpu,this.refs.mem)
        // this.props.cardContainer.drawDoughnutChart(this.refs.cpu,'#EFA430')
        // this.props.cardContainer.drawDoughnutChart(this.refs.mem,'#9CCBE5')
    }

    render() {
        return (
            <section style={this.props.cardContainer.state.style.card} className={style.card}>
                <article style={this.props.cardContainer.state.style.cardTitle} className={style.article} onClick={this.props.cardContainer.onCheckBoxChange}>
                    <input className={style.checkbox} type='checkbox' onChange={this.props.cardContainer.onCheckBoxChange} checked={this.props.cardContainer.state.select}/>
                    <span className={style.title}>{this.props.cardContainer.state.site.name}</span>
                    <img width='18' className={style.close} src='img/ic_close.svg' onClick={this.props.cardContainer.onCloseCard}/>
                </article>
                <section className={style.data}>
                    <div className={style.calendar}>
                        <img className={style.icon} src='img/ic_navigate_before.svg' onClick={this.props.cardContainer.onPreviousDate}/>
                        <span className={style.date}>{this.props.cardContainer.state.date}</span>
                        <img className={style.icon} src='img/ic_navigate_next.svg' onClick={this.props.cardContainer.onNextDate}/>
                    </div>
                    <div className={style.chart}>
                        <div>
                            <div className={style.innerlabel}>
                                <div className={style.label}>{this.props.cardContainer.state.site.cpuAvailable}</div>
                                <div className={style.minilabel}>CPUs</div>
                            </div>
                            <canvas className={style.padding} ref="cpu" width='70' height='70'></canvas>
                            <div className={style.label}>CPU</div>
                        </div>
                        <div>
                            <div className={style.innerlabel}>
                                <div className={style.label}>{this.props.cardContainer.state.site.memAvailable}</div>
                                <div className={style.minilabel}>GB</div>
                            </div>
                            <canvas className={style.padding} ref="mem" width='70' height='70'></canvas>
                            <div className={style.label}>Memory</div>
                        </div>
                    </div>
                    <div className={style.resource}>
                        <div>
                            <span className={style.cpu}></span>
                            <span className={style.detail}>CPU Available</span>
                            <span> : {this.props.cardContainer.state.site.cpuAvailable+'/'+this.props.cardContainer.state.site.cpuTotal}</span>
                        </div>
                        <div className={style.space}></div>
                        <div>
                            <span className={style.mem}></span>
                            <span className={style.detail}>Memory Available</span>
                            <span> : {this.props.cardContainer.state.site.memAvailable+'/'+this.props.cardContainer.state.site.memTotal}</span>
                        </div>
                    </div>
                </section>
                <section className={style.section}>
                    <div className={style.type}>
                        <span className={style.name}>ENT-enabled</span>
                        <span style={this.props.cardContainer.state.style.ent} className={style.deactive}></span>
                    </div>
                    <div className={style.type}>
                        <span className={style.name}>IPOP</span>
                        <span style={this.props.cardContainer.state.style.ipop} className={style.deactive}></span>
                    </div >
                </section>
                <section className={style.desc}>
                    <p className={style.title}>Description</p>
                    <p className={style.detail}>{this.props.cardContainer.state.site.desc}</p>
                </section>
                <section className={style.section}>
                    <span className={style.text}>Number of running cluster : {this.props.cardContainer.state.site.running}</span>
                </section>
                <section>
                    <button className='btn--info' onClick={this.props.cardContainer.onMoreInfoClick}>MORE INFO</button>
                </section>
            </section>
        )
    }
}