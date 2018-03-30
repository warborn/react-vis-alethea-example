import React, { Component } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import { requestChartData } from './utils';

class App extends Component {
  constructor() {
    super();

    this.state = {
      leftPanelData: null,
      hourlyIncidents: null,
      // defaultLocation: 'G2v0Y2IB8PNQDz_VD3nf', // country: mexico
      defaultLocation: '-DDVaGIBAxn0xNdLGPhn',
      selectedLocation: null,
      selectedCrimes: new Set(['robbery without violence', 'kidnapping']),
      indexTypes: new Set(),
      rightPanelData: null,
      incidentsByCrimeData: null
    }
  }

  componentWillMount() {
    // request to fill the charts on the left panel
    requestChartData('/indices/historic', {
        'locs': this.state.defaultLocation,
        'index': ['structural', 'dynamic'],
        'size': '12'
      })
      .then(response => {
        const locations = response;
        this.setState({leftPanelData: locations});
      })

    requestChartData('/incidents/by-hour', {
        'locs': [],
        'filters': ['efv']
      })
      .then(response => {
        const hours = response.data;
        this.setState({hourlyIncidents: hours});
      })

    // requests to fill the chart on the right panel
    requestChartData('/indices/historic', {
      'locs': this.state.defaultLocation,
      'index': ['structural', 'dynamic'],
      'size': '12'
    })
    .then(response => {
      this.setState({rightPanelData: response});
    })

    requestChartData('/incidents/historic', {
      'locs': ['xDDVaGIBAxn0xNdL4Prk', '2DDVaGIBAxn0xNdLfvl2'],
      'filters': ['robbery without violence', 'kidnapping']
    })
    .then(response => {
      this.setState({incidentsByCrimeData: response})
    })
  }

  updateSelectedLocation= (locationId) => {
    let currentData = {...this.state.rightPanelData};
    this.getLocationData(locationId)
      .then(response => {
        this.setState({
          selectedLocation: locationId,
          rightPanelData: {...currentData, ...response}
        })
      });
  }
  
  updateSelectedIndex = (indexType, action) => {
    let updatedIndexTypes = new Set(this.state.indexTypes);
    if(action === 'add') {
      updatedIndexTypes.add(indexType);
    } else if(action === 'delete') {
      updatedIndexTypes.delete(indexType);
    }
    this.setState({indexTypes: updatedIndexTypes});
  }

  getLocationData = (locationId) => {
    return requestChartData('/indices/historic', {
      'locs': [locationId],
      'index': ['structural', 'dynamic'],
      'size': '12'
    });
  }

  render() {
    const { 
      leftPanelData, 
      hourlyIncidents,
      indexTypes, 
      rightPanelData,
      incidentsByCrimeData,
      selectedLocation,
      selectedCrimes,
      defaultLocation
    } = this.state;

    return (
      <div className="container">
        <LeftPanel 
          chartData={leftPanelData}
          hourlyIncidents={hourlyIncidents} />
        <RightPanel
          indexTypes={indexTypes}
          chartData={rightPanelData}
          incidentsByCrimeData={incidentsByCrimeData}
          selectedCrimes={selectedCrimes}
          selectedLocations={[defaultLocation].concat(selectedLocation || [])}
          updateSelectedLocation={this.updateSelectedLocation}
          updateSelectedIndex={this.updateSelectedIndex} />
      </div>
    );
  }
}

export default App;
