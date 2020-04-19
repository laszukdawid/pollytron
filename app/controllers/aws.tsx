import AWS from "aws-sdk";
import { Howl } from 'howler';
import { awsConfigType } from '../types';

// Initialize the Amazon Cognito credentials provider
AWS.config.update({
  region: "",
  accessKeyId: "",
  secretAccessKey: "",
});

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
  const polly = new AWS.Polly({apiVersion: '2016-06-10'});

  polly.synthesizeSpeech(speechParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    }

    if (data.AudioStream instanceof Buffer) {
      const uInt8Array = new Uint8Array(data.AudioStream);
      const arrayBuffer = uInt8Array.buffer;
      const blob = new Blob([arrayBuffer]);
      const url = URL.createObjectURL(blob);

      const sound = new Howl({
        src: [url],
        volume: 1.0,
        html5: true,
      });
      sound.play()

    }
  });
}