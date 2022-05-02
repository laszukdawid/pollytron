export type textStateType = string;

export type awsConfigType = {
  region: string,
  accessKeyId: string,
  secretAccessKey: string,
  profile?: string,
}

export type readerConfigType = {
  language: string,
  speed: number,
  voice: string,
}

export type stateType = {
  awsConfig: awsConfigType,
  readerConfig: readerConfigType,
  readerText: textStateType,
};

export type GetState = () => stateType;
