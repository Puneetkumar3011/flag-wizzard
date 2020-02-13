import {
  FETCH_CONTINENTS,
  SELECT_CONTINENT,
  SELECT_COUNTRY,
  UN_SELECT_COUNTRY,
  CLEAR_FLAG
} from '../actions/action-types';

const initialState = {
  continents: [],
  selectedContinent: {},
  selectedCountries: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTINENTS:
      return {
        ...state,
        continents: action.payload
      };
    case SELECT_CONTINENT:
      return {
        ...state,
        selectedContinent: action.payload,
        selectedCountries: []
      };
    case SELECT_COUNTRY:
      return {
        ...state,
        selectedCountries: [...state.selectedCountries, action.payload]
      };
    case UN_SELECT_COUNTRY:
      return {
        ...state,
        selectedCountries: state.selectedCountries.filter(
          country => country.name !== action.payload.name
        )
      };
    case CLEAR_FLAG:
      return {
        ...state,
        selectedContinent: {},
        selectedCountries: []
      };
    default:
      return state;
  }
}
