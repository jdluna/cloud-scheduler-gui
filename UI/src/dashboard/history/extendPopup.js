import React, { Component } from 'react'
import Style from './history.scss'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import SuccessCard from './success'
import ErrorCard from './error'

const TimeItem = (props) => (
    <select className={Style.inputtime} value={props.value} onChange={props.handle}>
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

const EXTEND_CARD = (props) => (
    <div>
        <div className={Style.title}>
            <div>Extend this reservation to end at :</div>
            <img src='img/ic_close.svg' onClick={props.historyContainer.onClosePopup}/>
        </div>
        <div className={Style.content}>
            <div className={Style.row}>
                <div className={Style.block}>
                    <DatePicker className={Style.inputdate} minDate={props.historyContainer.state.extendDate.obj} dateFormat='DD - MMM - YYYY' selected={props.historyContainer.state.extendDate.obj} onChange={props.historyContainer.onExtendDateChange} />
                    <img className={Style.icon} src='img/ic_date_range.svg' />
                    <TimeItem value={props.historyContainer.state.extendTime} handle={props.historyContainer.onExtendTimeChange} />
                </div>
            </div>
            <div className={Style.row}>
                <div className={Style.block}></div>
            </div>
            <div className={Style.searchbtn}>
                <button type='submit' className='btn' onClick={props.historyContainer.onExtendConfirm}>CONFIRM</button>
            </div>
        </div>
    </div>
)

export default class ExtendPopup extends Component {
    render() {
        let card
        let {extendStatus} = this.props.historyContainer.state
        if(extendStatus=='success'){
            card = <SuccessCard onClose={this.props.historyContainer.onClosePopup}/>
        }else if(extendStatus=='fail'){
            card = <ErrorCard onClose={this.props.historyContainer.onClosePopup}/>
        }else{
            card = <EXTEND_CARD historyContainer={this.props.historyContainer}/>
        }
        return (
            <div className={Style.footer}>
                {card}
            </div>
        )
    }
}