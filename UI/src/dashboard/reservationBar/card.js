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
        let numChart = this.props.cardContainer.state.chart.length
        let {chartIndex, networkIndex, networkType} = this.props.cardContainer.state
        let chart = (typeof(this.props.cardContainer.state.chart[chartIndex])!=='undefined') ? this.props.cardContainer.state.chart[chartIndex] : []

        let network = []
        for(let i=0;i<2;i++){
            try{
                network[i] = networkType[networkIndex][i].name
            }catch(error){
                network[i] = ''
            }
        }

        return (
            <section style={this.props.cardContainer.state.style.card} className={style.card}>
                <article style={this.props.cardContainer.state.style.cardTitle} className={style.article} onClick={this.props.cardContainer.onCheckBoxChange}>
                    <input className={style.checkbox} type='checkbox' onChange={this.props.cardContainer.onCheckBoxChange} checked={this.props.cardContainer.state.select}/>
                    <span className={style.title}>Select for reservation</span>
                    <img width='18' className={style.close} src='img/ic_close.svg' onClick={this.props.cardContainer.onCloseCard}/>
                </article>

                <img className={(numChart>=2) ? style.chartIcon1 : style.disbleChart} src='img/ic_navigate_before.svg' onClick={this.props.cardContainer.onPreviousChart}/>
                <img className={(numChart>=2) ? style.chartIcon2 : style.disbleChart} src='img/ic_navigate_next.svg' onClick={this.props.cardContainer.onNextChart}/>

                <section className={style.data}>
                    <div className={style.cardname}>{this.props.cardContainer.state.site.name}</div>
                    <div className={style.calendar}>
                        <img className={style.icon} src='img/ic_navigate_before.svg' onClick={this.props.cardContainer.onPreviousDate}/>
                        <span className={style.date}>{this.props.cardContainer.state.date}</span>
                        <img className={style.icon} src='img/ic_navigate_next.svg' onClick={this.props.cardContainer.onNextDate}/>
                    </div>
                    <div className={style.chart}>
                        <div className={(chart.length>=1) ? style.chartWrap : style.disbleChart}>
                            <div className={style.wrap}>
                                <div className={style.innerlabel}>
                                    <div className={style.label}>{(chart.length>=1) ? chart[0].available : ''}</div>
                                    <div className={style.minilabel}>{(chart.length>=1) ? chart[0].unit : ''}</div>
                                </div>
                                <canvas className={style.padding} ref="cpu" width='70' height='70'></canvas>
                                <div className={style.label}>{(chart.length>=1) ? chart[0].name : ''}</div>
                            </div>
                        </div>
                        <div className={(chart.length>=2) ? style.chartWrap : style.visibleChart2}>
                            <div className={style.wrap}>
                                <div className={style.innerlabel}>
                                    <div className={style.label}>{(chart.length>=2) ? chart[1].available : ''}</div>
                                    <div className={style.minilabel}>{(chart.length>=2) ? chart[1].unit : ''}</div>
                                </div>
                                <canvas className={style.padding} ref="mem" width='70' height='70'></canvas>
                                <div className={style.label}>{(chart.length>=2) ? chart[1].name : ''}</div>
                            </div>
                        </div>

                        {/*<div className={style.chartWrap}>
                            <div className={style.wrap}>
                                <div className={style.innerlabel}>
                                    <div className={style.label}>{this.props.cardContainer.state.site.cpuAvailable}</div>
                                    <div className={style.minilabel}>CPUs</div>
                                </div>
                                <canvas className={style.padding} ref="cpu" width='70' height='70'></canvas>
                                <div className={style.label}>CPU</div>
                            </div>
                        </div>
                        <div className={style.chartWrap}>
                            <div className={style.wrap}>
                                <div className={style.innerlabel}>
                                    <div className={style.label}>{this.props.cardContainer.state.site.memAvailable}</div>
                                    <div className={style.minilabel}>GB</div>
                                </div>
                                <canvas className={style.padding} ref="mem" width='70' height='70'></canvas>
                                <div className={style.label}>Memory</div>
                            </div>
                        </div>*/}
                    </div>
                    <div className={style.resource}>
                        <div>
                            <span className={style.cpu}></span>
                            <span className={style.detail}>{chart[0].name} Available</span>
                            <span> : </span><span className={style.cpudetail}>{chart[0].available}</span><span>{' / '+chart[0].total}</span>
                        </div>
                        <div className={style.space}></div>
                        <div className={(chart.length<=1) ? style.visibleChart : ''}>
                            <span className={style.mem}></span>
                            <span className={style.detail}>{(chart.length>1) ? chart[1].name : ''} Available</span>
                            <span> : </span><span className={style.memdetail}>{(chart.length>1) ? chart[1].available : ''}</span><span>{(chart.length>1) ? ' / '+chart[1].total : ''}</span>
                        </div>
                    </div>
                </section>
                <section className={style.section}>
                    <div className={style.type}>
                        <span className={style.name}>{network[0]}</span>
                        <span style={this.props.cardContainer.state.style.ent} className={style.deactive}></span>
                    </div>
                    <div className={style.type}>
                        <span className={style.name}>{network[1]}</span>
                        <span style={this.props.cardContainer.state.style.ipop} className={(network[1]=='') ? style.hide : style.deactive}></span>
                    </div >
                </section>
                <div className={style.connectType}>
                    <form>
                    {
                        this.props.cardContainer.state.networkType.map((data,key)=>{
                            if(this.props.cardContainer.state.networkType.length!=1){
                                return(
                                    <input type='radio' name='connect' value={key} checked = {(networkIndex==key) ? ''+key : null} key={key+networkIndex+key} onChange={this.props.cardContainer.onNetworkTypeInputChange}/>
                                )
                            }
                        })
                    }
                    </form>
                </div>
                <section className={style.desc}>
                    <div className={style.title}>Description</div>
                    <div className={style.detail}>{this.props.cardContainer.state.site.desc}</div>
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