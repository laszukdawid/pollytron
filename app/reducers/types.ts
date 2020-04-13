import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { awsConfigType } from "../types";

export type counterStateType = {
  counter: number,
  awsConfig: awsConfigType,
};

export type GetState = () => counterStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<counterStateType, Action<string>>;
