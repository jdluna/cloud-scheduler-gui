import React,{Component} from 'react'
import UserAccess from './userAccess'

export default class UserAccessContainer extends Component{
    constructor(props){
        super(props)
        this.appContainer = this.props.dashBoardContainer.props.app
        this.dashboardContainer = this.props.dashBoardContainer
    }
    onClose(){
        this.props.dashBoardContainer.onCloseModal()
    }
    render(){
        return (
            <UserAccess userAccessContainer={this}/>
        )
    }
                
}
