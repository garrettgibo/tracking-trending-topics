import React, { Component } from 'react'
import { Navbar} from 'react-bootstrap'
import '../App.css';

export class Header extends Component {
    render() {
        return (
            <Navbar sticky="top" id='header'>
                <div className='header flex-100'>
                    <Navbar.Text bsPrefix='white'>Tracking Trending Topics</Navbar.Text>
                    <Navbar.Collapse className="justify-content-end">
                        <a href='https://github.com/garrettgibo/tracking-trending-topics'>
                        <img
                            src={require('../images/Octocat.png')}
                            width="45"
                            height="45"
                            className="d-inline-block align-top"
                            alt="Github Logo"
                        />
                        </a>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }
}
export default Header