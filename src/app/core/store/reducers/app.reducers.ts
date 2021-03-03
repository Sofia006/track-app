import {ActionReducerMap} from '@ngrx/store';
import {IAppState} from '../state/app.state';
import {routerReducer} from '@ngrx/router-store';
import {authReducers} from './auth.reducers';
import {tripReducers} from './trip.reducers';
import {markerReducers} from './marker.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  auth: authReducers,
  trip: tripReducers,
  marker: markerReducers,
};

