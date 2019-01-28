import React,{Component} from 'react'
import style from './userAccess.scss'

export default class userAccess extends Component {
    render(){
        return (
            <section className='modal'>
            <section>
                <section className={style.panel}>
                    <header>
                        <div>User Access</div>
                        <img src='img/ic_close.svg' onClick={()=>this.props.userAccessContainer.onClose()} />
                    </header>
                    <div className={style.content}>
                        User can't Access Resource
                    </div>
                </section>
            </section>
            </section>
       )
    }
}
