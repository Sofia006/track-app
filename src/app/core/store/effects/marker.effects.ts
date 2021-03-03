import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {
  DeleteMarker,
  DeleteMarkerSuccess,
  EMarkerActions,
  GetMarkers,
  GetMarkersSuccess,
  OpenMarkModal,
  PostMarker,
  PostMarkerSuccess
} from '../actions/marker.actions';
import {MarkerService} from '../../services/marker/marker.service';
import {IMarkerModel} from '../../models/marker.model';
import {LoadError} from '../actions/error.actions';
import {ModalController} from '@ionic/angular';
import {CreateEditMarkerComponent} from '../../../modules/home/modules/markers/components/create-edit-marker/create-edit-marker.component';
import Swal from 'sweetalert2';

@Injectable()
export class MarkerEffects {

  @Effect()
  public onGetMarkers$ = this.actions$.pipe(
    ofType<GetMarkers>(EMarkerActions.GetMarkers),
    switchMap((action: GetMarkers) => from(this.markerService.getMarkers()).pipe(
      switchMap((markers: IMarkerModel[]) => [
        new GetMarkersSuccess(markers),
      ]),
      catchError(error => of(new LoadError(error, action))),
    )),
  );

  @Effect()
  public onPostMarker$ = this.actions$.pipe(
    ofType<PostMarker>(EMarkerActions.PostMarker),
    switchMap((action: PostMarker) => from(this.markerService.postMarker(action.marker)).pipe(
      switchMap((marker: IMarkerModel) => {
        this.modalController.dismiss();
        Swal.fire({
          icon: 'success',
          title: 'Place saved',
          showConfirmButton: false,
          timer: 1500,
        });
        return [
          new PostMarkerSuccess(marker),
        ];
      }),
      catchError(error => of(new LoadError(error, action))),
    )),
  );

  @Effect()
  public onDeleteMarker$ = this.actions$.pipe(
    ofType<DeleteMarker>(EMarkerActions.DeleteMarker),
    switchMap((action: DeleteMarker) => from(this.markerService.deleteMarker(action.marker)).pipe(
      switchMap((marker: IMarkerModel) => {
        Swal.fire({
          icon: 'success',
          title: 'Marker deleted',
          showConfirmButton: false,
          timer: 1500,
        });
        return [
          new DeleteMarkerSuccess(marker),
        ];
      }),
      catchError(error => of(new LoadError(error, action))),
    )),
  );

  @Effect()
  public onOpenMarkModal$ = this.actions$.pipe(
    ofType<OpenMarkModal>(EMarkerActions.OpenMarkModal),
    switchMap((action: OpenMarkModal) => {
      this.modalController.create({
        component: CreateEditMarkerComponent,
      }).then(modal => {
        modal.present();
      });
      return [];
    }),
  );

  constructor(
    private actions$: Actions,
    private markerService: MarkerService,
    private modalController: ModalController,
  ) {
  }
}
