import React, { Component } from 'react'
import Style from './history.scss'
import SuccessCard from './success'
import ErrorCard from './error'

const DELETE_CARD = (props)=>(
    <div>
        <div className={Style.title}>
            <div>Why do you cancel this reservation?</div>
            <img src='img/ic_close.svg' onClick={props.historyContainer.onClosePopup}/>
        </div>
        <div className={Style.content}>
            <div className={Style.row}>
                <div className={Style.block}>
                    <input className={Style.input} type='text' onChange={props.historyContainer.onReasonOfDeleteChange} value={props.historyContainer.state.reasonOfDelete} autoFocus />
                </div>
            </div>
            <div className={Style.row}>
                <div className={Style.block}>
                    <div className={Style.hinttext}>*The Virtual Machine will be terminated after you click the confirm buttton.</div>
                </div>
            </div>
            <div className={Style.searchbtn}>
                <button type='submit' className='btn--delete' onClick={props.historyContainer.onDeleteConfirm}>CONFIRM</button>
            </div>
        </div>
    </div>
)

export default class DeletePopup extends Component {
    render() {
        let card
        let {deleteStatus} = this.props.historyContainer.state
        if(deleteStatus=='success'){
            card = <SuccessCard onClose={this.props.historyContainer.onClosePopup}/>
        }else if(deleteStatus=='fail'){
            card = <ErrorCard onClose={this.props.historyContainer.onClosePopup}/>
        }else{
            card = <DELETE_CARD historyContainer={this.props.historyContainer}/>
        }
        return (
            <div className={Style.footer}>
                {card}
            </div>
        )
    }
}