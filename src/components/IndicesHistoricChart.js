import React, { Component } from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries,
    DiscreteColorLegend
  } from 'react-vis';
  import { requestChartData, getMonthName } from '../utils';

class IndicesHistoricChart extends Component {
  constructor() {
    super();

    this.state = {
      data: {},
      locs: ['ASHcU2IBmS_KBCrJjyWd']
    }
  }

  componentWillMount() {;
    const endpoint = '/indices/historic';
    const params = {
      'locs': this.state.locs,
      'index': ['structural', 'dynamic'],
      'size': '100'
    }

    requestChartData(endpoint, params)
      .then(response => {
        const locations = response.data;
        this.setState({data: locations});
      })
  }

  getPoints = (location) => {
    // to draw a line react-vis needs an array of objects with the following form:
    // [
    //     {x: val, y: val},
    //     {x: val, y: val},
    //     {x: val, y: val},
    // ]

    // here I use the index of the array as the XAxis value instead of the date
    return location[`${this.props.type}_index`]
            .map((point, index) => ({x: index, y: point.y}));
  }

  render() {
    const { data, locs } = this.state;
    const tickValues = ['2018-01-01 00:00:00', '2018-02-01 00:00:00', '2018-03-01 00:00:00', '2018-04-01 00:00:00', '2018-05-01 00:00:00',];
    return (
      <div>
        <span className="index-type">{this.props.title}</span>
        <DiscreteColorLegend 
          width={110}
          items={[{title: 'Nacional', color: this.props.color}]}
          className={`line-chart-legend ${this.props.color}`} />
        <XYPlot
          width={this.props.width}
          height={this.props.height}
          >
          <HorizontalGridLines />
          {
            data ? 
              Object.keys(data).map(locationId => {
    
                return <LineSeries 
                  key={locationId} 
                  data={this.getPoints(data[locationId])}
                  color={this.props.color} />
              })
              : null
          }
          <XAxis />
          <YAxis />
        </XYPlot>
      </div>
    )
  }
}

export default IndicesHistoricChart;