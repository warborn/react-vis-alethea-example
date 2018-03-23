import React, { Component } from 'react';
import IndicesHistoricChart from './components/IndicesHistoricChart';
import HourlyIncidentsChart from './components/HourlyIncidentsChart';

class App extends Component {

  render() {
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
        <div className="hourly-incidents card">
          <span className="tag">Incidentes/Hora</span>
          <HourlyIncidentsChart 
            width={450}
            height={150} />
        </div>
      </div>
    );
  }
}

export default App;
