import React, { Component, useState, useEffect } from 'react';
import * as d3 from "d3";

import './App.css';
import Header from './components/Header';
import Picker from './components/Picker';
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
        <Header size={this.state}/>
        <Picker size={this.state}/>

        <div className='content-wrap'>
          <div className='widget-container-wrapper layout-wrap layout-row'>
            <BarChart w={this.state.halfWidth} h={this.state.height} data={this.state.data}/>
            <PieChart size={this.state}
                      data={this.state.data}
                      outerRadius={this.state.height/2}
                      innerRadius={(this.state.height)/4}
                      />
            <LineChart size={this.state}/>
            <MapChart size={this.state}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;