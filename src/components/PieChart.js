import React, { Component } from 'react';
import Highcharts from 'highcharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeAccent } from 'd3-scale-chromatic';
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
        data["queries"].forEach( (item, index) => {
            colors[item] = color(item)
            formatted.push({
                name: item,
                y: data["values"][index],
                color: colors[item]
            })
        });
        return formatted;
    }

    createPieChart = () => {
        const {data} = this.props
        const dataPie = this.formatData(data);
        console.log(dataPie)

        // Create the chart
        Highcharts.chart(this.refs.chart, {
            chart: { type: 'pie' },
            title: { text: null },
            credits: {enabled: false},

            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%']
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            series: [{
                type: 'pie',
                name: 'Trends',
                data: dataPie,
                innerSize: '50%',
                dataLabels: {
                    formatter: function () {
                        return this.y > 5 ? this.point.name : null;
                    },
                    // color: 'black',
                    distance: -30,
                    style: {
                        color: 'black',
                        fontSize: '20px',
                        fontWeight: 'normal',
                        textOutline: 'black'
                    }
                }
            }],
        })
    }

    render() {
        return (
            <div className='widget-container flex-50'>
                <div className='fe-atoms-generic-container'>
                    <div ref='chart'></div>
                </div>
            </div>
        )
    }
}

export default LineChart;