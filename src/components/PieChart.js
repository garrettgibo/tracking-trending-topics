import React, { Component } from 'react';
import '../App.css';

export class PieChart extends Component {
    render() {
        return (
            <div className='widget-container flex-50'>
                <div className='fe-atoms-generic-container'>
                    Pie Chart
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

export default PieChart;