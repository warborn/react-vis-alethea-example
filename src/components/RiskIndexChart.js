import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries,
    DiscreteColorLegend
  } from 'react-vis';
import { getMonthName, stripPosfix } from '../utils';
import { COLORS } from '../colors';

class RiskIndexChart extends Component {
  _mapArrayToPoints = (array) => {
    // to draw a line react-vis needs an array of objects with the following form:
    // [
    //     {x: val, y: val},
    //     {x: val, y: val},
    //     {x: val, y: val},
    // ]

    // here I use the index of the array as the XAxis value instead of the date
    return array.map((point, index) => ({x: new Date(point.x), y: point.y}));
  }

  _filterSelectedLocations = (locationId) => {
    const { selectedLocations } = this.props;
    return !selectedLocations ? true : selectedLocations.includes(locationId)
  }

  _getLabels(data) {
    return Object
      .keys(data)
      .filter(this._filterSelectedLocations)
      .map((locationId) => {
        let { name } = data[locationId];
        return {
          title: name,
          color: COLORS[name]['structural_index']
        }
      });
  }

  renderLocation = (locationId) => {
    let location = this.props.data[locationId];

    return Object
      .keys(location.indices)
      .filter(indexType => this.props.indexTypes.includes(stripPosfix(indexType)))
      .map((indexType) => this.renderLineSeries(locationId, indexType))
  }

  renderLineSeries = (locationId, indexType) => {
    let location = this.props.data[locationId];
    let color = COLORS[location.name][indexType];

    return (
      <LineSeries 
        key={locationId + indexType} 
        data={this._mapArrayToPoints(location['indices'][indexType])}
        color={color} />
    )
  }

  render() {
    const { data } = this.props;
    const items = this._getLabels(data);

    return (
      <div>
        <span className="index-type">{this.props.title}</span>
        <DiscreteColorLegend 
          orientation="horizontal"
          width={130 * items.length}
          items={items}
           />
        <XYPlot
          width={this.props.width}
          height={this.props.height}
          >
          <HorizontalGridLines />
          {
            Object
              .keys(data)
              .filter(this._filterSelectedLocations)
              .map(this.renderLocation)
          }
          <XAxis tickFormat={v => getMonthName(v)} tickTotal={12} tickLabelAngle={0-60} />
          <YAxis />
        </XYPlot>
      </div>
    )
  }
}

RiskIndexChart.propTypes = {
  data: PropTypes.object.isRequired,
  indexTypes: PropTypes.array.isRequired,
  selectedLocations: PropTypes.array,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  title: PropTypes.string
};

export default RiskIndexChart;