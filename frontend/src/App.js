import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

// Redux

import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <h1> Glassdoor </h1>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
