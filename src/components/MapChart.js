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

    formatData(data) {
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
                    value: maxTrendInd, //p.value[0],
                    // color: f(p.value[0] / 100).hex(),
                };
                // let state = [p.geoCode, ...p.value]
                return state
            })
        }

        return formatted;
    }

    createMapChart = () => {
        const { data, yearData} = this.props;
        const m = this.formatData(data);

        console.log(m);
        Highcharts.mapChart(this.refs.chart, {
            colorAxis: {
                dataClasses: [{
                    from: -1,
                    to: 0,
                    color: colors[data.queries[0]],
                    name: data.queries[0]
                }, {
                    from: 0,
                    to: 1,
                    color: colors[data.queries[1]],
                    name: data.queries[1]
                }, {
                    from: 2,
                    to: 3,
                    color: colors[data.queries[2]],
                    name: data.queries[2]
                }, {
                    from: 3,
                    to: 4,
                    color: colors[data.queries[3]],
                    name: data.queries[3]
                }, {
                    from: 3,
                    to: 4,
                    color: colors[data.queries[4]],
                    name: data.queries[4]
                }]
            },
            series: [{
                mapData: Highcharts.maps['countries/us/us-all'],
                data: m.values,
                joinBy: ['name', 'name'],
                borderColor: 'white',
                // keys:['id', 'trend1', 'trend2', 'trend3', 'trend4', 'trend5']
            }]
        });
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