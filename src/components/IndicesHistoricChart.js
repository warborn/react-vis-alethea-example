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
        // to draw a line react-vis needs an array of objects with the following form:
        // [
        //     {x: val, y: val},
        //     {x: val, y: val},
        //     {x: val, y: val},
        // ]

        // here I use the index of the array as the XAxis value instead of the date
        return location['dynamic_index']
                .map((point, index) => ({x: index, y: point.y}));
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <h3>INDICE DE RIESGO</h3>
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
                    <XAxis title="Mes" />
                    <YAxis title="Indice Interno"/>
                </XYPlot>
            </div>
        )
    }
}

export default IndicesHistoricChart;