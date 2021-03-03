import {initialTripState, ITripState} from '../state/trip.state';
import {ETripActions, TripActions} from '../actions/trip.actions';
import {EErrorActions, ErrorActions} from '../actions/error.actions';
import {AuthActions, EAuthActions} from '../actions/auth.actions';

export const tripReducers = (
  state = initialTripState,
  action: TripActions | ErrorActions | AuthActions,
): ITripState => {
  switch (action.type) {
    case EErrorActions.LoadError: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ETripActions.GetTrips: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ETripActions.GetTripsSuccess: {
      return {
        ...state,
        isLoading: false,
        trips: action.trips,
      };
    }
    case ETripActions.GetTodayTrips: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ETripActions.GetTodayTripsSuccess: {
      return {
        ...state,
        isLoading: false,
        todayTrips: action.trips,
      };
    }
    case ETripActions.PostTrip: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ETripActions.PostTripSuccess: {
      return {
        ...state,
        isLoading: false,
        todayTrips: [action.trip, ...state.todayTrips],
      };
    }
    case ETripActions.DeleteTripSuccess: {
      return {
        ...state,
        isLoading: false,
        todayTrips: state.todayTrips.filter(t => t._id !== action.trip._id),
        trips: state.trips.filter(t => t._id !== action.trip._id),
      };
    }

    case ETripActions.GetTripStatus: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ETripActions.GetTripStatusSuccess: {
      return {
        ...state,
        isLoading: false,
        tripStatus: action.status,
      };
    }
    case ETripActions.StartTripSuccess: {
      return {
        ...state,
        todayTrips: [action.trip, ...state.todayTrips],
        tripStatus: {
          trip: action.trip,
          tripActive: true,
        }
      };
    }
    case ETripActions.EndTripSuccess: {
      return {
        ...state,
        todayTrips: state.todayTrips.map(t => t._id === action.trip._id ? action.trip : t),
        tripStatus: {
          tripActive: false,
          trip: null,
        }
      };
    }
    case EAuthActions.Logout: {
      return initialTripState;
    }
    default:
      return state;
  }
};
