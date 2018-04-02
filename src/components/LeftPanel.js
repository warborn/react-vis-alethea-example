import React from 'react';
import RiskIndexChart from './RiskIndexChart';
import HourlyIncidentsChart from './HourlyIncidentsChart';

const LeftPanel = (props) => {
  const { colors, chartData, hourlyIncidents } = props;
  return (
    <div className="left-panel">
      {
        chartData
          ? <div className="risk-indexes card">
              <span className="tag">Indice de riesgo</span>
              <RiskIndexChart 
                width={450}
                height={150}
                title="Indice Interno"
                indexTypes={["structural"]}
                data={chartData}
                colors={colors} />
              <RiskIndexChart 
                width={450}
                height={150}
                title="Indice Institucional"
                indexTypes={["dynamic"]}
                data={chartData}
                colors={colors} />
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
  )
}

export default LeftPanel;