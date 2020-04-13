import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import ConfigPage from './containers/ConfigPage';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.CONFIG} component={ConfigPage} />
        <Route path={routes.COUNTER} component={CounterPage} />
        {/* This needs to be the last, otherwise all falls under / */}
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
