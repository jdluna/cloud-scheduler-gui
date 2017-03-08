import React,{Component} from 'react'
import Settings from './settings'

export default class SettingsContainer extends Component {
    render() {
        return (
            <section>
                <Settings dashBoardContainer={this.props.dashBoardContainer}/>
            </section>
        )
    }
}