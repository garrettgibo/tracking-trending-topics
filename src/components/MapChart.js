import React, { Component } from 'react';
import chroma from 'chroma-js';
import { scaleOrdinal } from 'd3-scale';
import { schemeAccent } from 'd3-scale-chromatic';
import Highcharts from 'highcharts/highmaps';
import './highchart/us-map.js'
import ChartTitle from './ChartTitle';
import '../App.css';

const color = scaleOrdinal(schemeAccent);
let colors = {};

export class MapChart extends Component {

    componentDidMount() {
        this.createMapChart()
    }

    // chart updates
    componentDidUpdate() {
        this.createMapChart()
    }

    formatData(data) {
        // let f = chroma.scale(['white', colors[trend]]);
        let formatted = data.map( p =>{
            let state = {};
            state.code = p[0];
            state.value = p[1];
            // state.color = f(state.value / 100).hex();
            return state
        });
        return formatted;
    }


    createMapChart = () => {
        const { data, trend } = this.props;
        const dataMap = this.formatData(data, trend);
        colors[trend] = color(trend);
        console.log(dataMap)
        console.log(colors[trend])

        Highcharts.mapChart(this.refs.chart, {
            chart: {
                map: 'countries/us/us-all',
            },

            title: {text: null},
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {formatter: function() {return this.point.name}},
            colorAxis: {
                min: 0,
                max: 100,
                type: 'linear',
                minColor: 'rgba(235, 235, 235, 0.75)',
                maxColor: colors[trend],
            },
            series: [{
                data,
                name:  '{point.value}',
                // joinBy: ['iso-a2', 'code'],
                states: {
                    hover: {
                        color: '#a4edba'
                    }
                },
                tooltip: {
                    valueSuffix: '/km²'
                }
            }],

        })
    }
    render() {
        return (
            <div className='widget-container flex-100'>
                <div className='fe-atoms-generic-container'>
                    <ChartTitle title={'testing'} />
                    <div ref='chart'></div>
                </div>
            </div>
        )
    }
}

export default MapChart;