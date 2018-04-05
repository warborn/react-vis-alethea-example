import React, { Component } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import { requestChartData, generateColors } from './utils';

class App extends Component {
  constructor() {
    super();

    this.state = {
      leftPanelData: null,
      hourlyIncidents: null,
      // defaultLocation: 'CkbQjGIBu6PdcGK86-B9', // country: mexico
      defaultLocation: 'DBNOkmIBqBJkAKqCEWkK',
      selectedLocation: null,
      selectedCrimes: new Set(['robbery without violence', 'kidnapping']),
      indexTypes: new Set(),
      rightPanelData: null,
      incidentsByCrimeData: null,
      colors: {}
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
        let newColors = generateColors(this.state.colors, response);
        this.setState({leftPanelData: response, colors: newColors});
      })

    requestChartData('/incidents/stats', {
        'group-by': 'hour',
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
      let newColors = generateColors(this.state.colors, response);
      this.setState({rightPanelData: response, colors: newColors});
    })

    requestChartData('/incidents/historic', {
      // 'locs': ['1kbRjGIBu6PdcGK8sOH-', '2DDVaGIBAxn0xNdLfvl2'],
      'locs': ['iBNRkmIBqBJkAKqCq3BJ'],
      'filters': ['robbery without violence', 'kidnapping']
    })
    .then(response => {
      let newColors = generateColors(this.state.colors, response);
      this.setState({incidentsByCrimeData: response, colors: newColors})
    })
  }

  updateSelectedLocation= (locationId) => {
    let currentData = {...this.state.rightPanelData};
    this.getLocationData(locationId)
      .then(response => {
        let newColors = generateColors(this.state.colors, response);
        this.setState({
          selectedLocation: locationId,
          rightPanelData: {...currentData, ...response},
          colors: newColors
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
      colors,
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
          hourlyIncidents={hourlyIncidents}
          colors={colors} />
        <RightPanel
          indexTypes={indexTypes}
          chartData={rightPanelData}
          incidentsByCrimeData={incidentsByCrimeData}
          selectedCrimes={selectedCrimes}
          selectedLocations={[defaultLocation].concat(selectedLocation || [])}
          updateSelectedLocation={this.updateSelectedLocation}
          updateSelectedIndex={this.updateSelectedIndex}
          colors={colors} />
      </div>
    );
  }
}

export default App;
