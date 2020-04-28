import { textStateType } from '../reducers/types';

export const SET_TEXT = 'SET_TEXT';

export function setReaderText(readerText: textStateType) {
  return {
    type: SET_TEXT,
    readerText,
  };
}
