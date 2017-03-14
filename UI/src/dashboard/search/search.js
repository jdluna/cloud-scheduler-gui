import React, { Component } from 'react'
import Style from './search.scss'
import DatePicker from 'react-datepicker'
import NotFoundTable from './notFoundTable'
import FoundTable from './foundTable'

const TimeItem = () => (
    <select className={Style.inputtime}>
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

export default class Search extends Component {
    render() {
        return (
            <section className='halfmodal'>
                <section className={Style.panel}>
                    <header>
                        <div>Search Resources</div>
                        <img src='img/ic_close.svg' onClick={this.props.searchContainer.onClose} />
                    </header>
                    <section className={Style.content}>
                        <div className={Style.searchinput}>
                            <div className={Style.row}>
                                <div className={Style.block}>
                                    <div>CPU:</div>
                                    <input className={Style.input} type='text' />
                                </div>
                                <div className={Style.block}>
                                    <div>Memory (GB):</div>
                                    <input className={Style.input} type='text' />
                                </div>
                            </div>
                            <div className={Style.row}>
                                <div className={Style.block}>
                                    <div>Begin:</div>
                                    <DatePicker className={Style.inputdate} dateFormat='DD - MMM - YYYY' selected={this.props.searchContainer.state.startDate} onChange={this.props.searchContainer.onStartDateChange} />
                                    <img className={Style.icon} src='img/ic_date_range.svg'/>
                                    <TimeItem/>
                                </div>
                            </div>
                            <div className={Style.row}>
                                <div className={Style.block}>
                                    <div>End:</div>
                                    <DatePicker className={Style.inputdate} dateFormat='DD - MMM - YYYY' selected={this.props.searchContainer.state.startDate} onChange={this.props.searchContainer.onStartDateChange} />
                                    <img className={Style.icon} src='img/ic_date_range.svg'/>
                                    <TimeItem/>
                                </div>
                            </div>
                            <div className={Style.row}>
                                <div className={Style.block}>
                                    <div className={Style.reservespace}>Reservation length:</div>
                                    <div className={Style.choose}>
                                        <input type='radio' name='type'/>
                                        <span className={Style.text}>All period time</span>
                                    </div>
                                </div>
                                <div className={Style.block}>
                                    <div className={Style.choose}>
                                        <input className={Style.marginradio} type='radio' name='type'/>
                                        <div className={Style.block}>
                                            <input className={Style.inputradio} type='text' />
                                            <span className={Style.unittext}> days</span>
                                        </div>
                                        <div className={Style.block}>
                                            <input className={Style.inputradio} type='text' />
                                            <span className={Style.unittext}> hours</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={Style.row}>
                                <div className={Style.block}>
                                    <div>Additional Network:</div>
                                    <div className={Style.block}>
                                        <div className={Style.choose}>
                                            <input type='radio' name='network'/>
                                            <span className={Style.text}>None</span>
                                        </div>
                                    </div>
                                    <div className={Style.block}>
                                        <div className={Style.choose}>
                                            <input type='radio' name='network'/>
                                            <span className={Style.text}>ENT</span>
                                        </div>
                                    </div>
                                    <div className={Style.block}>
                                        <div className={Style.choose}>
                                            <input type='radio' name='network'/>
                                            <span className={Style.text}>IPOP</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={Style.row}>
                                <div className={Style.block}>
                                    <div>Image type:</div>
                                    <select className={Style.inputtime}>
                                        <option value='Any'>Any</option>
                                    </select>
                                </div>
                            </div>
                            <div className={Style.searchbtn}>
                                <button className='btn--info'>SEARCH</button>
                            </div>
                        </div>
                        <div className={Style.searchresult}>
                            <FoundTable/>
                        </div>
                    </section>
                </section>
            </section>
        )
    }
}