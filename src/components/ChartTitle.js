import React, { Component } from 'react'
import '../App.css';

export class ChartTitle extends Component {
    render() {
        const {title} = this.props
        return (
            <div className='flex-100'>
                <div className='chart-title-container'>
                    <div className='chart-title'> {title} </div>
                </div>
            </div>
        )
    }
}

export default ChartTitle
