import React, { Component } from 'react';
import Highcharts from 'highcharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeAccent } from 'd3-scale-chromatic';
import ChartTitle from './ChartTitle';
import '../App.css';

const color = scaleOrdinal(schemeAccent);
let colors = {};

export class LineChart extends Component {
    // initial creation
    componentDidMount() {
        this.createPieChart()
    }

    // chart updates
    componentDidUpdate() {
        this.createPieChart()
    }

    formatData(data) {
        let formatted = []
        let total = data["values"].reduce( (item, next) => item + next)
        data["queries"].forEach( (item, index) => {
            colors[item] = color(item)
            // normalize values into percents
            let percent = parseFloat((data["values"][index] / total * 100).toFixed(2))
            formatted.push({
                name: item,
                y: percent,
                color: colors[item]
            })
        });
        return formatted;
    }

    createPieChart = () => {
        const {data} = this.props
        const dataPie = this.formatData(data);

        // Create the chart
        Highcharts.chart(this.refs.chart, {
            chart: { type: 'pie' },
            title: { text: null },
            credits: {enabled: false},

            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%'],
                    // allowPointSelect: true,
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
                    <ChartTitle title={'testing'} />
                    <div ref='chart'></div>
                </div>
            </div>
        )
    }
}

export default LineChart;