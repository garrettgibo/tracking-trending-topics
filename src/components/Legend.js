import React, { Component } from 'react'
import { Navbar, Dropdown, DropdownButton} from 'react-bootstrap'
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import '../App.css';

const color = scaleOrdinal(schemeCategory10);

export class Legend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            years: this.props.years,
            currentYear: this.props.years[0],
            trends: this.props.trends,
        }
        this.colors = {}
        this.state.trends.forEach((trend) => this.colors[trend] = color(trend))
    }
    // initial creation
    componentDidMount() {
        this.createLegend()
    }

    // chart updates
    componentDidUpdate() {
        this.createLegend()
    }

    btnClick = (year) => {
        this.setState({currentYear: year})
    }

    changeTrends = (trends, year) => {
        this.setState({
            trends: trends,
            currentYear: year,
        })
        trends.forEach((trend) => this.colors[trend] = color(trend))
    }

    createLegend = () => {
        let legend = this.state.trends.map(trend => {
            return (
                <div className='legend-element flex-12'>
                    <svg width="40" height="40" style={{margin: 'auto'}}>
                        <circle cx="20" cy="20" r="7" fill={this.colors[trend]} />
                    </svg>
                    <p style={{margin: 'auto auto auto 0'}}> {trend} </p>
                </div>
            )
        });
        return (
            <Navbar sticky="top" bg="light" expand="lg" id="sticky-legend">
                <div className="header flex-100">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <DropdownButton variant='light' title={this.state.currentYear} id="basic-nav-dropdown">
                            <Dropdown.Item as="button"
                                onClick={() => this.props.view(this.state.years[0]) }>
                                {this.state.years[0]}</Dropdown.Item>
                            <Dropdown.Item as="button"
                                onClick={() => this.props.view(this.state.years[1]) }>
                                {this.state.years[1]}</Dropdown.Item>
                            <Dropdown.Item as="button"
                                onClick={() => this.props.view(this.state.years[2]) }>
                                {this.state.years[2]}</Dropdown.Item>
                            <Dropdown.Item as="button"
                                onClick={() => this.props.view(this.state.years[3]) }>
                                {this.state.years[3]}</Dropdown.Item>
                            <Dropdown.Item as="button"
                                onClick={() => this.props.view(this.state.years[4]) }>
                                {this.state.years[4]}</Dropdown.Item>
                        </DropdownButton>
                    </Navbar.Collapse>
                    {legend}
                </div>
            </Navbar>
        )
    }

    render() {
        return this.createLegend()
    }
}

export default Legend