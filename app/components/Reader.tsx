import { ipcRenderer } from "electron";
import React, { useState } from "react";
import styles from './Reader.css';
import * as reader from "../controllers/reader";
import { textStateType, readerConfigType } from "../reducers/types";

type ReaderProps = {
  readerConfig: readerConfigType,
  readerText: textStateType,
  setReaderConfig: Function,
  setReaderText: Function,
}

type langVoices = {
  english: string[],
  polish: string[],
}

const voicePerLanguage: langVoices = {
  'english': ['Joanna', 'Salli', 'Kimberly', 'Kendra', 'Ivy', 'Matthew', 'Justin', 'Joey'],
  'polish': ['Ewa', 'Maja', 'Jan', 'Jacek'],
}

ipcRenderer.on('speak', (event, args) => {
  console.log('IPC Renderer');
  reader.toggleReadClipboard();
});

export default function Reader(props: ReaderProps) {
  const [language, setLanguage] = useState(props.readerConfig.language);
  const [voice, setVoice] = useState(props.readerConfig.voice);
  const [speed, setSpeed] = useState(props.readerConfig.speed);

  const languageSelector = (
    <select value={language} onChange={ev => changeLanguage(ev.target.value)} >
      <option value="english">English</option>
      <option value="polish">Polish</option>
    </select>);

  const changeLanguage = (newLanguage: string) => {
    if (newLanguage != 'english' && newLanguage != 'polish') {
      return
    }
    const newVoice = voicePerLanguage[newLanguage][0];
    props.setReaderConfig({language: newLanguage, speed, voice: newVoice})

    setLanguage(newLanguage);
    _setVoice(voicePerLanguage[newLanguage][0]);
  };

  const _setVoice = (newVoice: string) => {
    reader.setVoice(newVoice);
    props.setReaderConfig({language, speed, voice: newVoice})
    setVoice(newVoice);
  }
  const _setSpeed = (newSpeed: number) => {
    reader.setSpeed(newSpeed);
    props.setReaderConfig({language, voice, speed: newSpeed})
    setSpeed(newSpeed);
  };

  const voiceOptions = voicePerLanguage[language].map(
    (voice: string) => <option key={voice} value={voice}>{voice}</option>);

  const voiceSelector = (
    <select value={voice} onChange={ev => _setVoice(ev.target.value)} >
      {voiceOptions}
    </select>);

  const onSubmit = () => {
    reader.readText(props.readerText, props.readerConfig);
  }

  return (
    <div className={styles.reader} onSubmit={onSubmit} >
      <div className={styles.readconf}>
        <div className={styles.row}>
          <span>Language:</span>
          {languageSelector}
        </div>
        <div className={styles.row}>
          <span>Voice:</span>
          {voiceSelector}
        </div>
        <div className={styles.row}>
          <span>Speed:</span>
          <input type="number" value={speed} onChange={ev => _setSpeed(Number(ev.target.value))} />
        </div>
      </div>
      <div className={styles.readtext}>
        <span>Type to send:</span>
        <textarea className={styles.textarea} value={props.readerText} onChange={ev => props.setReaderText(ev.target.value)} />
        <button type="submit" onClick={onSubmit} >Read</button>
        <button type="submit" onClick={reader.readClipboard} >Read from clipboard</button>
      </div>
    </div>
  );
}
