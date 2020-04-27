import _ from "lodash";
import { clipboard } from "electron";
import { Howl } from 'howler';
import { speakText } from "./aws";

var sound: any = null;
var playing = false;

var speed = 100;
var voice = "Joanna";
// let voices = ['Joanna', 'Salli', 'Kimberly', 'Kendra', 'Ivy', 'Matthew', 'Justin', 'Joey']

const augmentText = (txt: string, speed: number) => {
  return `<speak><prosody rate='${speed}%'>${txt}</prosody></speak>`
}

const setVoice = (newVoice: string) => { voice = newVoice; };
const setSpeed = (newSpeed: number) => { speed = newSpeed; };

const toggleReadClipboard = async () => {
  if (playing) {
    pauseSpeech();
  } else {
    readClipboard();
  }
}

const readClipboard = async () => {
  return readText(clipboard.readText());
};

const readText = async (txt: string) => {
  console.log(`${voice} - ${speed} - \n${txt}`);
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
  setSpeed,
  setVoice,
  toggleReadClipboard,
};