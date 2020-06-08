import React, { Component } from 'react';
import '../App.css';

export class BarChart extends Component {
    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }

    // initial creation
    componentDidMount() {
        this.createBarChart()
    }

    // chart updates
    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart() {

    }

    render() {
        return (
            <div className='widget-container flex-50'>
                <div className='fe-atoms-generic-container'>
                    Bar Chart
                    <svg
                        ref={node => this.node = node}
                        width={this.props.size['halfWidth']}
                        height={this.props.size['height']}>
                    </svg>
                </div>
            </div>
        )
    }
}

export default BarChart;