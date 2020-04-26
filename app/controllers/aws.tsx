import AWS, { Polly } from "aws-sdk";
import { Howl } from 'howler';
import { awsConfigType } from '../reducers/types';
import btoa from "btoa";

export function updateAwsConfig(awsConfig: awsConfigType) {
  console.log("Updating AWS config")
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
  const polly = new Polly({apiVersion: '2016-06-10'});

  polly.synthesizeSpeech(speechParams, (err, data) => {
    console.log(speechParams);
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