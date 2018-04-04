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
          {/* <option value="6kbRjGIBu6PdcGK8SuAY">Ciudad De México</option>
          <option value="C0bQjGIBu6PdcGK86-DT">Aguascalientes</option>
          <option value="BEbSjGIBu6PdcGK8i-S4">Oaxaca</option> */}

          <option value="7BNOkmIBqBJkAKqCgWl0">Ciudad De México</option>
          <option value="DRNOkmIBqBJkAKqCEml9">Aguascalientes</option>
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