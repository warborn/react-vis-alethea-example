import React, { Component } from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries
  } from 'react-vis';
  import axios from 'axios';
import { HOST, objectToQueryString } from '../utils';

class IndicesHistoricChart extends Component {
    constructor() {
        super();

        this.state = {
          data: {}
        }
    }

    componentWillMount() {
        const url = `${HOST}/graphics/indices/historic`;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI5NjJkNDI5My0yYTFjLTQyNDMtODZkOS04MzRmNjE0ZmNiZDUiLCJzZWNyZXQiOiIzYWRiYWYwZC03NjEyLTRlMDAtYjhiOC1mOTBlMmFkOTQyYWQiLCJpYXQiOjE1MjE3NDAzODQsImV4cCI6MTUyMjM0NTE4NH0.GH6pS6-C9c9f3yDH8KhLq8UdkF9befFEM70Nm-HnIsY';
        
        const params = {
          'token': token,
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
        // console.log(location['dynamic_index']);
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