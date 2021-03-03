import {Action} from '@ngrx/store';
import {IMarkerModel} from '../../models/marker.model';

export enum EMarkerActions {
  GetMarkers = '[Marker] Get Markers',
  GetMarkersSuccess = '[Marker] Get Markers Success',
  PostMarker = '[Marker] Post Marker',
  PostMarkerSuccess = '[Marker] Post Marker Success',
  DeleteMarker = '[Marker] Delete Marker',
  DeleteMarkerSuccess = '[Marker] Delete Marker Success',

  OpenMarkModal = '[Marker] Open Mark Modal',
}

export class GetMarkers implements Action {
  public readonly type = EMarkerActions.GetMarkers;

  constructor() {
  }
}

export class GetMarkersSuccess implements Action {
  public readonly type = EMarkerActions.GetMarkersSuccess;

  constructor(public markers: IMarkerModel[]) {
  }
}

export class PostMarker implements Action {
  public readonly type = EMarkerActions.PostMarker;

  constructor(public marker: IMarkerModel) {
  }
}

export class PostMarkerSuccess implements Action {
  public readonly type = EMarkerActions.PostMarkerSuccess;

  constructor(public marker: IMarkerModel) {
  }
}

export class DeleteMarker implements Action {
  public readonly type = EMarkerActions.DeleteMarker;

  constructor(public marker: IMarkerModel) {
  }
}

export class DeleteMarkerSuccess implements Action {
  public readonly type = EMarkerActions.DeleteMarkerSuccess;

  constructor(public marker: IMarkerModel) {
  }
}

export class OpenMarkModal implements Action {
  public readonly type = EMarkerActions.OpenMarkModal;

  constructor() {
  }
}

export type MarkerActions =
  GetMarkers |
  GetMarkersSuccess |
  PostMarker |
  PostMarkerSuccess |
  DeleteMarker |
  DeleteMarkerSuccess |
  OpenMarkModal
  ;
