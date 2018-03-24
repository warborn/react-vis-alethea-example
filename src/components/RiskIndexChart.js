import React, { Component } from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries,
    DiscreteColorLegend
  } from 'react-vis';
  import { getMonthName } from '../utils';

class RiskIndexChart extends Component {
  _getPoints = (location) => {
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
    const { data } = this.props;

    return (
      <div>
        <span className="index-type">{this.props.title}</span>
        <DiscreteColorLegend 
          width={130}
          items={[{title: this.props.labelTitle, color: this.props.color}]}
          className={`line-chart-legend ${this.props.color}`} />
        <XYPlot
          width={this.props.width}
          height={this.props.height}
          >
          <HorizontalGridLines />
          {
            Object.keys(data).map(locationId => {
              return <LineSeries 
                key={locationId} 
                data={this._getPoints(data[locationId])}
                color={this.props.color} />
            })
          }
          <XAxis />
          <YAxis />
        </XYPlot>
      </div>
    )
  }
}

export default RiskIndexChart;