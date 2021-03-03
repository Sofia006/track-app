import {createSelector} from '@ngrx/store';
import {IAppState} from '../state/app.state';
import {ITripState} from '../state/trip.state';

const _selectTrip = (state: IAppState) => state.trip;

export const selectIsTripsLoading = createSelector(
  _selectTrip,
  (state: ITripState) => state.isLoading,
);

export const selectTrips = createSelector(
  _selectTrip,
  (state: ITripState) => state.trips,
);
export const selectTodayTrips = createSelector(
  _selectTrip,
  (state: ITripState) => state.todayTrips,
);

export const selectTripStatus = createSelector(
  _selectTrip,
  (state: ITripState) => state.tripStatus,
);

