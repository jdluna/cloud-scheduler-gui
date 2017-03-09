import React,{Component} from 'react'
import Header from './header'

export default class HeaderContainer extends Component {
    render() {
        return (
            <Header app={this.props.app}/>
        )
    }
}