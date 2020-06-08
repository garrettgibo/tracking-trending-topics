import React, { Component } from 'react';
import '../App.css';

export class LineChart extends Component {
    render() {
        return (
            <div className='widget-container flex-100'>
                <div className='fe-atoms-generic-container'>
                    Line Chart
                    <svg
                        ref={node => this.node = node}
                        width={this.props.size['width']}
                        height={this.props.size['height']}>
                    </svg>
                </div>
            </div>
        )
    }
}

export default LineChart;