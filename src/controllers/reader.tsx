import _ from 'lodash';
import { Howl } from 'howler';
import { speakText } from './aws';
import { readerConfigType } from '../reducers/types';

var sound: any = null;
var playing = false;

var config: readerConfigType = {
  language: 'english',
  speed: 100,
  voice: 'Joanna', // ['Joanna', 'Salli', 'Kimberly', 'Kendra', 'Ivy', 'Matthew', 'Justin', 'Joey']
}

window.electron.ipcRenderer.on('read-text', (text) => {
  console.log('IPC Renderer');
  console.log(text)
  readText(text, config);
});

const updateConfig = (newConfig: readerConfigType) => {
  config = { ...newConfig };
}

const augmentText = (txt: string, speed: number) => {
  let _txt = txt.replace(/&/g, ' and ');
  return `<speak><prosody rate='${speed}%'>${_txt}</prosody></speak>`;
}

const setVoice = (newVoice: string) => { config['voice'] = newVoice; };
const setSpeed = (newSpeed: number) => { config['speed'] = newSpeed; };

const toggleReadClipboard = async () => {
  if (playing) {
    pauseSpeech();
  } else {
    readClipboard();
  }
}

const readClipboard = async () => {
  console.log("reader.readClipboard")
  window.electron.ipcRenderer.readClipboard()
};

const readText = async (txt: string, config: readerConfigType) => {
  const { voice, speed } = config;
  const augmentedText = augmentText(txt, speed);
  const howlSource: string[] = await speakText(augmentedText, voice);
  sound = new Howl({
    src: howlSource,
    onplay: () => {
      playing = true
    },
    onend: () => {
      playing = false
    }
  });

  sound.play()
}

function pauseSpeech() {
  if (playing) {
    sound.pause();
    playing = false;
  }
  if (!_.isNil(sound)) {
    sound.pause()
  }
}

export {
  augmentText,
  pauseSpeech,
  readClipboard,
  readText,
  updateConfig,
  setSpeed,
  setVoice,
  toggleReadClipboard,
};