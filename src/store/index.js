import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

// const initialState = {};

// const store = createStore(rootReducer, initialState);

// export default store;

export default ({ children, initialState = {} }) => {
  const store = createStore(rootReducer, initialState);

  return <Provider store={store}>{children}</Provider>;
};
