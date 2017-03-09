import React,{Component} from 'react'
import {Router,Route,Link,hashHistory,IndexRoute} from 'react-router'
import App from './app'

export default class Routers extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}></Route>
            </Router>
        )
    }
}