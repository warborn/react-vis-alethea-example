import React, { Component } from 'react';
import IndicesHistoricChart from './components/IndicesHistoricChart';
import HourlyIncidentsChart from './components/HourlyIncidentsChart';
import { requestChartData } from './utils';

class App extends Component {
  constructor() {
    super();

    this.state = {
      locs: ['ASHcU2IBmS_KBCrJjyWd'],
      indexes: null,
      hourlyIncidents: null
    }
  }

  componentWillMount() {
    const indexesEndpoint = '/indices/historic';
    const indexesParams = {
      'locs': this.state.locs,
      'index': ['structural', 'dynamic'],
      'size': '100'
    }

    const incidentsEndpoint = '/incidents/by-hour';
    const incidentsParams = {
      'locs': [],
      'filters': ['efv']
    }

    requestChartData(indexesEndpoint, indexesParams)
      .then(response => {
        const locations = response.data;
        this.setState({indexes: locations});
      })

    requestChartData(incidentsEndpoint, incidentsParams)
      .then(response => {
        const hours = response.data;
        this.setState({hourlyIncidents: hours});
      })
  }

  render() {
    const { locs, indexes, hourlyIncidents } = this.state;

    return (
      <div className="container">
        {
          indexes 
            ? <div className="risk-indexes card">
                <span className="tag">Indice de riesgo</span>
                <IndicesHistoricChart 
                  width={450}
                  height={150}
                  title="Indice Interno"
                  color="crimson"
                  type="structural"
                  labelTitle="Nacional"
                  data={indexes}
                  locs={locs} />
                <IndicesHistoricChart 
                  width={450}
                  height={150}
                  title="Indice Institucional"
                  color="goldenrod"
                  type="dynamic"
                  labelTitle="Institucional"
                  data={indexes}
                  locs={locs} />
              </div>
            : null
        }
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
