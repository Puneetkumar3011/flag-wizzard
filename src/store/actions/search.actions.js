import {
  FETCH_CONTINENTS,
  SELECT_CONTINENT,
  SELECT_COUNTRY,
  UN_SELECT_COUNTRY,
  CLEAR_FLAG
} from './action-types';

export const fetchContinent = continents => {
  return {
    type: FETCH_CONTINENTS,
    payload: continents
  };
};

export const selectContinent = continent => {
  return {
    type: SELECT_CONTINENT,
    payload: continent
  };
};

export const selectCountry = country => {
  return {
    type: SELECT_COUNTRY,
    payload: country
  };
};

export const unSelectCountry = country => {
  return {
    type: UN_SELECT_COUNTRY,
    payload: country
  };
};

export const clearFlag = () => {
  return {
    type: CLEAR_FLAG,
    payload: null
  };
};
