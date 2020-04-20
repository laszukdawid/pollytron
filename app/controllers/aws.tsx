import AWS, { Polly } from "aws-sdk";
import { Howl } from 'howler';
import { awsConfigType } from '../types';
import btoa from "btoa";

// Initialize the Amazon Cognito credentials provider
AWS.config.update({
  region: "",
  accessKeyId: "",
  secretAccessKey: "",
});

const polly = new Polly({apiVersion: '2016-06-10'});

///// !! This is unlikely going to work in current situation.
///// That seems becausae the AWS sdk is intendent for the node.js use whereas the Electron
///// is simulating the browser. 
///// Probably need to figure out either (a) how to convert Electron to behave more like a nodejs,
///// (b) or find AWS sdk for the browser, or (c) just let it go.
// const credentials = new AWS.SharedIniFileCredentials({profile: 'polly'})
// console.log(credentials)
// AWS.config.credentials = credentials;

export function updateAwsConfig(awsConfig: awsConfigType) {
    AWS.config.update(awsConfig);
}

// Function invoked by button click
export function speakText(text: string, voiceId: string) {
  // Create the JSON parameters for getSynthesizeSpeechUrl
  const speechParams = {
    OutputFormat: "mp3",
    SampleRate: "16000",
    Text: text,
    TextType: "ssml",
    VoiceId: voiceId
  };
  // Create the Polly service object and presigner object

  polly.synthesizeSpeech(speechParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    }

    let arrayBuffer = Uint8Array.from(data.AudioStream).buffer;
    let base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const howlSource = ["data:audio/mp3;base64," + base64String];

      const sound = new Howl({
      src: howlSource,
      // volume: 1.0,
      // html5: true,
      });
      sound.play()

  });
}