import React, { Component } from 'react';
import Highcharts from 'highcharts';
import '../App.css';

export class LineChart extends Component {

// initial creation
    componentDidMount() {
        this.createLineChart()
    }

    // chart updates
    componentDidUpdate() {
        this.createLineChart()
    }

    createLineChart = () => {
        let {size, data} = this.props
        let dataLine = {
            dates: [],
            values: [],
        }
        data.forEach((element,index) => {
            dataLine.dates.push(element.date);
            dataLine.values.push(element.value);
        });
        console.log(dataLine)

        Highcharts.chart(this.refs.chart, {
            chart: {
            type: 'area',
            zoomType: 'xy',
            },

            title: {text: null},
            legend: { enabled: false, },
            credits: {enabled: false},

            yAxis: {
                text: 'Adj Close Stock Price',
                crosshair: {
                    width: 1,
                    color: 'black',
                }
            },

            xAxis: {
                categories: dataLine.dates,
                title: {
                    enabled: true,
                    text: 'Date',
                },
                crosshair: {
                    width: 1,
                    color: 'black',
                }
            },

            tooltip: {
                formatter: function(){
                    return `$${this.y.toFixed(2)}`;
                },
            },

            series: [{
                name: 'stocks',
                data: dataLine.values,
            }],

            plotOptions: {
                color: 'rgba(41, 163, 204, 0.01)',
                lineColor: 'rgba(41, 163, 204, 0.5)',
            }
        });
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
                    // Line Chart
                    // <svg
                    //     ref={node => this.node = node}
                    //     width={this.props.size['width']}
                    //     height={this.props.size['height']}>
                    // </svg>

export default LineChart;