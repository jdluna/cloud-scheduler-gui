import React,{Component} from 'react'
import Style from './login.scss'
import Login from './login'
import SuccessDialog from '../dialog/successDialog'
import ErrorDialog from '../dialog/errorDialog'
import axios from 'axios'
import {AUTHEN_ENDPOINT,FORGET_PASSWORD_ENDPOINT} from '../../config/endpoints'
import ForgetPassword from './forgetPassword'

export default class LoginContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            email: '',
            forgetPassword: '',
            forgetConfirmPassword: '',
            result: false,
            card: 0
        }

        this.onSignIn = this.onSignIn.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onUsernameChange = this.onUsernameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onForgetPassword = this.onForgetPassword.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
        this.onForgetFormChange = this.onForgetFormChange.bind(this)
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

    onForgetFormChange(event){
        this.setState({
            [event.target.name]: event.target.value
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
                    this.state.alertNode.innerHTML = ''
                    this.state.alertNode.style.display = 'none'
                 }else{
                    this.state.alertNode.innerHTML = 'Incorrect password. Please try again.'
                    this.state.alertNode.style.display = 'block'
                }
             }
         }).catch(error=>{
             console.log(error)
         })
    }

    onCancel(event){
        event.preventDefault()
        this.props.app.authentication()
    }

    onForgetPassword(){
        this.setState({
            card: 1
        })
    }

    resetPassword(event){
        event.preventDefault()
        let {email,forgetPassword,forgetConfirmPassword} = this.state
        if(forgetPassword==forgetConfirmPassword&&forgetPassword!=''&&forgetConfirmPassword!=''){
            var params = new URLSearchParams()
            params.append('email', email)
            params.append('password', forgetPassword)
            axios.post(FORGET_PASSWORD_ENDPOINT, params).then((response)=>{
                let {data, status} = response
                if(status==200&&data.result){
                    if(data.result=='True'){
                        this.setState({
                            card: 2
                        })
                    }else{
                        this.setState({
                            card: 3
                        })
                    }
                }
            }).catch((error)=>{
                console.error('RESET PASSWORD ERROR: '+error)
            })
        }else{
            this.state.forgetAlertNode.style.display = 'block'
            this.state.forgetPwdNode.style.border = '1px solid red'
            this.state.forgetConfirmPwdNode.style.border = '1px solid red'
        }
    }

    render() {
        let dialog
        switch(this.state.card){
            case 0 : dialog = <Login loginContainer={this}/>;break;
            case 1 : dialog = <ForgetPassword loginContainer={this}/>;break;
            case 2 : dialog = <SuccessDialog title='Reset password success' msg='Please check your email to confirm within 30 mins.' onCloseDialog={this.onCancel}/>;break;
            case 3 : dialog = <ErrorDialog title='Reset password error' msg='Please try again.' onCloseDialog={this.onCancel}/>;break;
        }

        return (
            <section className={'modal '+Style.loginModal}>
                {dialog}
            </section>
        )
    }
}