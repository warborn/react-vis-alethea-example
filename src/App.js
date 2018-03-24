import React, { Component } from 'react';
import IndicesHistoricChart from './components/IndicesHistoricChart';
import HourlyIncidentsChart from './components/HourlyIncidentsChart';
import { requestChartData } from './utils';

class App extends Component {
  constructor() {
    super();

    this.state = {
      locationIndex: null,
      hourlyIncidents: null
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
        this.setState({hourlyIncidents: hours});
      })
  }

  render() {
    const { locationIndex, hourlyIncidents } = this.state;
    console.log(hourlyIncidents);

    return (
      <div className="container">
        <div className="risk-indexes card">
          <span className="tag">Indice de riesgo</span>
          <IndicesHistoricChart 
            width={450}
            height={150}
            title="Indice Interno"
            color="crimson"
            type="structural"
            labelTitle="Nacional" />
          <IndicesHistoricChart 
            width={450}
            height={150}
            title="Indice Institucional"
            color="goldenrod"
            type="dynamic"
            labelTitle="Institucional" />
        </div>
        <div className="separator"></div>
        {
          hourlyIncidents
            ? <div className="hourly-incidents card">
                <span className="tag">Incidentes/Hora</span>
                <HourlyIncidentsChart 
                  width={450}
                  height={150}
                  data={hourlyIncidents} />
              </div>
            : null
        }
      </div>
    );
  }
}

export default App;
