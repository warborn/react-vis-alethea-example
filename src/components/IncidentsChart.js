import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    XYPlot,
    MarkSeries,
    LabelSeries,
    Hint
  } from 'react-vis';
  import { convertDayToLabel, convertHourToLabel } from '../utils';

class IncidentsChart extends Component {
  constructor() {
    super();

    this.state = {
      value: null
    }
  }

  _getCircles = (points) => {
    // to draw a circle react-vis needs an array of objects with the following form:
    // [
    //     {x: val, y: val, size: val},
    //     {x: val, y: val, size: val},
    //     {x: val, y: val, size: val},
    // ]
    const { type } = this.props;

    if(type === 'daily') {
      return points
        .map(day => ({
          x: day.day, 
          y: 0, 
          label: convertDayToLabel(day.day), 
          size: day.incidents,
          style: {fontSize: 10, fontWeight: 'bold'}
        }))
    } else if(type === 'hourly') {
      return points.slice(9, 19)
      .map(hour => ({
        x: hour.hour, 
        y: 0, 
        label: convertHourToLabel(hour.hour), 
        size: hour.incidents,
        style: {fontSize: 10, fontWeight: 'bold'}
      }))
    }
  }

  _rememberValue = (value) => {
    this.setState({value});
  }

  _forgetValue = () => {
    this.setState({
      value: null
    });
  }

  _format = (data) => {
    return [data].map(point => ({title: 'Incidentes', value: point.size})) 
  }

  render() {
    const { data } = this.props;
    const { value } = this.state;
    return (
      <div>
        <XYPlot
          color="red"
          width={this.props.width}
          height={this.props.height}>
          <MarkSeries 
            strokeWidth={1}
            sizeRange={[1, 25]}
            data={this._getCircles(data)}
            marginTop={60}
            marginLeft={40}
            onValueMouseOver={this._rememberValue}
            onValueMouseOut={this._forgetValue} />
            {
              value 
                ? <Hint value={value} format={this._format} >
                  </Hint>
                : null
            }
          <LabelSeries 
            animation
            allowOffsetToBeReversed
            data={this._getCircles(data)}
            marginTop={120}
            marginLeft={35}
            className="hour-labels" />
        </XYPlot>
      </div>
    )
  }
}

IncidentsChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
}

export default IncidentsChart;