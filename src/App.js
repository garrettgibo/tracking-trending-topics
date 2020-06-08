import React, { Component } from 'react';
import './App.css';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import MapChart from './components/MapChart';


class App extends Component {
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
            <BarChart />
            <PieChart />
            <LineChart />
            <MapChart />
          </div>
        </div>
      </div>
    )
  }
}

export default App;