import React, { Component } from 'react'
import style from './forgetPassword.scss'
import SuccessDialog from '../dashboard/dialog/successDialog'
import ErrorDialog from '../dashboard/dialog/errorDialog'
import axios from 'axios'
import {RESET_PASSWORD_ENDPOINT} from '../config/endpoints'

export default class ForgetPasswordContainer extends Component {
    constructor(props){
        super(props)
        let {id} = props.location.query
        this.state = {
            id: (id) ? id : null, 
            status: null
        }
        this.onClose = this.onClose.bind(this)
    }
    
    onClose(){
        let link = window.location.href.split('/')
        link.pop()
        window.location = link.join('/')
    }

    componentWillMount(){
        let params = new URLSearchParams()
        params.append('id',this.state.id)
        axios.post(RESET_PASSWORD_ENDPOINT, params).then((response)=>{
            let {data,status} = response
            if(status==200&&data.result){
                if(data.result=='True'){
                    this.setState({
                        status: true
                    })
                }else{
                    this.setState({
                        status: false
                    })
                }
            }
        }).catch((error)=>{
            console.log('QUERY RESET PASSWORD ERROR: '+error)
        })
    }

    render() {
        return (
            <section>
                <header id={style.titlebar}>
                    <div className={style.title}>
                        <span>PRAGMA Cloud Testbed services</span>
                    </div>
                </header>
                <section className='modal'>
                    {(this.state.status!=null) ? ((this.state.status==true) ? <SuccessDialog title='Reset password success' msg = 'Using new password to login.' onCloseDialog={this.onClose}/> : <ErrorDialog title='Reset password error' msg='Please try again.' onCloseDialog={this.onClose}/>) : null}
                </section>
            </section>
        )
    }
}