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
        this.createPieChart()
    }

    // chart updates
    componentDidUpdate() {
        this.createPieChart()
    }

    changeYear = (year) => {
        this.setState({
            data: this.state.data,
            year,
        })
    }

    formatData(data) {
        let formatted = []
        let total = 0;
        let totals = {}
        data.values.forEach(item => {
            totals[item.name] = item.values.reduce( (item, next) => item + next )
            total = total + totals[item.name]
        });
        data.values.forEach( (item, index) => {
            colors[item] = color(item.name)
            // normalize values into percents
            let percent = parseFloat((totals[item.name] / total * 100).toFixed(2))
            formatted.push({
                name: item.name,
                y: percent,
                color: colors[item]
            })
        });
        return formatted;
    }

    createPieChart = () => {
        const dataPie = this.formatData(this.state.data[this.state.year]);

        // Create the chart
        Highcharts.chart(this.refs.chart, {
            chart: { type: 'pie' },
            title: { text: null },
            credits: {enabled: false},

            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%'],
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    }
                },

            },
            tooltip: {
                valueSuffix: '%'
            },
            series: [{
                type: 'pie',
                name: 'Trends',
                data: dataPie,
                innerSize: '50%',
            }],
        })
    }

    render() {
        return (
            <div className='widget-container flex-40'>
                <div className='fe-atoms-generic-container'>
                    <ChartTitle title={`Proportional Relative Interest`} />
                    <div ref='chart'></div>
                </div>
            </div>
        )
    }
}

export default LineChart;