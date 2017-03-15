import React, { Component } from 'react'
import Style from './search.scss'

export default class NotFoundTable extends Component {
    render() {
        return (
            <section>
                <div className={Style.label}>
                    <div className={Style.firstlabel}>Search result ({this.props.data.amount}):</div>
                    <div className={Style.secondlabel}>Click on site's name for more description.</div>
                </div>
                <div className={Style.data}>
                    <div className={Style.header}>
                        <div className={Style.text}>
                            <span>Name</span>
                            <img className={Style.icon} src='img/ic_arrow_drop_down.svg' />
                        </div>
                        <div className={Style.text}>Available CPU</div>
                        <div className={Style.text}>Available Memory (GB)</div>
                    </div>
                    <div className={Style.itemlist}>
                        {this.props.data.sites.map((data,key)=>{
                            return(
                                <div className={Style.item} key={key} onClick={()=>this.props.searchContainer.onSelectItem(data.name)}>
                                    <div className={Style.text}>{data.name}</div>
                                    <div className={Style.text}>{data.CPU.available}</div>
                                    <div className={Style.text}>{data.memory.available}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        )
    }
}