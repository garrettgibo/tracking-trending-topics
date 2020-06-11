import React, { Component } from 'react'
import { Navbar, NavDropdown} from 'react-bootstrap'
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import '../App.css';

const color = scaleOrdinal(schemeCategory10);
let colors = {};

export class Legend extends Component {
    render() {
        const { years, trends} = this.props;
        let legend = trends.map(element => {
            return (
                <div className='legend-element flex-12'>
                    <svg width="40" height="40" style={{margin: 'auto'}}>
                        <circle cx="20" cy="20" r="7" fill={color(element)} />
                    </svg>
                    <p style={{margin: 'auto auto auto 0'}}> {element} </p>
                </div>
            )
        });
        return (
            <Navbar sticky="top" bg="light" expand="lg" id="sticky-legend">
                <div className="header flex-100">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <NavDropdown title="Year" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">{years[0]}</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">{years[1]}</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">{years[2]}</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">{years[3]}</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">{years[4]}</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                    {legend}
                </div>
            </Navbar>
        )
    }
}

export default Legend