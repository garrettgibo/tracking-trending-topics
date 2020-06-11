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
import { yearData } from './data/yearData';
// import { lineData } from './data/lineChartData';
// import { mapData } from './data/mapChartData';

const years = Object.keys(yearData)
// const lineDates = Object.keys(lineData)
let year = 0
const yearsData = yearData[years[year]]
// const singleDayLineData = lineData[lineDates[day]]
// const singleDayTrendMapData = mapData[barDates[day]][singleDayBarData.queries[day]].values.data[0]

// let trend = singleDayBarData.queries[day]

// console.log(singleDayBarData)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // width: 1152 - 24,
      // halfWidth: 1152 / 2 - 24,
      // height: 392,
      barData: yearsData,
      pieData: yearsData,
      lineData: yearsData,
      // mapData: singleDayTrendMapData,
      // mapTrend: trend,
      // trends: singleDayBarData.queries
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
            <BarChart data={this.state.barData} />
            <PieChart data={this.state.pieData} />
            <LineChart data={this.state.lineData} />
          </div>
        </div>
      </div>
    )
  }
}
            // <MapChart data={this.state.mapData} trend={this.state.trend}/>

export default App;