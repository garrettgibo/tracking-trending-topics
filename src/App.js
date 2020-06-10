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
// Data
import { barData } from './data/barChartData';
import { lineData } from './data/lineChartData';
import { mapData } from './data/mapChartData';

const barDates = Object.keys(barData)
const lineDates = Object.keys(lineData)
let day = 0
const singleDayBarData = barData[barDates[day]]
const singleDayLineData = lineData[lineDates[day]]
const singleDayTrendMapData = mapData[barDates[day]][singleDayBarData.queries[day]].values.data[0]

let trend = singleDayBarData.queries[day]

console.log(singleDayBarData)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // width: 1152 - 24,
      // halfWidth: 1152 / 2 - 24,
      // height: 392,
      barData: singleDayBarData,
      pieData: singleDayBarData,
      lineData: singleDayLineData,
      mapData: singleDayTrendMapData,
      mapTrend: trend,
      trends: singleDayBarData.queries
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

  render() {
    return (
      <div className="App">
        <Header size={this.state}/>
        <Picker size={this.state}/>

        <div className='content-wrap'>
          <div className='widget-container-wrapper layout-wrap layout-row'>
            <Legend trends={this.state.trends}/>
            <BarChart data={this.state.barData} />
            <PieChart data={this.state.pieData} />
            <LineChart data={this.state.lineData} />
            <MapChart data={this.state.mapData} trend={this.state.trend}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;