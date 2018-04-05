import React from 'react';
import RiskIndexChart from './RiskIndexChart';
import IncidentsChart from './IncidentsChart';

const LeftPanel = (props) => {
  const { colors, chartData, hourlyIncidents, dailyIncidents } = props;
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
              <IncidentsChart 
                width={450}
                height={150}
                data={hourlyIncidents}
                type={'hourly'} />
            </div>
          : null
      }
      {
        dailyIncidents
          ? <div className="hourly-incidents card">
              <span className="tag">Incidentes/Día</span>
              <IncidentsChart 
                width={450}
                height={150}
                data={dailyIncidents}
                type={'daily'} />
            </div>
          : null
      }
    </div>   
  )
}

export default LeftPanel;