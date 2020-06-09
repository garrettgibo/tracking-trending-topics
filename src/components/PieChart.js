import React, { Component } from 'react';
import Highcharts from 'highcharts';
import '../App.css';

export class LineChart extends Component {
    // initial creation
    componentDidMount() {
        this.createPieChart()
    }

    // chart updates
    componentDidUpdate() {
        this.createPieChart()
    }

    formatPieData(data) {
      let dataPie = data.map(datum => {
        return {name: datum.group,
         y: datum.value}
      });

      return dataPie
    }

    createPieChart = () => {
        const {size, data} = this.props
        const dataPie = this.formatPieData(data);

        console.log(dataPie);
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
                    color: '#ffffff',
                    distance: -30
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