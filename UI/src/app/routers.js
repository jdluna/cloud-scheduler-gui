import React,{Component} from 'react'
import {Router,Route,Link,hashHistory,IndexRoute} from 'react-router'
import App from './app'
import ForgetPasswordContainer from '../forgetPassword/forgetPasswordContainer'

export default class Routers extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}></Route>
                <Route path="resetPWD" component={ForgetPasswordContainer}></Route>
            </Router>
        )
    }
}