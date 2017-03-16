import style from './autocomplete.scss'
import React,{Component} from 'react'

export default class autocomplete extends Component {
    render() {
        return (
            <div className={style.autocomplete}>
                {this.props.item.map((data,key)=>{
                    return(
                        <div className={style.text} key={key} onClick={()=>this.props.handle(data)}>{data}</div>
                    )
                })}
            </div>
        )
    }
}