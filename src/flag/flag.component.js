import React, { Component } from 'react';
import { connect } from 'react-redux';

class FlagComponent extends Component {
  dipsplayFlas = () => {
    const { selectedCountries } = this.props.search;
    if (selectedCountries && selectedCountries.length) {
      return selectedCountries.map(country => {
        return <span key={country.values.name}>{country.values.flag}</span>;
      });
    } else {
      return null;
    }
  };

  render() {
    return <div>{this.dipsplayFlas()}</div>;
  }
}

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps)(FlagComponent);
