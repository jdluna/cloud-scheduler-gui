import React,{Component} from 'react'
import Search from './search'
import axios from 'axios'
import moment from 'moment'

export default class SearchContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            startDate: moment(),
            endDate: moment()
        }
        this.onClose = this.onClose.bind(this)
        this.onStartDateChange = this.onStartDateChange.bind(this)
        this.onEndDateChange = this.onEndDateChange.bind(this)
    }
    onClose(){
        this.props.dashBoardContainer.onCloseModal()
    }
    onStartDateChange(date){
        this.setState({
            startDate: date
        })
    }
    onEndDateChange(date){
        this.setState({
            endDate: date
        })
    }
    render() {
        return (
            <section>
                <Search searchContainer={this}/>
            </section>
        )
    }
}