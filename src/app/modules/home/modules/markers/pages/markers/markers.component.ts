import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IMarkerModel} from '../../../../../../core/models/marker.model';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../../../../core/store/state/app.state';
import {selectIsMarkersLoading, selectMarkers} from '../../../../../../core/store/selectors/marker.selectors';
import {DeleteMarker, GetMarkers, OpenMarkModal} from '../../../../../../core/store/actions/marker.actions';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.scss'],
})
export class MarkersComponent implements OnInit {
  public markers$: Observable<IMarkerModel[]> = this.store.select(selectMarkers);
  public isLoading$: Observable<boolean> = this.store.select(selectIsMarkersLoading);

  constructor(
    private store: Store<IAppState>,
    private alertController: AlertController,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new GetMarkers());
  }

  public createMarker(): void {
    this.store.dispatch(new OpenMarkModal());
  }

  public async showMarker(marker: IMarkerModel): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Saved place',
      message: '<b>Address</b>: ' + marker.placeName + '<br>' +
        '<b>Latitude:</b> ' + marker.lat + '<br>' +
        '<b>Longitude:</b> ' + marker.lng,
      buttons: [
        {
          text: 'Delete',
          cssClass: 'alertDanger',
          handler: () => {
            if (confirm('Are you sure you want to delete this trip?')) {
              this.store.dispatch(new DeleteMarker(marker));
            }
          }
        },
        {
          text: 'Okay',
        },

      ]
    });
    await alert.present();
  }

  public doRefresh(event): void {
    this.store.dispatch(new GetMarkers());
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
