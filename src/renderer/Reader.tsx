import React, { useState } from "react";
import './Reader.css';
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

function Reader(props: ReaderProps) {

  const [language, setLanguage] = useState(props.readerConfig.language);
  const [voice, setVoice] = useState(props.readerConfig.voice);
  const [speed, setSpeed] = useState(props.readerConfig.speed);
  const [wikiFilter, setWikiFilter] = useState(false);

  const languageSelector = (
    <select value={language} onChange={ev => changeLanguage(ev.target.value)} >
      <option value="english">English</option>
      <option value="polish">Polish</option>
    </select>
  );

  const changeLanguage = (newLanguage: string) => {
    if (newLanguage != 'english' && newLanguage != 'polish') {
      return
    }
    const newVoice = voicePerLanguage[newLanguage][0];
    props.setReaderConfig({ language: newLanguage, speed, voice: newVoice })

    setLanguage(newLanguage);
    _setVoice(voicePerLanguage[newLanguage][0]);
  };

  const _setVoice = (newVoice: string) => {
    reader.setVoice(newVoice);
    props.setReaderConfig({ language, speed, voice: newVoice })
    setVoice(newVoice);
  }
  const _setSpeed = (newSpeed: number) => {
    reader.setSpeed(newSpeed);
    props.setReaderConfig({ language, voice, speed: newSpeed })
    setSpeed(newSpeed);
  };

  const voiceOptions = voicePerLanguage[language].map(
    (voice: string) => <option key={voice} value={voice}>{voice}</option>);

  const voiceSelector = (
    <select value={voice} onChange={ev => _setVoice(ev.target.value)} >
      {voiceOptions}
    </select>);

  const applyWikiFilter = () => {
    props.setReaderText(props.readerText.replace(/\[\d+(,\s*\d+)*\]/g, ''));
  }

  const onSubmit = () => {
    let text = props.readerText;
    if (wikiFilter) {
      text = text.replace(/\[\d+(,\s*\d+)*\]/g, '');
    }
    reader.readText(text, props.readerConfig);
  }


  return (
    <div className="reader" onSubmit={onSubmit} >
      <div className="readerconf">
        <span>Language:</span>
        {languageSelector}

        <span>Voice:</span>
        {voiceSelector}

        <span>Speed:</span>
        <input type="number" value={speed} onChange={ev => _setSpeed(Number(ev.target.value))} />

        <span>Wiki citation:</span>
        <input type="checkbox" checked={wikiFilter} onChange={ev => setWikiFilter(!wikiFilter)}></input>
      </div>
      <div className="readtext">
        <span>Type to send:</span>
        <textarea className="textarea" value={props.readerText} onChange={ev => props.setReaderText(ev.target.value)} />
        <button type="submit" onClick={onSubmit} >Read</button>
        <button type="submit" onClick={reader.readClipboard} >Read from clipboard</button>
        <button onClick={applyWikiFilter} >Wiki filter</button>
      </div>
    </div>
  );
}



export default Reader;