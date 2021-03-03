import {createSelector} from '@ngrx/store';
import {IAppState} from '../state/app.state';
import {IMarkerState} from '../state/marker.state';

const _selectMarker = (state: IAppState) => state.marker;

export const selectIsMarkersLoading = createSelector(
  _selectMarker,
  (state: IMarkerState) => state.isLoading,
);

export const selectMarkers = createSelector(
  _selectMarker,
  (state: IMarkerState) => state.markers,
);
