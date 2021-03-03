import {Store} from '@ngrx/store';
import {LocalstorageService} from './services/localstorage/localstorage.service';
import {IAppState} from './store/state/app.state';
import {SetAccount} from './store/actions/auth.actions';
import {Router} from '@angular/router';
import {GetMarkers} from './store/actions/marker.actions';
import {GetTodayTrips, GetTripStatus} from './store/actions/trip.actions';
import * as moment from 'moment';

export function AppInitializer(router: Router, localStorage: LocalstorageService, store: Store<IAppState>): () => Promise<any> {
  return (): Promise<any> =>
    new Promise((resolve) => {
      const timeout = 2000;
      // Set a timeout for the users details to arrive. If it exceeds then redirect to login
      if (localStorage.getAccount()) {
        store.dispatch(new SetAccount(localStorage.getAccount()));
        if (['/login', '/'].indexOf(window.location.pathname) !== -1) {
          store.dispatch(new GetMarkers());
          store.dispatch(new GetTodayTrips(moment(), moment()));
          store.dispatch(new GetTripStatus());
          router.navigateByUrl('home/trip');
        }
        resolve();
      } else {
        router.navigateByUrl('/login');
        resolve();
      }
    });
}

