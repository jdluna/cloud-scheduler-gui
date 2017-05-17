import React, { Component } from 'react'

export default class Loading extends Component {
    render() {
        return (
            <section className='loading'>
                <img src='img/loading-bubbles.svg'/>
                <span>Loading</span>
            </section>
        )
    }
}