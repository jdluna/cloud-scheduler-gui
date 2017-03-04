import React,{Component} from 'react'
import CardDescription from './cardDescription'

export default class cardDescriptionContainer extends Component {
    render(){
        return(
            <section>
                <CardDescription dashBoardContainer={this.props.dashBoardContainer}/>
            </section>
        )
    }
}