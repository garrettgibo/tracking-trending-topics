import React, { Component } from 'react';
// import * as d3 from "d3";

import './App.css';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import MapChart from './components/MapChart';

const data = [
    {group: 'a', value: 12},
    {group: 'b', value: 31},
    {group: 'c', value: 22},
    {group: 'd', value: 17},
    {group: 'e', value: 25},
]

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      width: 1152 - 24,
      halfWidth: 1152 / 2 - 24,
      height: 392,
      data,
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 style={{height: '24px', lineHeight:'21px'}}>
            Tracking Trending Topics
          </h2>
        </div>

        <div className='content-wrap'>
          <div className='widget-container-wrapper layout-wrap layout-row'>
            <BarChart w={this.state.halfWidth} h={this.state.height} data={this.state.data}/>
            <PieChart size={this.state}/>
            <LineChart size={this.state}/>
            <MapChart size={this.state}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;