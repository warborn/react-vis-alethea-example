import React, { Component } from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries
  } from 'react-vis';
  import axios from 'axios';
import { HOST, TOKEN, objectToQueryString } from '../utils';

class IndicesHistoricChart extends Component {
    constructor() {
        super();

        this.state = {
          data: {}
        }
    }

    componentWillMount() {
        const url = `${HOST}/graphics/indices/historic`;

        const params = {
          'token': TOKEN,
          'locs': ['ps3VSmIBLhTQ-ucWIt2G', 'yM3VSmIBLhTQ-ucWlt7l'],
          'index': ['structural', 'dynamic'],
          'size': '100'
        }
    
        const queryString = objectToQueryString(params);
    
        const path = `${url}?${queryString}`;
        axios.get(path)
          .then(response => {
            const locations = response.data.data;
            this.setState({data: locations});
          });
    }

    getPoints = (location) => {
        let points = location['dynamic_index'].map((points, index) => ({x: index, y: points.y}));
        console.log(points);
        return points;
    }

    render() {
        const { data } = this.state;
        return (
            <XYPlot
                width={500}
                height={300}>
                <HorizontalGridLines />
                {
                    data ? 
                        Object.keys(data).map(locationId => {
                            return <LineSeries 
                                key={locationId} 
                                data={this.getPoints(data[locationId])} />
                        })
                        : null
                }
                {/* <LineSeries data={[
                {x: 0, y: 0},
                {x: 1, y: 10},
                {x: 3, y: 15}
                ]} />
                <LineSeries data={[
                {x: 0, y: 5},
                {x: 2, y: 10},
                {x: 3, y: 2}
                ]} />
                */}
                <XAxis />
                <YAxis />
            </XYPlot>
        )
    }
}

export default IndicesHistoricChart;