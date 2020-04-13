import { AnyAction } from 'redux';
import { awsConfigType } from '../types';
import { UPDATE_AWS_CONFIG } from '../actions/config';

const initConfigState: awsConfigType = {
    region: '',
    accessKeyId: '',
    secretAccessKey: '',
};

export default function config(state: awsConfigType=initConfigState, action: AnyAction) {
  switch (action.type) {
    case UPDATE_AWS_CONFIG:
      return {...state, ...action.newConfig}
    default:
      return state;
  }
}

