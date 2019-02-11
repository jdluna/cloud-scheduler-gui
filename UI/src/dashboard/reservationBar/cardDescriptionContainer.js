import React,{Component} from 'react'
import CardDescription from './cardDescription'

export default class cardDescriptionContainer extends Component {
   componentWillMount(){
       this.setAdminStatus()
   }
   constructor(props){
        super(props)
        this.state = {
            adminStatus : true
        }
   }
   setAdminStatus(){
       let admin = this.props.app.state.authen.data
       if(this.props.app.state.authen.isLogedIn){
           if(admin.status == 'admin' || admin.username == this.props.dashBoardContainer.state.cardDetail.data.admin){
               this.setState({
                    adminStatus : false
                    })
           }
       }else{
               this.setState({
                    adminStatus : true
                    })
       }
   }
    modifyResourceInfo(){
        this.props.dashBoardContainer.modifyResourceInfo()
    }
    render(){
        return(
            <section>
                <CardDescription cardDescriptionContainer = {this}dashBoardContainer={this.props.dashBoardContainer}app={this.props.app}/>
            </section>
        )
    }
}
