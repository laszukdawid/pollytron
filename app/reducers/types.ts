import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type readerStateType = string;

export type awsConfigType = {
    region: string,
    accessKeyId: string,
    secretAccessKey: string,
    profile?: string,
}


export type stateType = {
  counter: number,
  awsConfig: awsConfigType,
  reader: readerStateType,
};

export type GetState = () => stateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<stateType, Action<string>>;
