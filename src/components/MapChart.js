import React, { Component } from 'react';
import Highcharts from 'highcharts/highmaps';
import './highchart/us-map.js'
import '../App.css';

export class MapChart extends Component {

    componentDidMount() {
        this.createMapChart()
    }

    // chart updates
    componentDidUpdate() {
        this.createMapChart()
    }

    createMapChart = () => {
        let {size, data} = this.props;
        console.log(data)
        Highcharts.mapChart(this.refs.chart, {
            chart: {
                map: 'countries/us/us-all',
            },

            title: {text: null},
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {formatter: function() {return this.point.name}},

            series: [{
                data: data,
                name:  '{point.name}',
            //   color: lightGray,
                allowPointSelect: true,
                cursor: 'pointer',
                states: {
                hover: { color: '#0ff00' },
                select: { color: '#0C3' },
                },
                tooltip: {
                pointFormat: '{point.code}: {point.value}/km²'
                }
            //   dataLabels: {
            //     enabled: true,
            //     format: '{point.name}',
            //     color: 'black',
            //   },
            }],

        })
    }
    render() {
        return (
            <div className='widget-container flex-100'>
                <div className='fe-atoms-generic-container'>
                    <div ref='chart'></div>
                </div>
            </div>
        )
    }
}

export default MapChart;