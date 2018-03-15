import React, { Component } from 'react'
import Style from './search.scss'
import DatePicker from 'react-datepicker'
import { RESOURCES,NETWORK_TYPE } from '../../config/attributes'

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

const NetworkList = (props) => {
    return(
        <section>
        <div className={Style.block}>
            <div className={Style.choose}>
                <input type='radio' name='network' value='None' checked={props.value=='None'} onChange={props.handle}/>
                <span className={Style.text}>None</span>
            </div>
        </div>
        {
           NETWORK_TYPE.map((data,key)=>{
               return(
                <div className={Style.block} key={key}>
                    <div className={Style.choose}>
                        <input type='radio' name='network' value={data.name} checked={props.value==data.name} onChange={props.handle} />
                        <span className={Style.text}>{data.name}</span>
                    </div>
                </div>
               )
           })
        }
        </section>
    )
}

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
    // if (images.length > 0 && images[0].name != 'Any') {
    //     images.unshift({
    //         name: 'Any',
    //         description: 'Any'
    //     })
    // }

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

const SiteNumberList = (props) => {
    
    return(
        <select name={props.name} onChange={props.handle} value={props.value} className={Style.inputtype}>
            <option value='Any'>Any</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
        </select>
    )
}

const RegionList = (props) => {
    return(
        <select name={props.name} onChange={props.handle} value={props.value} className={Style.inputtype}>
            <option value='Any'>Any</option>
            <option value='thailand'>Thailand</option>
            <option value='us'>United state</option>
        </select>
    )
}

export default class Search extends Component {
    constructor(){
        super()
    }
    componentDidMount() {
        this.props.searchContainer.setState({
            reservationLengthNode: {
                daysInput: this.refs.daysInput,
                hoursInput: this.refs.hoursInput,
                daysLabel: this.refs.daysLabel,
                hoursLabel: this.refs.hoursLabel
            },
            helpComponent: this.refs.helpComponent,
            helpIcon: this.refs.helpIcon,
            alertNode: this.refs.alertText,
            alertBox : this.refs.alert,
            contentBox: this.refs.contentBox
        })
        // this.refs.cpu.focus()
    }

    ifRender(condition,view){
        if(condition) return view;
        else return null;
    }


    render() {
        let startBeginDuration = this.props.searchContainer.state.startBeginDuration
        let endBeginDuration = this.props.searchContainer.state.endBeginDuration
        let timeStartList = <TimeList s={startBeginDuration} e={endBeginDuration} value={this.props.searchContainer.state.startTime} handle={this.props.searchContainer.onTimeStartChange} />

        let startEndDuration = this.props.searchContainer.state.startEndDuration
        let endEndDuration = this.props.searchContainer.state.endEndDuration
        let timeEndList = <TimeList s={startEndDuration} e={endEndDuration} value={this.props.searchContainer.state.endTime} handle={this.props.searchContainer.onTimeEndChange} />

        let images = this.props.dashboardContainer.state.images
        let imageTypeList = <ImageTypeList i={images} value={this.props.searchContainer.state.imageType} handle={this.props.searchContainer.onImageTypeChange} />
        let networkList = <NetworkList value={this.props.searchContainer.state.additionalNetwork} handle={this.props.searchContainer.onAdditionNetwordChange}/>
        return (
            <div>
                <section className='halfmodal'>

                    <div className={Style.helpContent} ref='helpComponent' >
                        <div className={Style.helpHeader}>
                            Help (?)
                            <img src='img/ic_close.svg' onClick={this.props.searchContainer.onHelpClose} />
                        </div>
                        <div className={Style.horizontalline}></div>
                        <div className={Style.helpResource}>
                            Please input number of resources. <br />
                            CPU : <b>2 - 128</b> <br />
                            Memory (GB) : <b>1 - 512</b> <br />
                        </div>
                        <div className={Style.helpResourceArrow}>
                            <img src='img/ic_arrow_right.svg' />
                        </div>

                        <div className={Style.helpDuration}>
                            Please specify begin and end date time. <br />
                            <br />- The first option, <b>'From begin to end'</b>, is for searching resources which are <b>available from begin to end date time. </b><br />
                            <br />- The second option <b>(..days ..hours)</b> is for searching resources which are available for the specified reservation length
                            <b> on some period from begin to end date time</b>.
                        </div>
                        
                        <div className={Style.helpDurationArrow}>
                            <img src='img/ic_arrow_right.svg' />
                        </div>
                        <div className={Style.helpOthers}>
                            Please specify other criterias. <br /><br />
                            - <b> Additional network : </b> <br />
                            ENT = ENT-enabled site <br />
                            IPOP = IPOP-enabled site <br /><br />
                            - <b> Image type : </b> available image for VM <br />
                        </div>
                        <div className={Style.helpOthersArrow}>
                            <img src='img/ic_arrow_right.svg' />
                        </div>
                    </div>
                    <section className={Style.panel}>
                        <header>
                            <div>Search by Criteria</div>
                            <img src='img/ic_close.svg' onClick={this.props.searchContainer.onClose} />
                        </header>
                        <div className={Style.alert} ref='alert'>
                            <div className={Style.text} ref='alertText'>Error.</div>
                        </div>
                        <section className={Style.content} ref='contentBox'>
                            
                            <div className={Style.searchinput}>
                                <form>
                                    <div className={Style.buttonBox}>
                                        <button className={(this.props.searchContainer.state.mode=='SINGLE')?Style.singleBtnLeftActive:Style.singleBtnLeft} id='SINGLE' onClick={this.props.searchContainer.changeMode} type="button">Single</button>
                                        <button className={(this.props.searchContainer.state.mode=='MULTI')?Style.singleBtnRightActive:Style.singleBtnRight} id='MULTI' onClick={this.props.searchContainer.changeMode} type="button">Multi</button>
                                    </div>
                                    {this.ifRender(this.props.searchContainer.state.mode=='SINGLE',
                                        <div>
                                        <div className={Style.divideblock}>
                                            <div>Resources</div>
                                            <div className={Style.horizontalline}></div>
                                        </div>
                                        <div className={Style.row}>
                                            {
                                                RESOURCES.map((data,key)=>{
                                                    let name = data.name
                                                    if(data.unit!=null){
                                                        name = name+' ('+data.unit+')'
                                                    }
                                                    return(
                                                        <div className={Style.block+' '+Style.bottomspace} key={key}>
                                                            <div>{name}:</div>
                                                            <input className={Style.input} type='text' name={key} onChange={this.props.searchContainer.onResourceChange} value={this.props.searchContainer.state.resource[key]} autoFocus={(key==0)}/>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className={Style.divideblock2}>
                                            <div>Duration</div>
                                            <div className={Style.horizontalline}></div>
                                        </div>
                                        <div className={Style.row}>
                                            <div className={Style.block}>
                                                <div>Begin:</div>
                                                <label>
                                                    <DatePicker className={Style.inputdate} minDate={this.props.searchContainer.timezone} dateFormat='DD - MMM - YYYY' selected={this.props.searchContainer.state.startDate.obj} onChange={this.props.searchContainer.onStartDateChange} />
                                                    <img className={Style.icon} src='img/ic_date_range.svg' />
                                                </label>
                                                {timeStartList}
                                            </div>
                                        </div>
                                        <div className={Style.row}>
                                            <div className={Style.block}>
                                                <div>End:</div>
                                                <label>
                                                    <DatePicker className={Style.inputdate} minDate={this.props.searchContainer.state.minDate.obj} dateFormat='DD - MMM - YYYY' selected={this.props.searchContainer.state.endDate.obj} onChange={this.props.searchContainer.onEndDateChange} />
                                                    <img className={Style.icon} src='img/ic_date_range.svg' />
                                                </label>
                                                {timeEndList}
                                            </div>
                                        </div>
                                        <div className={Style.row}>
                                            <div className={Style.block}>
                                                <div className={Style.reservespace}>Reservation length:</div>
                                                <div className={Style.choose} onClick={() => this.props.searchContainer.onReserveLengthChange('all')}>
                                                    <input type='radio' name='type' checked={this.props.searchContainer.state.reservationLength.value == 'all'} onChange={() => this.props.searchContainer.onReserveLengthChange('all')} />
                                                    <span className={Style.text}>From begin to end</span>
                                                </div>
                                            </div>
                                            <div className={Style.block}>
                                                <div className={Style.choose} onClick={() => this.props.searchContainer.onReserveLengthChange('time')}>
                                                    <input className={Style.marginradio} type='radio' name='type' checked={this.props.searchContainer.state.reservationLength.value == 'time'} onChange={() => this.props.searchContainer.onReserveLengthChange('time')} />
                                                    <div className={Style.block}>
                                                        <input ref='daysInput' className={Style.inputradio} type='text' name='days' disabled={this.props.searchContainer.state.reservationLength.value == 'all'} onChange={this.props.searchContainer.onReserveLengthDataChange} value={this.props.searchContainer.state.reservationLength.days} />
                                                        <span ref='daysLabel' className={Style.unittext}> days</span>
                                                    </div>
                                                    <div className={Style.block}>
                                                        <input ref='hoursInput' className={Style.inputradio} type='text' name='hours' disabled={this.props.searchContainer.state.reservationLength.value == 'all'} onChange={this.props.searchContainer.onReserveLengthDataChange} value={this.props.searchContainer.state.reservationLength.hours} />
                                                        <span ref='hoursLabel' className={Style.unittext}> hours</span>
                                                    </div>
                                                </div>
                                                <div className={Style.hinttext}>* Minimum length : {this.props.searchContainer.state.maxLengthDate} days {this.props.searchContainer.state.maxLengthHour} hours</div>
                                            </div>
                                        </div>
                                        <div className={Style.divideblock2}>
                                            <div>Others</div>
                                            <div className={Style.horizontalline}></div>
                                        </div>
                                        <div className={Style.row}>
                                            <div className={Style.block}>
                                                <div>Additional Network:</div>
                                                {networkList}
                                            </div>
                                        </div>
                                        <div className={Style.row}>
                                            <div className={Style.block}>
                                                <div>Image type:</div>
                                                {imageTypeList}
                                            </div>
                                        </div>
                                        {/* <div className={Style.row}>
                                            <div className={Style.block}>
                                                <div>Region:</div>
                                                <RegionList value={this.props.searchContainer.state.region} handle={this.props.searchContainer.onRegionChange}/>
                                            </div>
                                        </div> */}
                                        <div className={Style.footerwrap}>
                                            <div className={Style.helpbtn}>
                                                <img src='img/ic_help_outline_white.svg' onClick={this.props.searchContainer.helpSearch} onMouseOver={this.props.searchContainer.helpIconOver} onMouseOut={this.props.searchContainer.helpIconOut} ref='helpIcon' />
                                            </div>
                                            <div className={Style.searchbtn}>
                                                <button type='submit' className='btn--info' onClick={this.props.searchContainer.onSearchSubmit}>SEARCH</button>
                                            </div>
                                        </div>  
                                        </div>
                                    )}
                                    {this.ifRender(this.props.searchContainer.state.mode=='MULTI',
                                        <div>
                                            <div className={Style.divideblock}>
                                                <div>Resources</div>
                                                <div className={Style.horizontalline}></div>
                                            </div>
                                            <div className={Style.row}>
                                                <div className={Style.block+' '+Style.bottomspace}>
                                                    <div>Number of sites:</div>
                                                    <SiteNumberList value={this.props.searchContainer.state.numSite} handle={this.props.searchContainer.onSiteNumChange}/>
                                                </div>
                                                {
                                                    RESOURCES.map((data,key)=>{
                                                        let name = data.name
                                                        if(data.unit!=null){
                                                            name = name+' ('+data.unit+')'
                                                        }
                                                        return(
                                                            <div className={Style.block+' '+Style.bottomspace} key={key}>
                                                                <div>{name}:</div>
                                                                <input className={Style.input} type='text' name={key} onChange={this.props.searchContainer.onResourceChange} value={this.props.searchContainer.state.resource[key]} autoFocus={(key==0)}/>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className={Style.hinttext}>*Resources are distributed evenly among sites unless specified otherwise.</div>
                                            </div>
                                            <div className={Style.divideblock2}>
                                                <div>Duration</div>
                                                <div className={Style.horizontalline}></div>
                                            </div>
                                            <div className={Style.row}>
                                                <div className={Style.block}>
                                                    <div>Begin:</div>
                                                    <label>
                                                        <DatePicker className={Style.inputdate} minDate={this.props.searchContainer.timezone} dateFormat='DD - MMM - YYYY' selected={this.props.searchContainer.state.startDate.obj} onChange={this.props.searchContainer.onStartDateChange} />
                                                        <img className={Style.icon} src='img/ic_date_range.svg' />
                                                    </label>
                                                    {timeStartList}
                                                </div>
                                            </div>
                                            <div className={Style.row}>
                                                <div className={Style.block}>
                                                    <div>End:</div>
                                                    <label>
                                                        <DatePicker className={Style.inputdate} minDate={this.props.searchContainer.state.minDate.obj} dateFormat='DD - MMM - YYYY' selected={this.props.searchContainer.state.endDate.obj} onChange={this.props.searchContainer.onEndDateChange} />
                                                        <img className={Style.icon} src='img/ic_date_range.svg' />
                                                    </label>
                                                    {timeEndList}
                                                </div>
                                            </div>
                                            <div className={Style.row}>
                                                <div className={Style.block}>
                                                    <div className={Style.reservespace}>Reservation length:</div>
                                                    <div className={Style.choose} onClick={() => this.props.searchContainer.onReserveLengthChange('all')}>
                                                        <input type='radio' name='type' checked={this.props.searchContainer.state.reservationLength.value == 'all'} onChange={() => this.props.searchContainer.onReserveLengthChange('all')} />
                                                        <span className={Style.text}>From begin to end</span>
                                                    </div>
                                                </div>
                                                <div className={Style.block}>
                                                    <div className={Style.choose} onClick={() => this.props.searchContainer.onReserveLengthChange('time')}>
                                                        <input className={Style.marginradio} type='radio' name='type' checked={this.props.searchContainer.state.reservationLength.value == 'time'} onChange={() => this.props.searchContainer.onReserveLengthChange('time')} />
                                                        <div className={Style.block}>
                                                            <input ref='daysInput' className={Style.inputradio} type='text' name='days' disabled={this.props.searchContainer.state.reservationLength.value == 'all'} onChange={this.props.searchContainer.onReserveLengthDataChange} value={this.props.searchContainer.state.reservationLength.days} />
                                                            <span ref='daysLabel' className={Style.unittext}> days</span>
                                                        </div>
                                                        <div className={Style.block}>
                                                            <input ref='hoursInput' className={Style.inputradio} type='text' name='hours' disabled={this.props.searchContainer.state.reservationLength.value == 'all'} onChange={this.props.searchContainer.onReserveLengthDataChange} value={this.props.searchContainer.state.reservationLength.hours} />
                                                            <span ref='hoursLabel' className={Style.unittext}> hours</span>
                                                        </div>
                                                    </div>
                                                    <div className={Style.hinttext}>* Minimum length : {this.props.searchContainer.state.maxLengthDate} days {this.props.searchContainer.state.maxLengthHour} hours</div>
                                                </div>
                                            </div>
                                            <div className={Style.divideblock2}>
                                                <div>Others</div>
                                                <div className={Style.horizontalline}></div>
                                            </div>
                                            <div className={Style.row}>
                                                <div className={Style.block}>
                                                    <div>Additional Network:</div>
                                                    {networkList}
                                                </div>
                                            </div>
                                            <div className={Style.row}>
                                                <div className={Style.block}>
                                                    <div>Image type:</div>
                                                    {imageTypeList}
                                                </div>
                                            </div>
                                            {/* <div className={Style.row}>
                                                <div className={Style.block}>
                                                    <div>Region:</div>
                                                    <RegionList value={this.props.searchContainer.state.region} handle={this.props.searchContainer.onRegionChange}/>
                                                </div>
                                            </div> */}
                                            <div className={Style.footerwrap}>
                                                <div className={Style.helpbtn}>
                                                    <img src='img/ic_help_outline_white.svg' onClick={this.props.searchContainer.helpSearch} onMouseOver={this.props.searchContainer.helpIconOver} onMouseOut={this.props.searchContainer.helpIconOut} ref='helpIcon' />
                                                </div>
                                                <div className={Style.searchbtn}>
                                                    <button type='submit' className='btn--info' onClick={this.props.searchContainer.onSearchSubmit}>SEARCH</button>
                                                </div>
                                            </div>      
                                        </div>
                                    )}
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