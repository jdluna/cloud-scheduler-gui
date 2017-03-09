import React,{Component} from 'react'
import Login from './login'
import axios from 'axios'
import {AUTHEN_ENDPOINT} from '../../config/endpoints'

export default class LoginContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.onSignIn = this.onSignIn.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onUsernameChange = this.onUsernameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
    }

    onUsernameChange(event){
        this.setState({
            username: event.target.value
        })
    }

    onPasswordChange(event){
         this.setState({
            password: event.target.value
        })
    }

    onSignIn(event){
         event.preventDefault()
         let options = {
            params:{
                username: this.state.username,
                password: this.state.password
            }
         }
         axios.get(AUTHEN_ENDPOINT,options).then(response=>{
             let {data,status} = response
             if(status==200){
                 if(data.session_id){
                    this.props.app.onLogin(data)
                 }
             }
         }).catch(error=>{
             console.log(error)
         })
         this.setState({
            username: '',
            password: ''
        })
    }

    onCancel(event){
        event.preventDefault()
        this.props.app.authentication()
    }

    render() {
        return (
            <section>
                <Login loginContainer={this}/>
            </section>
        )
    }
}