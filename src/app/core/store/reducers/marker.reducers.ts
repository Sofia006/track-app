import {IMarkerState, initialMarkerState} from '../state/marker.state';
import {EMarkerActions, MarkerActions} from '../actions/marker.actions';
import {EErrorActions, ErrorActions} from '../actions/error.actions';

export const markerReducers = (
  state = initialMarkerState,
  action: MarkerActions | ErrorActions,
): IMarkerState => {
  switch (action.type) {
    case EErrorActions.LoadError: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case EMarkerActions.GetMarkers: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EMarkerActions.GetMarkersSuccess: {
      return {
        ...state,
        isLoading: false,
        markers: action.markers,
      };
    }
    case EMarkerActions.PostMarker: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EMarkerActions.PostMarkerSuccess: {
      return {
        ...state,
        isLoading: false,
        markers: [action.marker, ...state.markers],
      };
    }
    case EMarkerActions.DeleteMarker: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EMarkerActions.DeleteMarkerSuccess: {
      return {
        ...state,
        isLoading: false,
        markers: state.markers.filter(m => m._id !== action.marker._id),
      };
    }
    default:
      return state;
  }
};
