import React, { Component } from 'react';
import chroma from 'chroma-js';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import Highcharts from 'highcharts/highmaps';
import $ from'jquery';
// import Exporting from 'highcharts/modules/exporting';
// import Data from 'highcharts/modules/data';
import './highchart/us-map.js'
import ChartTitle from './ChartTitle';
import '../App.css';
// Exporting(Highcharts);

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
            values: data.values.map( p => {
                let maxTrendInd = p.maxValueIndex;
                let trend = data.queries[maxTrendInd]

                // define colors
                // colors[trend] = color(trend)
                let f = chroma.scale(['white', colors[trend]]);

                // define actual entry
                let state = {
                    name: p.geoName,
                    code: p.geoCode.slice(3,), // get only state initials
                    value: p.value[trendIndex],
                    // color: f(p.value[0] / 100).hex(),
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
        // console.log(trendIndex, m)
        Highcharts.mapChart(this.refs.chart, {
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