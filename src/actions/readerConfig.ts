import { readerConfigType } from '../reducers/types';

export const SET_READER_CONFIG = 'UPDATE_READER_CONFIG';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_SPEED = 'SET_SPEED';
export const SET_VOICE = 'SET_VOICE';

export function setReaderConfig(config: readerConfigType) {
  return {
    type: SET_READER_CONFIG,
    config,
  };
}

export function setLanguage(language: string) {
  return {
    type: SET_LANGUAGE,
    language,
  }
}

export function setVoice(voice: string) {
  return {
    type: SET_VOICE,
    voice,
  }
}

export function setSpeed(speed: number) {
  return {
    type: SET_SPEED,
    speed,
  }
}
