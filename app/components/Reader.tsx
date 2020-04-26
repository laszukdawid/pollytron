import { ipcRenderer } from "electron";
import React, { useState} from "react";
import styles from './Reader.css';
import { speakText } from "../controllers/aws";
import * as reader from "../controllers/reader";
import { readerStateType } from "../reducers/types";

type ReaderProps = {
  readText: readerStateType,
  setReadText: Function,
}

type langVoices = {
  english: string[],
  polish: string[],
}

const voicePerLanguage: langVoices  = {
  'english': ['Joanna', 'Salli', 'Kimberly', 'Kendra', 'Ivy', 'Matthew', 'Justin', 'Joey'],
  'polish': ['Ewa', 'Maja', 'Jan', 'Jacek'],
}

ipcRenderer.on('speak', (event, args) => {
  console.log("IPC Renderer");
  reader.readClipboard();
});

export default function Reader(props: ReaderProps) {
  const [language, setLanguage] = useState("english");
  const [voice, setVoice] = useState("Joanna");
  const [speed, setSpeed] = useState(100);

  const languageSelector = (
    <select value={language} onChange={ev => changeLanguage(ev.target.value)} >
      <option value="english">English</option>
      <option value="polish">Polish</option>
    </select>);

  const changeLanguage = (lang: string) => {
    if (lang != 'english' && lang != 'polish') {
      return
    }
    setLanguage(lang);
    _setVoice(voicePerLanguage[lang][0]);
  };

  const _setVoice = (newVoice: string) => {
    reader.setVoice(newVoice);
    setVoice(newVoice);
  }
  const _setSpeed = (newSpeed: number) => {
    reader.setSpeed(newSpeed);
    setSpeed(newSpeed);
  };

  const voiceOptions = voicePerLanguage[language].map(
    (voice: string) => <option key={voice} value={voice}>{voice}</option>);
  
  const voiceSelector = (
    <select value={voice} onChange={ev => _setVoice(ev.target.value)} >
     {voiceOptions} 
    </select>);

  const onSubmit = () => {
    const augmentedText = reader.augmentText(props.readText, speed);
    speakText(augmentedText, voice);
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
          <textarea className={styles.textarea} value={props.readText} onChange={ev => props.setReadText(ev.target.value)} />
          <button type="submit" onClick={onSubmit} >Read</button>
          <button type="submit" onClick={reader.readClipboard} >Read from clipboard</button>
        </div>
      </div>
  );
}
