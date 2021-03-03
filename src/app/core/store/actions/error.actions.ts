import {Action} from '@ngrx/store';

export enum EErrorActions {
  LoadError = '[Error] Generic Load Error'
}

export class LoadError implements Action {
  public readonly type = EErrorActions.LoadError;

  constructor(public error: Error, public callerAction) {
  }
}

export type ErrorActions = LoadError;
