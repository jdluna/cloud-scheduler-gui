import React, { Component } from 'react'
import Style from './reservation.scss'
import DatePicker from 'react-datepicker'
import ReactDOM from 'react-dom'

const TimeItem = (props) => (
    <select name={props.name} className={Style.inputtime} value={props.value} onChange={props.handle}>
        <option value='00:00'>00 : 00</option>
        <option value='01:00'>01 : 00</option>
        <option value='02:00'>02 : 00</option>
        <option value='03:00'>03 : 00</option>
        <option value='04:00'>04 : 00</option>
        <option value='05:00'>05 : 00</option>
        <option value='06:00'>06 : 00</option>
        <option value='07:00'>07 : 00</option>
        <option value='08:00'>08 : 00</option>
        <option value='09:00'>09 : 00</option>
        <option value='10:00'>10 : 00</option>
        <option value='11:00'>11 : 00</option>
        <option value='12:00'>12 : 00</option>
        <option value='13:00'>13 : 00</option>
        <option value='14:00'>14 : 00</option>
        <option value='15:00'>15 : 00</option>
        <option value='16:00'>16 : 00</option>
        <option value='17:00'>17 : 00</option>
        <option value='18:00'>18 : 00</option>
        <option value='19:00'>19 : 00</option>
        <option value='20:00'>20 : 00</option>
        <option value='21:00'>21 : 00</option>
        <option value='22:00'>22 : 00</option>
        <option value='23:00'>23 : 00</option>
    </select>
)

const TimeList = (props) => {
    let start = parseInt(props.s)
    let end = parseInt(props.e)
    let options = []
    for(let i=start;i<=end;i++){
        let time = ((i)>=10) ? (i)+':00' : '0'+(i)+':00'
        options.push(time)
    }
    return(
        <select className={Style.inputtime} value={props.value} onChange={props.handle}>
            {
                options.map((data,key)=>{
                    let d = data.replace(':',' : ')
                    return(
                        <option key={key} value={data}> {d} </option>
                    )
                })
            }
                    
        </select>
    )
}

export default class Step1 extends Component {
    componentDidMount(){
        this.props.reservationContainer.setState({
            alertNode: this.refs.alert
        })
        let siteInputCPUDom = []
        let siteInputMEMDom = []
        Object.keys(this.refs).map((data,key)=>{
            if(key!=0){
                if((key%2)==1){
                    siteInputCPUDom.push(this.refs[data])
                }else if((key%2)==0){
                    siteInputMEMDom.push(this.refs[data])
                }
            }
        })
        this.props.reservationContainer.setState({
            siteInputCPUDom: siteInputCPUDom,
            siteInputMEMDom: siteInputMEMDom
        })
    }

    componentWillMount(){
        let {cpu,mem} = this.props.reservationContainer.state
        if(cpu.length==0||mem.length==0){
            this.props.reservationContainer.dashboardContainer.state.selectCard.map((data,key)=>{
                this.props.reservationContainer.setCPUAndMEM(key)
            })
        }
    }

    render() {
        let startBeginDuration = this.props.reservationContainer.state.startBeginDuration
        let endBeginDuration = this.props.reservationContainer.state.endBeginDuration
        let timeStartList = <TimeList s={startBeginDuration} e={endBeginDuration} value={this.props.reservationContainer.state.startTime} handle={this.props.reservationContainer.onTimeStartChange}/>

        
        let startEndDuration = this.props.reservationContainer.state.startEndDuration
        let endEndDuration = this.props.reservationContainer.state.endEndDuration
        let timeEndList = <TimeList s={startEndDuration} e={endEndDuration} value={this.props.reservationContainer.state.endTime} handle={this.props.reservationContainer.onTimeEndChange}/>


        return (
            <section className={Style.content}>
                <div className={Style.alert}>
                    <div className={Style.text} ref='alert'>The resource are not available enough. Please try again.</div>
                </div>
                <div className={Style.step}>
                    <div className={Style.fillcircle}>1</div>
                    <div className={Style.line}></div>
                    <div className={Style.circle}>2</div>
                    <div className={Style.line}></div>
                    <div className={Style.circle}>3</div>
                </div>
                <div className={Style.steptext}>
                    <div className={Style.text}>Specify description</div>
                    <div className={Style.text}>Additional description</div>
                    <div className={Style.text}>Confirm reservation</div>
                </div>
                <div className={Style.form}>
                    <form>
                        <div className={Style.row}>
                            <div className={Style.block}>
                                <div>Begin:</div>
                                <DatePicker className={Style.inputdate} minDate={this.props.reservationContainer.timezone} dateFormat='DD - MMM - YYYY' selected={this.props.reservationContainer.state.startDate.obj} onChange={this.props.reservationContainer.onStartDateChange} />
                                <img className={Style.icon} src='img/ic_date_range.svg' />
                                {timeStartList}
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.block}>
                                <div>End:</div>
                                <DatePicker className={Style.inputdate} minDate={this.props.reservationContainer.state.minDate.obj} dateFormat='DD - MMM - YYYY' selected={this.props.reservationContainer.state.endDate.obj} onChange={this.props.reservationContainer.onEndDateChange} />
                                <img className={Style.icon} src='img/ic_date_range.svg' />
                                {timeEndList}
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.block}>
                                <div className={Style.space}>Reservation Length: {this.props.reservationContainer.state.reservationLength}</div>
                            </div>
                        </div>
                        <div className={Style.sitelist}>
                            {
                                this.props.reservationContainer.dashboardContainer.state.selectCard.map((data,key)=>{
                                    return(
                                        <div className={Style.row} key={key}>
                                            <div className={Style.block}>
                                                <div className={Style.siteblock}><span>{data.name}</span></div>
                                            </div>
                                            <div className={Style.block}>
                                                <span>CPUs :</span>
                                            </div>
                                            <div className={Style.block}>
                                                <input ref={data.name.toLowerCase().replace(' ','')+'CPU'} name={key} value={this.props.reservationContainer.state.cpu[key]} className={Style.inputradio} type='text' onChange={this.props.reservationContainer.onEnterCPU}/>
                                            </div>
                                            <div className={Style.block}>
                                                <span>Memory (GB) :</span>
                                            </div>
                                            <div className={Style.block}>
                                                <input ref={data.name.toLowerCase().replace(' ','')+'MEM'} name={key} value={this.props.reservationContainer.state.mem[key]} className={Style.inputradio} type='text' onChange={this.props.reservationContainer.onEnterMEM}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={Style.row}>
                            <div className={Style.block}>
                                <div>Image type:</div>
                                <select className={Style.inputtype} value={this.props.reservationContainer.state.imageType} onChange={this.props.reservationContainer.onImageTypeChange}>
                                    <option value='Any'>Any</option>
                                    <option value='centos7'>centos7</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={Style.btn}>
                    <button name='step1' className={Style.cancel} onClick={this.props.reservationContainer.onPreviousStep}>CANCEL</button>
                    <button name='step1' className={Style.ok} onClick={this.props.reservationContainer.onNextStep}>NEXT</button>
                </div>
            </section>
        )
    }
}