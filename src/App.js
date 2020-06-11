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
    this.state = {
      years,
      trends,
      barData: yearData[years[year]],
      pieData: yearData[years[year]],
      lineData: yearData[years[year]],
      mapData: mapData[years[year]],
      mapDataTrend: mapDataTrend[years[year]],
    }
  }
            // {/* <MapChart data={this.state.mapData} /> */}

  render() {
    return (
      <>
      <div className="App">
      <Header size={this.state}/>
        <Legend years={this.state.years} trends={this.state.trends}/>

        <div className='content-wrap'>
          <div className='widget-container-wrapper layout-wrap layout-row'>
            <LineChart data={this.state.lineData} />
            <BarChart data={this.state.barData} />
            <PieChart data={this.state.pieData} />
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={0}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={1}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={2} width={33}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={3} width={33}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={4} width={33}/>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default App;