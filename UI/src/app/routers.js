import React,{Component} from 'react'
import {Router,Route,Link,hashHistory,IndexRoute} from 'react-router'
import App from './app'
import DashboardContainer from '../dashboard/dashboardContainer'

export default class Routers extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={DashboardContainer} />
                </Route>
            </Router>
        )
    }
}