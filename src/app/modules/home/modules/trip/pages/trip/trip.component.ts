import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../../../../core/store/state/app.state';
import {
  DeleteTrip,
  EndTrip,
  GetTodayTrips,
  GetTripStatus,
  OpenMapModal,
  OpenSavedPlacesModal,
  StartTrip
} from '../../../../../../core/store/actions/trip.actions';
import {Observable, Subscription} from 'rxjs';
import {ITripModel} from '../../../../../../core/models/trip.model';
import {selectIsTripsLoading, selectTodayTrips, selectTripStatus} from '../../../../../../core/store/selectors/trip.selectors';
import * as moment from 'moment';
import {AlertController} from '@ionic/angular';
import {ITripStatus} from '../../../../../../core/store/state/trip.state';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit, OnDestroy {
  public trips$: Observable<ITripModel[]> = this.store.select(selectTodayTrips);
  public isTripsLoading$: Observable<boolean> = this.store.select(selectIsTripsLoading);
  public tripStatus$: Observable<ITripStatus> = this.store.select(selectTripStatus);

  public tripStatus: ITripStatus;
  public trips: ITripModel[] = [];
  public kmToday: string = '0';

  public position: {
    lat: number,
    lng: number,
  };

  private _subscriptions: Subscription[] = [];

  constructor(
    private store: Store<IAppState>,
    private alertController: AlertController,
  ) {
    this.getTrips();
    this.getLocation();
  }


  ngOnInit(): void {
    this.getTrips();
    this.store.dispatch(new GetTripStatus());
    this.getLocation();
  }

  public ionViewWillEnter() {

    this._subscriptions.push(
      this.trips$.subscribe(tr => {
        this.kmToday = '0';
        this.trips = tr;
        if (this.trips.filter(t => t.distance).map(t => t.distance).length > 0) {
          this.kmToday = (this.trips.filter(t => t.distance).map(t => t.distance).reduce((a, b) => a + b) / 1000).toFixed(2);
        }
      }),
      this.tripStatus$.subscribe(t => {
        if (t) {
          this.tripStatus = t;
        }
      })
    );
  }

  add(): void {
    this.store.dispatch(new OpenMapModal());
  }

  addFromExisting(): void {
    this.store.dispatch(new OpenSavedPlacesModal());
  }

  public deleteTrip(trip: ITripModel) {
    this.store.dispatch(new DeleteTrip(trip));
  }

  ionViewWillLeave(): void {
    this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
    this.trips = [];
  }

  public doRefresh(event): void {
    this.getTrips();
    this.getLocation();
    this.store.dispatch(new GetTripStatus());
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  public startEndTrip(): void {
    this.getLocation();
    this.tripStatus.tripActive ? this.store.dispatch(new EndTrip(this.position)) : this.store.dispatch(new StartTrip(this.position));
  }

  private getTrips(): void {
    this.store.dispatch(new GetTodayTrips(moment(), moment()));
  }

  public getLocation(): void {
    navigator.geolocation.getCurrentPosition(pos => {
      this.position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
    });
  }
}
