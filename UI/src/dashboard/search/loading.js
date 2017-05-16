import React, { Component } from 'react'
import Style from './search.scss'

export default class Loading extends Component {
    render() {
        return (
            <section className='loading'>
                <img src='img/loading-bubbles.svg'/>
                <span>Searching</span>
            </section>
        )
    }
}