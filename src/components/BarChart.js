import React, { Component } from 'react';
import Highcharts from 'highcharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import ChartTitle from './ChartTitle';
import '../App.css';

const color = scaleOrdinal(schemeCategory10);
let colors = {};

export class BarChart extends Component {
    // constructor(props) {
    //     super(props)
    // }

    // initial creation
    componentDidMount() {
        this.createBarChart()
    }

    // chart updates
    componentDidUpdate() {
        this.createBarChart()
    }

    formatData(data) {
        let formatted = {
            groups: [],
            values: [],
        };
        data.values.forEach( (item, index) => {
            formatted.groups.push(item.name);
            colors[item] = color(item.name)
            formatted.values.push({
                y: item.max,
                color: colors[item],
            })
        });
        return formatted;
    }

    createBarChart = () => {
        const { data } = this.props
        const barData = this.formatData(data);

        Highcharts.chart(this.refs.chart, {
            chart: {
                type: 'column'
            },
            title: { text: null },
            legend: { enabled: false, },
            credits: {enabled: false},
            xAxis: {
                categories: barData.groups,
                crosshair: true,
                title: {
                    enabled: false,
                }
            },
            yAxis: {
                enabled: false,
                min: 0,
                title: {
                    text: 'Relative Interest'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: `<tr><td style=\\"color:{series.color};padding:0\\">
                            {series.name}: </td><td style=\\"padding:0\\">
                            <b>{point.y}</b></td></tr>`,
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    colorByPoint: true,
                }
            },
            series: [{
                name: 'Trends',
                data: barData.values
            },]
        });
    }

    render() {
        return (
            <div className='widget-container flex-60'>
                <div className='fe-atoms-generic-container'>
                    <ChartTitle title={'testing'} />
                    <div ref='chart'></div>
                </div>
            </div>
        )
    }
}

export default BarChart;