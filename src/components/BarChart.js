import React, { Component } from 'react';
import '../App.css';
// import { select } from 'd3-selection'
import * as d3 from "d3";

export class BarChart extends Component {
    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart
    }

    // initial creation
    componentDidMount() {
        this.createBarChart()
    }

    // chart updates
    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart = () => {
        // global chart parameters
        const color = d3.scaleOrdinal(d3.schemeAccent);
        const margin = {top: 30, right: 30, bottom: 30, left: 60}

        let {w, h, data} = this.props;

        // create padding around chart
        w = w - margin.left - margin .right;
        h = h - margin.top - margin .bottom;

        const svg = d3
          .select(this.refs.chart)
          .append("svg")
          .attr("width", w + margin.left + margin.right)
          .attr("height", h + margin.top + margin.bottom)
          .attr("class", "bar");

        // Initialize the X axis
        const x = d3.scaleBand()
            .range([0, w])
            .padding(0.3)
        const xAxis = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${h + margin.bottom})`)
            .style('color', 'rgb(158, 158, 158)')

        // Initialize the Y axis
        const y = d3.scaleLinear()
            .range([ h, 0]);
        const yAxis = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${ margin.bottom})`)
            .attr("class", "myYaxis")
            .style('color', 'rgb(158, 158, 158)')

        // Create the X axis
        x.domain(data.map( (d) => d.group ))
        xAxis.call(d3.axisBottom(x))

        // Create the Y axis
        y.domain([0, d3.max(data, (d) => d.value ) ]);
        yAxis.transition().duration(1000).call(d3.axisLeft(y));

        // Create bars
        svg
          .selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("fill", d => color(d.group))
          .attr("class", "sBar")
          .attr("x", d => x(d.group))
          .attr("y", d => y(d.value))
          .attr("width",x.bandwidth())
          .attr("height", d => h - y(d.value))
          .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
          .append("title")
          .text(d => `${d.group} - ${d.value}`);

        // svg
        //   .selectAll("text")
        //   .data(data)
        //   .enter()
        //   .append("text")
        //   .style("font-size", 18)
        //   .attr("fill", "red")
        //   .attr("x", (d, i) => i * 60)
        //   .attr("y", (d, i) => h - 7 * d.value - 3)
        //   .text(d => d.group);
    }

    render() {
        const styles = {
            container: {
                display: "grid",
                justifyItems: "center"
            }
        };
        return (
            <div className='widget-container flex-50'>
                <div className='fe-atoms-generic-container'>
                    <div ref='chart'></div>
                </div>
            </div>
        )
    }
}

export default BarChart;