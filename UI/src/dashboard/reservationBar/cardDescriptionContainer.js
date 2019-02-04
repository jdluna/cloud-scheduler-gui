import React,{Component} from 'react'
import CardDescription from './cardDescription'

export default class cardDescriptionContainer extends Component {
   render(){
        return(
            <section>
                <CardDescription cardDescriptionContainer = {this}dashBoardContainer={this.props.dashBoardContainer}app={this.props.app}/>
            </section>
        )
    }
}
