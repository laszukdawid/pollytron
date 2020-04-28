import { AnyAction } from 'redux';
import * as actions from '../actions/readerConfig';
import { readerConfigType } from './types';

const initConfigState: readerConfigType = {
  language: 'english',
  voice: 'Joanna',
  speed: 100,
};

export default function config(state: readerConfigType=initConfigState, action: AnyAction) {
  switch (action.type) {
    case actions.SET_READER_CONFIG:
      return {...state, ...action.config}
    case actions.SET_LANGUAGE:
      return { ...state, language: state.language}
    case actions.SET_VOICE:
      return { ...state, voice: state.voice}
    case actions.SET_SPEED:
      return { ...state, speed: state.speed}
    default:
      return state;
  }
}

