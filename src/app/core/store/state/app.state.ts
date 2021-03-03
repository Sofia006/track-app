import {IAuthState, initialAuthState} from './auth.state';
import {RouterReducerState} from '@ngrx/router-store';
import {initialTripState, ITripState} from './trip.state';
import {IMarkerState, initialMarkerState} from './marker.state';

export interface IAppState {
  router?: RouterReducerState;
  auth: IAuthState;
  trip: ITripState;
  marker: IMarkerState
}

export const initialAppState: IAppState = {
  auth: initialAuthState,
  trip: initialTripState,
  marker: initialMarkerState,
};

export function getInitalState(): IAppState {
  return initialAppState;
}

