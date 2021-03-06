import React, { Component } from 'react'
import Style from './reservation.scss'
import DatePicker from 'react-datepicker'
import ReactDOM from 'react-dom'
import { RESOURCES } from '../../config/attributes'

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
    for (let i = start; i <= end; i++) {
        let time = ((i) >= 10) ? (i) + ':00' : '0' + (i) + ':00'
        options.push(time)
    }
    return (
        <select className={Style.inputtime} value={props.value} onChange={props.handle}>
            {
                options.map((data, key) => {
                    let d = data.replace(':', ' : ')
                    return (
                        <option key={key} value={data}> {d} </option>
                    )
                })
            }

        </select>
    )
}

const ImageTypeList = (props) => {

    let images = props.i

    if (images[0].name == 'Any') {
        images.shift({
            name: 'Any',
            description: 'Any'
        })
    }

    return (
        <select className={Style.inputtype} value={props.value} onChange={props.handle}>
            {
                images.map((data, key) => {
                    let d = data.name
                    return (
                        <option key={key} value={d}> {d} </option>
                    )
                })
            }

        </select>
    )
}

export default class Step1 extends Component {
    componentDidMount() {
        this.props.reservationContainer.setState({
            alertNode: this.refs.alert
        })

        let siteInputDom = []
        this.props.reservationContainer.sites.map((data,key)=>{
            let dom = []
            RESOURCES.map((dataSub,keySub)=>{
                let name = key+'-'+keySub
                dom.push(this.refs[name])
            })
            siteInputDom.push(dom)
        })
        this.props.reservationContainer.setState({
            siteInputDom: siteInputDom
        })
    }

    render() {
        let startBeginDuration = this.props.reservationContainer.state.startBeginDuration
        let endBeginDuration = this.props.reservationContainer.state.endBeginDuration
        let timeStartList = <TimeList s={startBeginDuration} e={endBeginDuration} value={this.props.reservationContainer.state.startTime} handle={this.props.reservationContainer.onTimeStartChange} />


        let startEndDuration = this.props.reservationContainer.state.startEndDuration
        let endEndDuration = this.props.reservationContainer.state.endEndDuration
        let timeEndList = <TimeList s={startEndDuration} e={endEndDuration} value={this.props.reservationContainer.state.endTime} handle={this.props.reservationContainer.onTimeEndChange} />


        let images = this.props.reservationContainer.state.dashboardContainer.state.images
        let imageTypeList = <ImageTypeList i={images} value={this.props.reservationContainer.state.imageType} handle={this.props.reservationContainer.onImageTypeChange} />

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
                                <label>
                                    <DatePicker className={Style.inputdate} minDate={this.props.reservationContainer.timezone} dateFormat='DD - MMM - YYYY' selected={this.props.reservationContainer.state.startDate.obj} onChange={this.props.reservationContainer.onStartDateChange} />
                                    <img className={Style.icon} src='img/ic_date_range.svg' />
                                </label>
                                {timeStartList}
                            </div>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.block}>
                                <div>End:</div>
                                <label>
                                    <DatePicker className={Style.inputdate} minDate={this.props.reservationContainer.state.minDate.obj} dateFormat='DD - MMM - YYYY' selected={this.props.reservationContainer.state.endDate.obj} onChange={this.props.reservationContainer.onEndDateChange} />
                                    <img className={Style.icon} src='img/ic_date_range.svg' />
                                </label>
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
                                        <div className={Style.card} key={key}>
                                            <div className={Style.header}>{data.name}</div>
                                            <div className={Style.content}>
                                                {
                                                    RESOURCES.map((dataSub,keySub)=>{
                                                        let unit = (dataSub.unit!=null) ? '('+dataSub.unit+')' : ''
                                                        return(
                                                            <div className={Style.rowcard} key={keySub}>
                                                                <span className={Style.space}>{dataSub.name+' '+unit}</span>
                                                                <span>: <input className={Style.inputradio} type='text' value={this.props.reservationContainer.state.resource[key][keySub]} ref={key+'-'+keySub} name={key+'-'+keySub} onChange={this.props.reservationContainer.onEnterResource}/></span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>  
                                    )
                                })
                            }
                        </div>
                        <div className={Style.row}>
                            <div className={Style.block}>
                                <div>Image type:</div>
                                {imageTypeList}
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