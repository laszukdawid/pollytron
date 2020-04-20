import { clipboard } from "electron";
import { speakText } from "./aws";
import * as store from "../store/configureStore";

var speed = 100;
var voice = "Joanna";
let mCount = 0;
// let voices = ['Joanna', 'Salli', 'Kimberly', 'Kendra', 'Ivy', 'Matthew', 'Justin', 'Joey']


const augmentText = (txt: string, speed: number) => {
  return `<speak><prosody rate='${speed}%'>${txt}</prosody></speak>`
}

const setVoice = (newVoice: string) => { voice = newVoice; };
const setSpeed = (newSpeed: number) => { speed = newSpeed; };

const _readClipboard = (speed: number, voice: string) => {
  const txt = clipboard.readText();
  console.log(txt);
  const augmentedText = augmentText(clipboard.readText(), speed);
  speakText(augmentedText, voice);
}

const readClipboard = () => {
  console.log(`Message: ${mCount++}`)
  const txt = clipboard.readText();
  // const _voice = voices[n++ % voices.length];
  console.log(`${voice} - ${speed} - \n${txt}`);
  const augmentedText = augmentText(txt, speed);
  speakText(augmentedText, voice);
}

export { augmentText, setSpeed, setVoice, readClipboard };