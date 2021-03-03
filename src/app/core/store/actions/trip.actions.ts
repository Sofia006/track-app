import {Action} from '@ngrx/store';
import {ITripModel} from '../../models/trip.model';
import {IMarkerModel} from '../../models/marker.model';
import {Moment} from 'moment';
import {ITripStatus} from '../state/trip.state';

export enum ETripActions {
  GetTrips = '[Trip] Get Trips',
  GetTripsSuccess = '[Trip] Get Trips Success',
  GetTodayTrips = '[Trip] Get Today Trips',
  GetTodayTripsSuccess = '[Trip] Get Today Trips Success',
  PostTrip = '[Trip] Post Trip',
  PostTripSuccess = '[Trip] Post Trip Success',
  DeleteTrip = '[Trip] Delete Trip',
  DeleteTripSuccess = '[Trip] Delete Trip Success',
  OpenMapModal = '[Trip] Open Map Modal',
  OpenSavedPlacesModal = '[Trip] Open Saved Places Modal',

  GetTripStatus = '[Trip] Get Trip Status',
  GetTripStatusSuccess = '[Trip]  Get Trip Status Success',
  StartTrip = '[Trip] Start Trip',
  StartTripSuccess = '[Trip] Start Trip Success',
  EndTrip = '[Trip] End Trip',
  EndTripSuccess = '[Trip] End Trip Success',
}

export class GetTrips implements Action {
  public readonly type = ETripActions.GetTrips;

  constructor(public from: Moment, public to: Moment) {
  }
}

export class GetTripsSuccess implements Action {
  public readonly type = ETripActions.GetTripsSuccess;

  constructor(public trips: ITripModel[]) {
  }
}

export class GetTodayTrips implements Action {
  public readonly type = ETripActions.GetTodayTrips;

  constructor(public from: Moment, public to: Moment) {
  }
}

export class GetTodayTripsSuccess implements Action {
  public readonly type = ETripActions.GetTodayTripsSuccess;

  constructor(public trips: ITripModel[]) {
  }
}

export class PostTrip implements Action {
  public readonly type = ETripActions.PostTrip;

  constructor(public trip: ITripModel, public marker: IMarkerModel = undefined) {
  }
}

export class PostTripSuccess implements Action {
  public readonly type = ETripActions.PostTripSuccess;

  constructor(public trip: ITripModel) {
  }
}

export class DeleteTrip implements Action {
  public readonly type = ETripActions.DeleteTrip;

  constructor(public trip: ITripModel) {
  }
}

export class DeleteTripSuccess implements Action {
  public readonly type = ETripActions.DeleteTripSuccess;

  constructor(public trip: ITripModel) {
  }
}

export class OpenMapModal implements Action {
  public readonly type = ETripActions.OpenMapModal;

  constructor() {
  }
}

export class OpenSavedPlacesModal implements Action {
  public readonly type = ETripActions.OpenSavedPlacesModal;

  constructor() {
  }
}

export class GetTripStatus implements Action {
  public readonly type = ETripActions.GetTripStatus;

  constructor() {
  }
}

export class GetTripStatusSuccess implements Action {
  public readonly type = ETripActions.GetTripStatusSuccess;

  constructor(public status: ITripStatus) {
  }
}

export class StartTrip implements Action {
  public readonly type = ETripActions.StartTrip;

  constructor(public currentLocation: { lat: number, lng: number }) {
  }
}

export class StartTripSuccess implements Action {
  public readonly type = ETripActions.StartTripSuccess;

  constructor(public trip: ITripModel) {
  }
}

export class EndTrip implements Action {
  public readonly type = ETripActions.EndTrip;

  constructor(public currentLocation: { lat: number, lng: number }) {
  }
}

export class EndTripSuccess implements Action {
  public readonly type = ETripActions.EndTripSuccess;

  constructor(public trip: ITripModel) {
  }
}

export type TripActions =
  GetTrips |
  GetTripsSuccess |
  PostTrip |
  PostTripSuccess |
  DeleteTrip |
  DeleteTripSuccess |
  OpenMapModal |
  GetTodayTrips |
  GetTodayTripsSuccess |
  GetTripStatus |
  GetTripStatusSuccess |
  StartTrip |
  StartTripSuccess |
  EndTrip |
  EndTripSuccess
  ;
