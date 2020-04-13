import React, { useState} from "react";
import styles from './Reader.css';
import { speakText } from "../controllers/aws";

type langVoices = {
  english: string[],
  polish: string[],
}

const voicePerLanguage: langVoices  = {
  'english': ['Joanna', 'Salli', 'Kimberly', 'Kendra', 'Ivy', 'Matthew', 'Justin', 'Joey'],
  'polish': ['Ewa', 'Maja', 'Jan', 'Jacek'],
}

export default function Reader() {
  const [readText, setReadText] = useState("");
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
    setVoice(voicePerLanguage[lang][0]);
  };

  const voiceOptions = voicePerLanguage[language].map(
    (voice: string) => <option key={voice} value={voice}>{voice}</option>);
  
  const voiceSelector = (
    <select value={voice} onChange={ev => setVoice(ev.target.value)} >
     {voiceOptions} 
    </select>);

  const onSubmit = () => {
    const augmentedText = augmentText(readText);
    speakText(augmentedText, voice);
  }

  const augmentText = (txt: string) => {
    return `<speak><prosody rate='${speed}%'>${txt}</prosody></speak>`
  }

  return (
    <div>
      <form onSubmit={onSubmit} >
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
            <input type="number" value={speed} onChange={ev => setSpeed(Number(ev.target.value))} />
          </div>
        </div>
        <div className={styles.readtext}>
          <span>Type to send:</span>
          <textarea value={readText} onChange={ev => setReadText(ev.target.value)} />
        </div>
        <button type="submit">Read</button>
      </form>
    </div>
  );
}
