import React, { Component } from 'react'
import Style from './search.scss'
import DatePicker from 'react-datepicker'

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

const ImageTypeList = (props) => {
   
    let images = props.i
    if(images.length > 0 && images[0].name != 'Any'){
        images.unshift({
            name: 'Any',
            description: 'Any'
        })
    }

    return(
        <select className={Style.inputtype} value={props.value} onChange={props.handle}>
            {
                images.map((data,key)=>{
                    let d = data.name
                    return(
                        <option key={key} value={d}> {d} </option>
                    )
                })
            }
                    
        </select>
    )
}

export default class Search extends Component {
    componentDidMount(){
        this.props.searchContainer.setState({
            reservationLengthNode:{
                daysInput: this.refs.daysInput,
                hoursInput: this.refs.hoursInput,
                daysLabel: this.refs.daysLabel,
                hoursLabel: this.refs.hoursLabel
            }
        })
        this.refs.cpu.focus()
    }

    render() {
        let startBeginDuration = this.props.searchContainer.state.startBeginDuration
        let endBeginDuration = this.props.searchContainer.state.endBeginDuration
        let timeStartList = <TimeList s={startBeginDuration} e={endBeginDuration} value={this.props.searchContainer.state.startTime} handle={this.props.searchContainer.onTimeStartChange}/>
        
        let startEndDuration = this.props.searchContainer.state.startEndDuration
        let endEndDuration = this.props.searchContainer.state.endEndDuration
        let timeEndList = <TimeList s={startEndDuration} e={endEndDuration} value={this.props.searchContainer.state.endTime} handle={this.props.searchContainer.onTimeEndChange}/>


        let images = this.props.dashboardContainer.state.images
        let imageTypeList = <ImageTypeList i={images} value={this.props.searchContainer.state.imageType} handle={this.props.searchContainer.onImageTypeChange}/>

        return (
            <div>
            <section className='halfmodal'>
                <section className={Style.panel}>
                    <header>
                        <div>Search by Criteria</div>
                        <img src='img/ic_close.svg' onClick={this.props.searchContainer.onClose} />
                    </header>
                    <section className={Style.content}>
                        <div className={Style.searchinput}>
                            <form>
                                <div className={Style.divideblock}>
                                    <div>Resources</div>
                                    <div className={Style.horizontalline}></div>
                                </div>
                                <div className={Style.row}>
                                    <div className={Style.block}>
                                        <div>CPU:</div>
                                        <input ref='cpu' className={Style.input} type='text' name='cpu' onChange={this.props.searchContainer.onResourceChange} value={this.props.searchContainer.state.cpu} autoFocus/>
                                    </div>
                                    <div className={Style.block}>
                                        <div>Memory (GB):</div>
                                        <input className={Style.input} type='text' name='mem' onChange={this.props.searchContainer.onResourceChange} value={this.props.searchContainer.state.mem}/>
                                    </div>
                                </div>
                                <div className={Style.divideblock2}>
                                    <div>Duration</div>
                                    <div className={Style.horizontalline}></div>
                                </div>
                                <div className={Style.row}>
                                    <div className={Style.block}>
                                        <div>Begin:</div>
                                        <DatePicker className={Style.inputdate} minDate={this.props.searchContainer.timezone} dateFormat='DD - MMM - YYYY' selected={this.props.searchContainer.state.startDate.obj} onChange={this.props.searchContainer.onStartDateChange} />
                                        <img className={Style.icon} src='img/ic_date_range.svg'/>
                                        {timeStartList}
                                        </div>
                                </div>
                                <div className={Style.row}>
                                    <div className={Style.block}>
                                        <div>End:</div>
                                        <DatePicker className={Style.inputdate} minDate={this.props.searchContainer.state.minDate.obj} dateFormat='DD - MMM - YYYY' selected={this.props.searchContainer.state.endDate.obj} onChange={this.props.searchContainer.onEndDateChange} />
                                        <img className={Style.icon} src='img/ic_date_range.svg'/>
                                        {timeEndList}
                                    </div>
                                </div>
                                <div className={Style.row}>
                                    <div className={Style.block}>
                                        <div className={Style.reservespace}>Reservation length:</div>
                                        <div className={Style.choose} onClick={()=>this.props.searchContainer.onReserveLengthChange('all')}>
                                            <input type='radio' name='type' checked={this.props.searchContainer.state.reservationLength.value=='all'} onChange={()=>this.props.searchContainer.onReserveLengthChange('all')}/>
                                            <span className={Style.text}>From begin to end</span>
                                        </div>
                                    </div>
                                    <div className={Style.block}>
                                        <div className={Style.choose} onClick={()=>this.props.searchContainer.onReserveLengthChange('time')}>
                                            <input className={Style.marginradio} type='radio' name='type' checked={this.props.searchContainer.state.reservationLength.value=='time'} onChange={()=>this.props.searchContainer.onReserveLengthChange('time')}/>
                                            <div className={Style.block}>
                                                <input ref='daysInput' className={Style.inputradio} type='text' name='days' disabled={this.props.searchContainer.state.reservationLength.value=='all'} onChange={this.props.searchContainer.onReserveLengthDataChange} value={this.props.searchContainer.state.reservationLength.days}/>
                                                <span ref='daysLabel' className={Style.unittext}> days</span>
                                            </div>
                                            <div className={Style.block}>
                                                <input ref='hoursInput' className={Style.inputradio} type='text' name='hours' disabled={this.props.searchContainer.state.reservationLength.value=='all'} onChange={this.props.searchContainer.onReserveLengthDataChange} value={this.props.searchContainer.state.reservationLength.hours}/>
                                                <span ref='hoursLabel' className={Style.unittext}> hours</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={Style.divideblock2}>
                                    <div>Others</div>
                                    <div className={Style.horizontalline}></div>
                                </div>
                                <div className={Style.row}>
                                    <div className={Style.block}>
                                        <div>Additional Network:</div>
                                        <div className={Style.block}>
                                            <div className={Style.choose}>
                                                <input type='radio' name='network' value='None' checked={this.props.searchContainer.state.additionalNetwork=='None'} onChange={this.props.searchContainer.onAdditionNetwordChange}/>
                                                <span className={Style.text}>None</span>
                                            </div>
                                        </div>
                                        <div className={Style.block}>
                                            <div className={Style.choose}>
                                                <input type='radio' name='network' value='ENT' checked={this.props.searchContainer.state.additionalNetwork=='ENT'} onChange={this.props.searchContainer.onAdditionNetwordChange}/>
                                                <span className={Style.text}>ENT</span>
                                            </div>
                                        </div>
                                        <div className={Style.block}>
                                            <div className={Style.choose}>
                                                <input type='radio' name='network' value='IPOP' checked={this.props.searchContainer.state.additionalNetwork=='IPOP'} onChange={this.props.searchContainer.onAdditionNetwordChange}/>
                                                <span className={Style.text}>IPOP</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={Style.row}>
                                    <div className={Style.block}>
                                        <div>Image type:</div>
                                        {imageTypeList}
                                    </div>
                                </div>
                                <div className={Style.searchbtn}>
                                    <button type='submit' className='btn--info' onClick={this.props.searchContainer.onSearchSubmit}>SEARCH</button>
                                </div>
                            </form>
                        </div>
                        <div className={Style.searchresult}>
                            {this.props.searchContainer.state.resultTable}
                        </div>
                    </section>
                </section>
            </section>
            </div>
        )
    }
}