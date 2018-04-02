import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

class RiskIndexOptions extends Component {
  handleSelectOnChange = (e) => {
    this.props.updateSelectedLocation(e.target.value);
  }

  toggleCheckbox = (indexType) => {
    if (this.props.indexTypes.has(indexType)) {
      this.props.updateSelectedIndex(indexType, 'delete');
    } else {
      this.props.updateSelectedIndex(indexType, 'add');
    }
  }

  render() {
    return (
      <form>
        <select defaultValue=""name="location" onChange={this.handleSelectOnChange}>
          <option value="" disabled>Select a location</option>
          {/* <option value="-2v0Y2IB8PNQDz_VS3ks">Ciudad De México</option>
          <option value="HGv0Y2IB8PNQDz_VEHkU">Aguascalientes</option>
          <option value="FGv1Y2IB8PNQDz_VVH3n">Oaxaca</option> */}

          <option value="2DDVaGIBAxn0xNdLfvl2">Ciudad De México</option>
          <option value="-TDVaGIBAxn0xNdLGPjM">Aguascalientes</option>
        </select>
        <Checkbox
            label="Indice Interno"
            handleCheckboxChange={this.toggleCheckbox}
            value="structural" />
        <Checkbox
            label="Indice Externo"
            handleCheckboxChange={this.toggleCheckbox}
            value="dynamic" />
      </form>
    )
  }
}

RiskIndexOptions.propTypes = {
  indexTypes: PropTypes.object.isRequired,
  updateSelectedIndex: PropTypes.func.isRequired,
  updateSelectedLocation: PropTypes.func.isRequired
}

export default RiskIndexOptions;