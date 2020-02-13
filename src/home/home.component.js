import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchContinent, clearFlag } from '../store/actions/search.actions';
import SearchComponent from '../search/search.component';
import FlagComponent from '../flag/flag.component';
import './home.component.css';
const continentsData = require('../search/continents.json');

class HomeComponent extends Component {
  state = {
    continents: [],
    selectedContinent: {},
    selectedCountry: {}
  };

  componentDidMount() {
    this.props.fetchContinent(continentsData);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.search !== prevState.search) {
      return {
        continents: nextProps.search.continents,
        selectedContinent: nextProps.search.selectedContinent
      };
    } else {
      return null;
    }
  }

  getContinents = continents => {
    const list = [];
    continents.forEach(item => {
      list.push({ name: item.continent, values: item.countries });
    });
    return list;
  };

  getCountries = selectedContinent => {
    const countries = [];
    if (selectedContinent && selectedContinent.values) {
      selectedContinent.values.forEach(item => {
        countries.push({ name: item.name, values: item });
      });
      return countries;
    } else {
      return null;
    }
  };

  displaySelectedFlag = () => {
    if (this.props.search.selectedCountries.length) {
      return (
        <div className="col">
          <span className="wizard__labal">Selected Flag:</span>
          <span className="wizard__labal__text">
            &nbsp;
            <FlagComponent />
          </span>
          <button
            className="btn btn-primary"
            onClick={() => this.props.clearFlag()}
          >
            Clear flags
          </button>
        </div>
      );
    } else {
      return <div className="col">&nbsp;</div>;
    }
  };

  render() {
    const { continents, selectedContinent } = this.state;
    return (
      <div className="home">
        <div className="header">Flag Picker</div>
        <div className="header__text">
          This app will help you to learn flags around the world in 3 steps
        </div>
        <div className="wizard">
          <div className="row">
            <div className="col">
              <span className="wizard__labal">Step1</span>
              <span className="wizard__labal__text">Select a continent.</span>
              <SearchComponent
                mode="continent"
                suggestions={this.getContinents(continents)}
              />
              <span className="wizard__labal__text">
                You selected: {selectedContinent.name}
              </span>
            </div>
            <div className="col">
              <span className="wizard__labal">Step2</span>
              <span className="wizard__labal__text">
                Now, select a country.
              </span>
              <SearchComponent
                mode="country"
                suggestions={this.getCountries(selectedContinent)}
              />
            </div>
            {this.displaySelectedFlag()}
          </div>
        </div>
      </div>
    );
  }
}

HomeComponent.propTypes = {
  search: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps, { fetchContinent, clearFlag })(
  HomeComponent
);
