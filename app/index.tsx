import throttle from "lodash/throttle";
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { updateAwsConfig } from "./controllers/aws";
import { configureStore, history } from './store/configureStore';
import { loadState, saveState } from './store/localStore';
import './app.global.css';

const persistedState = loadState()
const store = configureStore(persistedState);

// Evoke with every change to the state. Added 5s throttle because `reatText` changes with every letter typed.
// Even though potentially that can be a burst of IO, the expection of the app is to copy/past reads, and not
// write directly, so leaving as is, unless there's a case for change.
store.subscribe(throttle(() => {
  saveState({
    awsConfig: store.getState().awsConfig,
  })
}, 5000));

if (persistedState) {
  updateAwsConfig(persistedState.awsConfig)
}

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
);
