import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	XYPlot,
	XAxis,
	YAxis,
	DiscreteColorLegend,
	MarkSeries
} from 'react-vis';
import { getMonthName } from '../utils';

class IncidentsByCrimeChart extends Component {
	_mapArrayToPoints = (array) => {
		return array.map(point => ({x: new Date(point.x), y: point.y, size: 1}))
	}

	_filterSelectedLocations = (locationId) => {
    const { selectedLocations } = this.props;
    return !selectedLocations ? true : selectedLocations.includes(locationId)
  }

  _getLabels = (data) => {
    return Object
      .keys(data)
      .filter(this._filterSelectedLocations)
      .reduce((items, locationId) => {
				let { name } = data[locationId];
				
				let labels = Object
					.keys(data[locationId].incidents)
					.map(crimeType => ({
						title: `${crimeType} (${name.toUpperCase()})`,
						color: this.props.colors[locationId]['incidents'][crimeType]
					}));
				return items.concat(labels);
      }, []);
	}
	
	renderLocation = (locationId) => {
		let location = this.props.data[locationId];

		return Object
			.keys(location.incidents)
			.filter(crimeType => this.props.crimeTypes.includes(crimeType))
			.map(crimeType => this.renderMarkSeries(locationId, crimeType))
	}

	renderMarkSeries = (locationId, crimeType) => {
		let location = this.props.data[locationId];
		let color = this.props.colors[locationId]['incidents'][crimeType];

		return (
			<MarkSeries
				key={locationId + crimeType}
				strokeWidth={1}
				sizeRange={[1, 4]}
				data={this._mapArrayToPoints(location['incidents'][crimeType])}
				color={color}>
			</MarkSeries>
		)
	}

	render() {
		const { data } = this.props;
		const items = this._getLabels(data);

		return (
			<div>
				<DiscreteColorLegend 
					orientation="horizontal"
					width={250 * items.length} 
					items={items} />
				<XYPlot
					width={this.props.width}
					height={this.props.height}
					className="hide-lines">
					{
						Object
							.keys(data)
							.filter(this._filterSelectedLocations)
							.map(this.renderLocation)
					}
          <XAxis hideLine={true} tickFormat={v => getMonthName(v)} tickTotal={5} tickLabelAngle={-60} />
          <YAxis hideLine={true} />
				</XYPlot>
			</div>
		)
	}
}

IncidentsByCrimeChart.propTypes = {
  data: PropTypes.object.isRequired,
  selectedLocations: PropTypes.array,
  crimeTypes: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default IncidentsByCrimeChart;