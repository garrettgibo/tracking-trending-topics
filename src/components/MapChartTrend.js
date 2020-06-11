import React, { Component } from 'react';
// Colors
import chroma from 'chroma-js';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
// Maps
import Highcharts from 'highcharts/highmaps';
import ChartTitle from './ChartTitle';
// Style
import '../App.css';

const color = scaleOrdinal(schemeCategory10);
let colors = {};

export class MapChart extends Component {

    componentDidMount() {
        this.createMapChart()
    }

    // chart updates
    componentDidUpdate() {
        this.createMapChart()
    }

    formatData(data, trendIndex) {
        // set colors
        let formatted = {
            queries: data.queries.map(query => {
                colors[query] = color(query);
                return query
            }),
            values: data.values[trendIndex].map( p => {
                let maxTrendInd = p.maxValueIndex;
                let trend = data.queries[maxTrendInd]

                let f = chroma.scale(['white', colors[trend]]);

                // define actual entry
                let state = {
                    name: p.geoName,
                    code: p.geoCode.slice(3,), // get only state initials
                    value: p.value[0],
                };
                // let state = [p.geoCode, ...p.value]
                return state
            })
        }

        return formatted;
    }

    createMapChart = () => {
        const { data, trendIndex} = this.props;
        const m = this.formatData(data, trendIndex);

        Highcharts.mapChart(this.refs.chart, {
            title: {text: null},
            legend: { enabled: false, },
            credits: {enabled: false},
            colorAxis: {
                from: 0,
                to: 100,
                type: 'logarithmic',
                minColor: '#f7f7f7',
                maxColor: colors[m.queries[trendIndex]],
            },
            series: [{
                mapData: Highcharts.maps['countries/us/us-all'],
                data: m.values,
                joinBy: ['name', 'name'],
                borderColor: '#EEE',
            }]
        });
    }

    render() {
        return (
            <div className='widget-container flex-50'>
                <div className='fe-atoms-generic-container'>
                    <ChartTitle title={'testing'} />
                    <div ref='chart'></div>
                </div>
            </div>
        )
    }
}

export default MapChart;