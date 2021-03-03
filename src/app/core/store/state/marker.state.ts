import {IMarkerModel} from '../../models/marker.model';

export interface IMarkerState {
  markers: IMarkerModel[];
  isLoading: boolean;
}

export const initialMarkerState: IMarkerState = {
  markers: [],
  isLoading: false,
};
