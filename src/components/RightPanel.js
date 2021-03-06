import React from 'react';
import RiskIndexChart from './RiskIndexChart';
import RiskIndexOptions from './RiskIndexOptions'
import IncidentsByCrimeChart from './IncidentsByCrimeChart';

const RightPanel = (props) => {
  const { colors, chartData, indexTypes, selectedLocations, selectedCrimes, incidentsByCrimeData } = props;

  return (
    <div className="right-panel">
      <RiskIndexOptions 
        indexTypes={indexTypes}
        updateSelectedLocation={props.updateSelectedLocation}
        updateSelectedIndex={props.updateSelectedIndex} />
      {
        chartData
          ? <div className="risk-indexes card">
              <RiskIndexChart 
                width={800}
                height={200}
                indexTypes={[...indexTypes]}
                data={chartData}
                selectedLocations={selectedLocations}
                colors={colors}
                multipleIndexes={true} />
            </div>
          : null
      }
      {
        incidentsByCrimeData
          ? <div className="risk-indexes card">
              <IncidentsByCrimeChart 
                width={800}
                height={200}
                data={incidentsByCrimeData}
                // selectedLocations={['1kbRjGIBu6PdcGK8sOH-']}
                selectedLocations={['OhWBrGIByY4u4kozCepw']} // hardcoded ID for mexico city
                crimeTypes={[...selectedCrimes]}
                colors={colors} />
            </div>
          : null
      }
    </div>   
  )
}

export default RightPanel;