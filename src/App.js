import React, { Component } from 'react';
// Style
import './App.css';
// Components
import Header from './components/Header';
import Legend from './components/Legend';
// import Legend from './components/Legend';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import MapChart from './components/MapChart';
import MapChartTrend from './components/MapChartTrend';
// Data
import { yearData } from './data/yearData';
import { mapData } from './data/mapData';
import { mapDataTrend } from './data/mapDataSingle';

const years = Object.keys(yearData)
let year = 4;
const yearsData = yearData[years[year]]
// const mapsData = mapData[years[year]]
// const mapsDataTrend = mapDataTrend[years[year]]

// console.log(yearsData)
const trends = yearsData.values.map( trend => trend.name );

class App extends Component {
  constructor(props) {
    super(props);
    this.barChart = React.createRef();
    this.lineChart = React.createRef();
    this.pieChart = React.createRef();
    this.mapChart = React.createRef();
    this.legend = React.createRef();
    this.state = {
      years,
      trends,
      currentYear: years[0],
      barData: yearData, //[years[year]],
      pieData: yearData, //[years[year]],
      lineData: yearData, //[years[year]],
      // mapData: mapData[years[year]],
      mapDataTrend: mapDataTrend, //[years[year]],
    }
  }

  changeView = (newYear) => {
    this.setState({
      currentYear: newYear,
    })
    this.barChart.current.changeYear(newYear);
    this.lineChart.current.changeYear(newYear);
    this.pieChart.current.changeYear(newYear);
    this.mapChart.current.changeYear(newYear);
    let trends = yearData[newYear].values.map(entry => entry.name);
    console.log(trends);
    this.legend.current.changeTrends(trends);
  }

  render() {
    return (
      <>
      <div className="App">
      <Header size={this.state}/>
        <Legend years={this.state.years}
                trends={this.state.trends}
                view={this.changeView}
                ref={this.legend}/>

        <div className='content-wrap'>
          <div className='widget-container-wrapper layout-wrap layout-row'>
            <LineChart data={this.state.lineData}
                      year={this.state.currentYear}
                      ref={this.lineChart}/>
            <BarChart data={this.state.barData}
                      year={this.state.currentYear}
                      ref={this.barChart}/>
            <PieChart data={this.state.pieData}
                      year={this.state.currentYear}
                      ref={this.pieChart}/>
            <MapChartTrend data={this.state.mapDataTrend}
                      trendIndex={0}
                      year={this.state.currentYear}
                      ref={this.mapChart}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={1}
                      year={this.state.currentYear}
                      ref={this.mapChart}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={2} width={33}
                      year={this.state.currentYear}
                      ref={this.mapChart}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={3} width={33}
                      year={this.state.currentYear}
                      ref={this.mapChart}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={4} width={33}
                      year={this.state.currentYear}
                      ref={this.mapChart}/>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default App;