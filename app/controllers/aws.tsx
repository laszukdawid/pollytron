import AWS, { Polly } from "aws-sdk";
import btoa from "btoa";
import { awsConfigType } from '../reducers/types';

export function updateAwsConfig(awsConfig: awsConfigType) {
  console.log("Updating AWS config")
  AWS.config.update(awsConfig);
}

// Function invoked by button click
export async function speakText(text: string, voiceId: string) {
  // Create the JSON parameters for getSynthesizeSpeechUrl
  const speechParams = {
    OutputFormat: "mp3",
    SampleRate: "16000",
    Text: text,
    TextType: "ssml",
    VoiceId: voiceId
  };

  // Create the Polly service object and presigner object
  const polly = new Polly({apiVersion: '2016-06-10'});

  return new Promise((resolve, reject) => {
    polly.synthesizeSpeech(speechParams, (err, data) => {
      console.log(speechParams);
      if (err) {
        console.log(err, err.stack);
        reject(err)
      }

      const arrayBuffer = Uint8Array.from(data.AudioStream).buffer;
      const blob = new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      const base64String = btoa(blob);
      const howlSource = ["data:audio/mp3;base64," + base64String];
      resolve(howlSource);
    });
  })
}
