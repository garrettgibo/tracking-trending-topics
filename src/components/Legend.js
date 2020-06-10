import React, { Component } from 'react'
import { scaleOrdinal } from 'd3-scale';
import { schemeAccent } from 'd3-scale-chromatic';
import '../App.css';

const color = scaleOrdinal(schemeAccent);
let colors = {};

export class Legend extends Component {
    render() {
        const { trends } = this.props
        let legend = trends.map(element => {
            return (
                <div className='legend-element flex-20'>
                    <svg width="40" height="40">
                        <circle cx="20" cy="20" r="10" fill={color(element)} />
                    </svg>
                    <h6 style={{margin: 'auto auto auto 0'}}> {element} </h6>
                </div>
            )
        });
        return (
            <div className='widget-container flex-100'>
                <div className='legend-container layout-left'>
                    {legend}
                </div>
            </div>
        )
    }
}

export default Legend
