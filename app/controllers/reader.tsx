import { clipboard } from "electron";
import { speakText } from "./aws";

var speed = 100;
var voice = "Joanna";
// let voices = ['Joanna', 'Salli', 'Kimberly', 'Kendra', 'Ivy', 'Matthew', 'Justin', 'Joey']

const augmentText = (txt: string, speed: number) => {
  return `<speak><prosody rate='${speed}%'>${txt}</prosody></speak>`
}

const setVoice = (newVoice: string) => { voice = newVoice; };
const setSpeed = (newSpeed: number) => { speed = newSpeed; };

const readClipboard = () => {
  const txt = clipboard.readText();
  // const _voice = voices[n++ % voices.length];
  console.log(`${voice} - ${speed} - \n${txt}`);
  const augmentedText = augmentText(txt, speed);
  speakText(augmentedText, voice);
}

export { augmentText, setSpeed, setVoice, readClipboard };