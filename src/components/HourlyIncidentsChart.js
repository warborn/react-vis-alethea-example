import React, { Component } from 'react';
import {
    XYPlot,
    MarkSeries,
    LabelSeries,
    Hint
  } from 'react-vis';
import { requestChartData } from '../utils';

class HourlyIncidentsChart extends Component {
  constructor() {
    super();

    this.state = {
      data: {},
      value: null
    }
  }

  componentWillMount() {
    const endpoint = '/incidents/by-hour';
    const params = {
      'locs': [],
      'filters': ['efv']
    }

    requestChartData(endpoint, params)
      .then(response => {
        const hours = response.data;
        this.setState({data: hours});
      })
  }

  getLabel(hour) {
    let h = hour % 12 || 12;
    let ampm = (hour < 12 || hour === 11) ? 'am' : 'pm';
    return h + ampm;
  }

  getCircles = (hours) => {
    // to draw a circle react-vis needs an array of objects with the following form:
    // [
    //     {x: val, y: val, size: val},
    //     {x: val, y: val, size: val},
    //     {x: val, y: val, size: val},
    // ]
    return hours.slice(9, 19)
      .map(hour => ({
        x: hour.hour, 
        y: 0, 
        label: this.getLabel(hour.hour), 
        size: hour.incidents,
        style: {fontSize: 10, fontWeight: 'bold'}
      }))
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
    const { data, value } = this.state;
    return (
      <div>
        {
          data.length > 0 
            ? <XYPlot
                color="red"
                width={this.props.width}
                height={this.props.height}>
                <MarkSeries 
                    strokeWidth={1}
                    sizeRange={[1, 25]}
                    data={this.getCircles(data)}
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
                    data={this.getCircles(data)}
                    marginTop={120}
                    marginLeft={35}
                    className="hour-labels" />
              </XYPlot>
            : null
        }
      </div>
    )
  }
}

export default HourlyIncidentsChart;