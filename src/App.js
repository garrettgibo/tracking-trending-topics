import React, { Component } from 'react';
// Style
import './App.css';
// Components
import Header from './components/Header';
import Picker from './components/Picker';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import MapChart from './components/MapChart';
// Data
import { barData } from './data/barChartData';

const barDates = Object.keys(barData)
const singleDayBarData = barData[barDates[0]]

const timeData = [
    {date: 'a', value: 12},
    {date: 'b', value: 31},
    {date: 'c', value: 22},
    {date: 'd', value: 17},
    {date: 'e', value: 25},
]

const mapData = [
  ['eu', 0],
  ['oc', 0],
  ['af', 0],
  ['as', 0],
  ['na', 0],
  ['sa', 0],
  ['an', 0]
];
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // width: 1152 - 24,
      // halfWidth: 1152 / 2 - 24,
      // height: 392,
      barData: singleDayBarData,
      pieData: singleDayBarData,
      timeData,
      mapData,
    }
  }
  render() {
    return (
      <div className="App">
        <Header size={this.state}/>
        <Picker size={this.state}/>

        <div className='content-wrap'>
          <div className='widget-container-wrapper layout-wrap layout-row'>
            <BarChart data={this.state.barData} />
            <PieChart data={this.state.pieData} />
            <LineChart data={this.state.timeData} />
            <MapChart data={this.state.mapData} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;