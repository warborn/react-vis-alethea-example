import React from 'react';
import RiskIndexChart from './RiskIndexChart';
import RiskIndexOptions from './RiskIndexOptions';

const RightPanel = (props) => {
  const { chartData, indexTypes, selectedLocations } = props;

  return (
    <div className="right-panel">
      <RiskIndexOptions 
        indexTypes={indexTypes}
        updateSelectedLocation={props.updateSelectedLocation}
        updateSelectedIndex={props.updateSelectedIndex} />
      {
        chartData 
          ? <div className="risk-indexes card">
              <span className="tag">Indice de riesgo</span>
              <RiskIndexChart 
                width={800}
                height={200}
                indexTypes={[...indexTypes]}
                data={chartData}
                selectedLocations={selectedLocations} />
            </div>
          : null
      }
    </div>   
  )
}

export default RightPanel;