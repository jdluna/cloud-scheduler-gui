import React,{Component} from 'react'
import HeaderContainer from '../header/headerContainer'
import DashboardContainer from '../dashboard/dashboardContainer'
import LoginContainer from '../dashboard/login/loginContainer'
import moment from 'moment-timezone'

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            loginDialog: {
                open: false,
                header: 'Sign in',
                modal: []
            },
            authen:{
                isLogedIn: false,
                data: {},
                name: '',
                session: '',
                timezone: moment.tz.guess()
            },
            isOpenReserveModal: false,
            loginContainer: null
        }
        this.authentication = this.authentication.bind(this)
        this.onLogin = this.onLogin.bind(this)
        this.onLogout = this.onLogout.bind(this)
    }

    setDateTimeZone(){
        this.setState({
           timezone:{
                date: this.getDateTimeZone(),
                timezone: this.getNameTimeZone()
           } 
        })
        console.log(this.state.timezone.time)
    }

    authentication(props=null,menu=null){
        let {open,check} = this.state.loginDialog
        let {isLogedIn} = this.state.authen
        if(!isLogedIn){
            this.setState({
                loginDialog:{
                    open: (open) ? false : true,
                    header: (isLogedIn) ? 'Log out' : 'Sign in',
                    modal: (open) ? [] : <LoginContainer app={this}/>
                }
            })
        }else{
            this.onLogout()
        }
    }

    onLogin(data,loginContainer){
        console.log(loginContainer)
        let firstname = data.firstname.toLowerCase()
        let lastname = data.lastname.toLowerCase()
        firstname = firstname.charAt(0).toUpperCase()+firstname.slice(1)
        lastname = lastname.charAt(0).toUpperCase()+lastname.slice(1)
        let name = firstname+' '+lastname+' | '

        let {isLogedIn} = this.state.authen
        if(!isLogedIn){
            this.setState({
                loginDialog:{
                    open: false,
                    header: 'Log out',
                    modal: []
                },
                authen:{
                    isLogedIn: true,
                    data: data,
                    name: name,
                    session: data.session_id,
                    timezone: data.timezone
                },
                loginContainer: loginContainer
            })
        }
    }

    onLogout(){
        this.setState({
            loginDialog:{
                open: false,
                header: 'Sign in',
                modal: []
            },
            authen:{
                isLogedIn: false,
                data: {},
                name: '',
                session: '',
                timezone: moment.tz.guess()
            }
        })
        
        this.setState({
            loginContainer : {
                username: '',
                password: ''
            }
        })
        
    }

    setTimeZone(timezone){
        this.setState({
            authen:{
                isLogedIn: this.state.authen.isLogedIn,
                data: this.state.authen.data,
                name: this.state.authen.name,
                session: this.state.authen.session,
                timezone: timezone
            }
        })
    }

    render() {
        return (
            <section>
                <HeaderContainer app={this}/>
                <DashboardContainer app={this}/>
            </section>
        )
    }
}