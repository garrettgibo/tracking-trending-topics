import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import '../App.css';

export class Header extends Component {
    render() {
        return (
            <Navbar sticky="top" id='header'>
                <div className='picker-container flex-100 layout-left'>
                    <h2> Tracking Trending Topics </h2>
                </div>
            </Navbar>
        )
    }
}

export default Header