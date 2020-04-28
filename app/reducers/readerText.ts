import { AnyAction } from 'redux';
import { SET_TEXT } from '../actions/readerText';
import { textStateType } from './types';

const initReaderState: textStateType = "Hello there";

export default function readText(state = initReaderState, action: AnyAction) {
  switch (action.type) {
    case SET_TEXT:
      return action.readerText;
    
    default:
      return state
  }
}