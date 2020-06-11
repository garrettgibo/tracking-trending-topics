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
import MapChartTrend from './components/MapChartTrend';
// Data
import { yearData } from './data/yearData';
import { mapDataTrend } from './data/mapDataSingle';

const years = Object.keys(yearData)
let year = 0;
const yearsData = yearData[years[year]]
const trends = yearsData.values.map( trend => trend.name );

class App extends Component {
  constructor(props) {
    super(props);
    this.barChart = React.createRef();
    this.lineChart = React.createRef();

    this.pieChart = React.createRef();
    // maps
    this.mapChart1 = React.createRef();
    this.mapChart2 = React.createRef();
    this.mapChart3 = React.createRef();
    this.mapChart4 = React.createRef();
    this.mapChart5 = React.createRef();

    // legend
    this.legend = React.createRef();

    // State
    this.state = {
      years,
      trends,
      currentYear: years[0],
      barData: yearData,
      pieData: yearData,
      lineData: yearData,
      mapDataTrend: mapDataTrend,
    }
  }

  changeView = (newYear) => {
    this.setState({
      currentYear: newYear,
    })
    this.barChart.current.changeYear(newYear);
    this.lineChart.current.changeYear(newYear);
    this.pieChart.current.changeYear(newYear);
    // maps
    this.mapChart1.current.changeYear(newYear);
    this.mapChart2.current.changeYear(newYear);
    this.mapChart3.current.changeYear(newYear);
    this.mapChart4.current.changeYear(newYear);
    this.mapChart5.current.changeYear(newYear);

    let trends = yearData[newYear].values.map(entry => entry.name);
    this.legend.current.changeTrends(trends, newYear);
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
                      ref={this.mapChart1}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={1}
                      year={this.state.currentYear}
                      ref={this.mapChart2}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={2} width={33}
                      year={this.state.currentYear}
                      ref={this.mapChart3}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={3} width={33}
                      year={this.state.currentYear}
                      ref={this.mapChart4}/>
            <MapChartTrend data={this.state.mapDataTrend} trendIndex={4} width={33}
                      year={this.state.currentYear}
                      ref={this.mapChart5}/>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default App;