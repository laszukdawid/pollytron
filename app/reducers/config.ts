import { AnyAction } from 'redux';
import { UPDATE_AWS_CONFIG } from '../actions/config';
import { awsConfigType } from './types';

const initConfigState: awsConfigType = {
  region: '',
  accessKeyId: '',
  secretAccessKey: '',
};

export default function config(state: awsConfigType=initConfigState, action: AnyAction) {
  switch (action.type) {
    case UPDATE_AWS_CONFIG:
      return {...state, ...action.config}
    default:
      return state;
  }
}

