import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './search.component.css';

import {
  selectCountry,
  unSelectCountry,
  selectContinent,
  clearFlag
} from '../store/actions/search.actions';

class SearchComponent extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
    mode: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      mode: '',
      filteredSuggestions: [],
      userInput: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.suggestions !== this.props.suggestions) {
      if (
        !this.props.suggestions ||
        !nextProps.suggestions ||
        this.props.suggestions.length !== nextProps.suggestions.length
      )
        this.setState({
          suggestions: nextProps.suggestions,
          filteredSuggestions: [],
          userInput: ''
        });
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ userInput: '' });
    }
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  onChange = e => {
    const { suggestions } = this.state;
    const userInput = e.currentTarget.value;
    if (suggestions && suggestions.length) {
      const filteredSuggestions = suggestions.filter(
        suggestion =>
          suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );

      this.setState({
        filteredSuggestions,
        userInput: e.currentTarget.value
      });
    }
  };

  onContinentClick = suggestion => {
    if (this.props.mode === 'country') return;
    this.props.clearFlag();
    this.setState(
      {
        filteredSuggestions: [],
        userInput: ''
      },
      () => {
        this.props.selectContinent(suggestion);
      }
    );
  };

  onCountrySelect = (event, suggestion) => {
    const { checked } = event.target;
    if (checked) {
      this.props.selectCountry(suggestion);
    } else {
      this.props.unSelectCountry(suggestion);
    }
  };

  getCheckbox = suggestion => {
    if (this.props.mode === 'country') {
      return (
        <input
          className="checkbox"
          onClick={event => this.onCountrySelect(event, suggestion)}
          type="checkbox"
        ></input>
      );
    } else {
      return null;
    }
  };

  getSuggestions = () => {
    const { filteredSuggestions, userInput } = this.state;

    if (userInput) {
      if (filteredSuggestions.length) {
        return (
          <ul ref={this.setWrapperRef} className="suggestions">
            {filteredSuggestions.map(suggestion => {
              return (
                <li key={suggestion.name}>
                  {this.getCheckbox(suggestion)}
                  <span
                    className="name_text"
                    onClick={() => this.onContinentClick(suggestion)}
                  >
                    {suggestion.name}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  render() {
    const { userInput } = this.state;

    return (
      <div className="search">
        <input
          className="search__input"
          type="text"
          onChange={this.onChange}
          value={userInput}
        />
        {this.getSuggestions()}
      </div>
    );
  }
}

export default connect(null, {
  selectContinent,
  selectCountry,
  unSelectCountry,
  clearFlag
})(SearchComponent);
