import React,{Component} from 'react'
import HeaderContainer from '../header/headerContainer'

export default class App extends Component {
    render() {
        return (
            <section>
                <HeaderContainer/>
                {this.props.children}
            </section>
        )
    }
}