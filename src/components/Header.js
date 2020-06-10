import React, { Component } from 'react'
import '../App.css';

export class Header extends Component {
    render() {
        return (
            <div className='picker feature-container' id='header'>
                <div className='picker-container flex-100 layout-left'>
                    <h2> Tracking Trending Topics </h2>
                </div>
            </div>
        )
    }
}

export default Header