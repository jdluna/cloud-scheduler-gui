import React,{Component} from 'react'
import Style from './login.scss'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.handle = this.props.loginContainer
    }

    render() {
        return (
            <section className='modal'>
                    <section className={Style.panel}>
                        <header><div>Login</div></header>
                        <section>
                            <div className={Style.content}>
                                <form>
                                    <div className={Style.user}>
                                        <img className={Style.icon} src='img/ic_perm.svg'/>
                                        <input className={Style.input} type='text' placeholder='Username' value={this.handle.state.username} onChange={this.handle.onUsernameChange} autoFocus/></div>
                                    <div className={Style.pass}>
                                        <img className={Style.icon} src='img/ic_lock.svg'/>
                                        <input className={Style.input} type='password'  placeholder='Password'  value={this.handle.state.password} onChange={this.handle.onPasswordChange}/></div>
                                    <div className={Style.btn}>
                                        <button type='submit' className={Style.ok} onClick={this.handle.onSignIn}>SIGN IN</button>
                                        <button className={Style.cancel} onClick={this.handle.onCancel}>CANCEL</button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </section>
            </section>
        )
    }
}