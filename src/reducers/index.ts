import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import awsConfig from './awsConfig';
import readerText from './readerText';
import readerConfig from './readerConfig';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    awsConfig,
    readerText,
    readerConfig,
  });
}
