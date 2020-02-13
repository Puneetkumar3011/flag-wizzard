import React from 'react';

import Root from './store';
import HomeComponent from './home/home.component';
import './app.css';

function App() {
  return (
    <Root>
      <HomeComponent />
    </Root>
  );
}

export default App;
