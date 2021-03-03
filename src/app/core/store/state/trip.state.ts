import {ITripModel} from '../../models/trip.model';

export interface ITripStatus {
  tripActive: boolean;
  trip: ITripModel;
}

export interface ITripState {
  trips: ITripModel[];
  todayTrips: ITripModel[];
  isLoading: boolean;
  tripStatus: ITripStatus;
}

export const initialTripState: ITripState = {
  trips: [],
  todayTrips: [],
  tripStatus: null,
  isLoading: false,
};
