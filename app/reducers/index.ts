import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import counter from './counter';
import awsConfig from './config';
import readText from './reader';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    awsConfig,
    readText,
    counter
  });
}
