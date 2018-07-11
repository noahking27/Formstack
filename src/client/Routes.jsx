import React from 'react';
import { Route, BrowserRouter as Router, browserHistory } from 'react-router-dom';
import WinesWithData from './components/container/WinesWithData';

function Routes() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={WinesWithData} />
    </Router>
  );
}

export default Routes;
