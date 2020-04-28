import { AnyAction } from 'redux';
import { SET_TEXT } from '../actions/reader';
import { textStateType } from './types';

const initReaderState: textStateType = "Hello there";

export default function reader(state = initReaderState, action: AnyAction) {
  switch (action.type) {
    case SET_TEXT:
      return action.readText;
    
    default:
      return state
  }
}