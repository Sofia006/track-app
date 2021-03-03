import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {
  DeleteTrip,
  DeleteTripSuccess,
  EndTrip,
  EndTripSuccess,
  ETripActions,
  GetTodayTrips,
  GetTodayTripsSuccess,
  GetTrips,
  GetTripsSuccess,
  GetTripStatus,
  GetTripStatusSuccess,
  OpenMapModal,
  OpenSavedPlacesModal,
  PostTrip,
  PostTripSuccess,
  StartTrip,
  StartTripSuccess
} from '../actions/trip.actions';
import {TripService} from '../../services/trip/trip.service';
import {ITripModel} from '../../models/trip.model';
import {LoadError} from '../actions/error.actions';
import {ModalController} from '@ionic/angular';
import {MapComponent} from '../../../modules/home/modules/trip/components/map/map.component';
import Swal from 'sweetalert2';
import {PostMarker} from '../actions/marker.actions';
import {Action} from '@ngrx/store';
import {TripSavedPlacesComponent} from '../../../modules/home/modules/trip/components/trip-saved-places/trip-saved-places.component';
import {ITripStatus} from '../state/trip.state';

@Injectable()
export class TripEffects {

  @Effect()
  public onGetTrips$ = this.actions$.pipe(
    ofType<GetTrips>(ETripActions.GetTrips),
    switchMap((action: GetTrips) => from(this.tripService.getTrips(action.from, action.to)).pipe(
      switchMap((trips: ITripModel[]) => [
        new GetTripsSuccess(trips),
      ]),
      catchError(error => of(new LoadError(error, action))),
    )),
  );

  @Effect()
  public onGetTodayTrips$ = this.actions$.pipe(
    ofType<GetTodayTrips>(ETripActions.GetTodayTrips),
    switchMap((action: GetTodayTrips) => from(this.tripService.getTrips(action.from, action.to)).pipe(
      switchMap((trips: ITripModel[]) => [
        new GetTodayTripsSuccess(trips),
      ]),
      catchError(error => of(new LoadError(error, action))),
    )),
  );

  @Effect()
  public onPostTrip$ = this.actions$.pipe(
    ofType<PostTrip>(ETripActions.PostTrip),
    switchMap((action: PostTrip) => from(this.tripService.postTrip(action.trip)).pipe(
      switchMap((trip: ITripModel) => {
        this.modalController.dismiss();
        const actions: Action[] = [
          new PostTripSuccess(trip),
        ];
        if (action.marker) {
          actions.push(new PostMarker(action.marker),
          );
        }
        Swal.fire({
          icon: 'success',
          title: 'Trip registered',
          showConfirmButton: false,
          timer: 1500,
        });
        return actions;
      }),
      catchError(error => of(new LoadError(error, action))),
    )),
  );
  @Effect()
  public onDeleteTrip$ = this.actions$.pipe(
    ofType<DeleteTrip>(ETripActions.DeleteTrip),
    switchMap((action: DeleteTrip) => from(this.tripService.deleteTrip(action.trip)).pipe(
      switchMap((trip: ITripModel) => {
        Swal.fire({
          icon: 'success',
          title: 'Trip deleted',
          showConfirmButton: false,
          timer: 1500,
        });
        return [
          new DeleteTripSuccess(trip),
        ];
      }),
      catchError(error => of(new LoadError(error, action))),
    )),
  );

  @Effect()
  public onOpenMapModal$ = this.actions$.pipe(
    ofType<OpenMapModal>(ETripActions.OpenMapModal),
    switchMap((action: OpenMapModal) => {
      this.modalController.create({
        component: MapComponent,
      }).then(modal => {
        modal.present();
      });
      return [];
    }),
  );


  @Effect()
  public onOpenSavedPlacesModal$ = this.actions$.pipe(
    ofType<OpenSavedPlacesModal>(ETripActions.OpenSavedPlacesModal),
    switchMap((action: OpenSavedPlacesModal) => {
      this.modalController.create({
        component: TripSavedPlacesComponent,
      }).then(modal => {
        modal.present();
      });
      return [];
    }),
  );


  @Effect()
  public onGetTripStatus$ = this.actions$.pipe(
    ofType<GetTripStatus>(ETripActions.GetTripStatus),
    switchMap((action: GetTripStatus) => from(this.tripService.getTripStatus()).pipe(
      switchMap((status: ITripStatus) => {
        return [
          new GetTripStatusSuccess(status),
        ];
      }),
      catchError(error => of(new LoadError(error, action))),
    )),
  );

  @Effect()
  public onStartTrip$ = this.actions$.pipe(
    ofType<StartTrip>(ETripActions.StartTrip),
    switchMap((action: StartTrip) => from(this.tripService.startTrip(action.currentLocation)).pipe(
      switchMap((trip: ITripModel) => {
        return [
          new StartTripSuccess(trip),
        ];
      }),
      catchError(error => of(new LoadError(error, action))),
    )),
  );

  @Effect()
  public onEndTrip$ = this.actions$.pipe(
    ofType<EndTrip>(ETripActions.EndTrip),
    switchMap((action: EndTrip) => from(this.tripService.endTrip(action.currentLocation)).pipe(
      switchMap((trip: ITripModel) => {
        return [
          new EndTripSuccess(trip),
        ];
      }),
      catchError(error => of(new LoadError(error, action))),
    )),
  );

  constructor(
    private actions$: Actions,
    private tripService: TripService,
    private modalController: ModalController,
  ) {
  }
}
