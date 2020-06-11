import React, { Component } from 'react';
import Highcharts from 'highcharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import ChartTitle from './ChartTitle';
import '../App.css';

const color = scaleOrdinal(schemeCategory10);
let colors = {};

export class LineChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            year: this.props.year,
        }
    }

    // initial creation
    componentDidMount() {
        this.createLineChart()
    }

    // chart updates
    componentDidUpdate() {
        this.createLineChart()
    }

    changeYear = (year) => {
        this.setState({
            data: this.state.data,
            year,
        })
    }

    formatData(data) {
        let formatted = {
            dates: data.dates.map( d => new Date(d * 1000)),
            values: data.values.map( trend => {
                colors[trend.name] = color(trend.name)
                let entry = {
                    color: colors[trend.name],
                    name: trend.name,
                    data: trend.values.map( (val, ind) =>{
                        return [
                            data.dates[ind] * 1000,
                            val
                        ]
                    }),
                }
                return entry
            })
        }
        return formatted
    }

    createLineChart = () => {
        const dataLine = this.formatData(this.state.data[this.state.year]);

        Highcharts.chart(this.refs.chart, {
            chart: {
                type: 'spline',
                zoomType: 'xy',
            },

            title: {text: null},
            legend: { enabled: false, },
            credits: {enabled: false},

            yAxis: {
                title:{
                    text: 'Relative Interst',
                },
                crosshair: {
                    width: 1,
                    color: 'black',
                }
            },

            xAxis: {
                type:'datetime',
                crosshair: {
                    width: 1,
                    color: 'gray',
                    // snap: false,
                }
            },

            tooltip: {
                formatter: function(){
                    return `${this.y.toFixed(2)}`;
                },
            },

            series: dataLine.values,
            plotOptions: {
                // color: 'rgba(41, 163, 204, 0.01)',
                // lineColor: 'rgba(41, 163, 204, 0.5)',
                series: {
                    marker: {
                        enabled: false,
                    }
                },
            }
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

export default LineChart;