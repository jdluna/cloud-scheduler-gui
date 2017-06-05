import React, { Component } from 'react'
import Style from './login.scss'

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props)
        this.handle = this.props.loginContainer
    }

    componentDidMount(){
        this.props.loginContainer.setState({
            forgetPwdNode: this.refs.forgetPassword,
            forgetConfirmPwdNode: this.refs.forgetConfirmPassword,
            forgetAlertNode: this.refs.forgetAlert
        })
    }

    render() {
        return (
            <section className={Style.panel}>
                <header><div>Forget password</div></header>
                <section>
                    <div className={Style.headerspace}>
                        <div className={Style.text} ref='forgetAlert'>Password and Confirm password don't match.</div>
                    </div>
                    <div className={Style.content}>
                        <form>
                            <div className={Style.user}>
                                <img className={Style.icon} src='img/ic_email.svg' />
                                <input className={Style.input} type='text' name='email' placeholder='Email' value={this.handle.state.email} onChange={this.handle.onForgetFormChange} autoFocus /></div>
                            <div className={Style.pass}>
                                <img className={Style.icon} src='img/ic_lock.svg' />
                                <input className={Style.input} type='password' name='forgetPassword' ref='forgetPassword' placeholder='Password' value={this.handle.state.forgetPassword} onChange={this.handle.onForgetFormChange} /></div>
                            <div className={Style.pass}>
                                <img className={Style.icon} src='img/ic_lock.svg' />
                                <input className={Style.input} type='password' name='forgetConfirmPassword' ref='forgetConfirmPassword' placeholder='Confirm password' value={this.handle.state.forgetConfirmPassword} onChange={this.handle.onForgetFormChange} /></div>
                            <div className={Style.btn}>
                                <button type='submit' className={Style.ok} onClick={this.handle.resetPassword}>CONFIRM</button>
                                <button className={Style.cancel} onClick={this.handle.onCancel}>CANCEL</button>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        )
    }
}