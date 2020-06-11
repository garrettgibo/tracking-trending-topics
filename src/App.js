import React, { Component } from 'react';
// Style
import './App.css';
// Components
import Header from './components/Header';
import Picker from './components/Picker';
import Legend from './components/Legend';
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
const mapsData = mapData[years[year]]
const mapsDataTrend = mapDataTrend[years[year]]


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barData: yearsData,
      pieData: yearsData,
      lineData: yearsData,
      mapData: mapsData,
      mapDataTrend: mapsDataTrend,
    }
  }
  componentDidMount() {
    let trends = this.state.barData.queries;
    this.changeTrends(trends);
  }

  componentDidUpdate() {
    let trends = this.state.barData.queries;
    this.changeTrends(trends);
  }

  changeTrends = (trends) => {
    this.state.trends = trends;
  }

            // <Legend trends={this.state.trends}/>
  render() {
    return (
      <div className="App">
        <Header size={this.state}/>
        <Picker size={this.state}/>

        <div className='content-wrap'>
          <div className='widget-container-wrapper layout-wrap layout-row'>
            <LineChart data={this.state.lineData} />
            <BarChart data={this.state.barData} />
            <PieChart data={this.state.pieData} />
            <MapChart data={this.state.mapData} />
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={0}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={1}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={2}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={3}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={4}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;