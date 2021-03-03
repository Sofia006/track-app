import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../../../../core/store/state/app.state';
import {ModalController} from '@ionic/angular';
import {Observable, Subscription} from 'rxjs';
import {IMarkerModel} from '../../../../../../core/models/marker.model';
import {selectMarkers} from '../../../../../../core/store/selectors/marker.selectors';
import {getCurrentState} from '../../../../../../core/utility';
import {GetMarkers} from '../../../../../../core/store/actions/marker.actions';
import {Feature, MapService} from '../../../../../../core/services/map/map.service';
import {ITripModel} from '../../../../../../core/models/trip.model';
import {PostTrip} from '../../../../../../core/store/actions/trip.actions';

export interface IAddress {
  placeName: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-trip-saved-places',
  templateUrl: './trip-saved-places.component.html',
  styleUrls: ['./trip-saved-places.component.scss'],
})
export class TripSavedPlacesComponent implements OnInit, OnDestroy {
  public markers$: Observable<IMarkerModel[]> = this.store.select(selectMarkers);
  public position: {
    lat: number,
    lng: number,
  };

  public selectorData: IAddress[] = [];
  public currentOrigin: Feature;
  public selectedOrigin: IAddress;
  public selectedDestination: IAddress;

  public trip: ITripModel;

  private _subscriptions: Subscription[] = [];

  constructor(
    private store: Store<IAppState>,
    private modalController: ModalController,
    private mapService: MapService,
  ) {
  }


  public async ngOnInit(): Promise<void> {
    if (getCurrentState(this.store).marker.markers.length === 0) {
      this.store.dispatch(new GetMarkers());
    }
    await navigator.geolocation.getCurrentPosition(pos => {
      this.position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      this._subscriptions.push(
        this.mapService.reverseGeocoding(this.position.lng, this.position.lat).subscribe((res: Feature[]) => {
          this.currentOrigin = res[0];
          this._subscriptions.push(
            this.markers$.subscribe(markers => {
              this.selectorData = [];
              if (markers.length > 0) {
                this.selectorData.push(
                  {
                    placeName: this.currentOrigin.place_name,
                    lat: this.currentOrigin.center[1],
                    lng: this.currentOrigin.center[0],
                  }
                );
                markers.forEach(m => {
                  this.selectorData.push({
                    placeName: m.placeName,
                    lat: m.lat,
                    lng: m.lng,
                  });
                });
              }
            }),
          );
        }),
      );
    });
  }

  public setOrigin() {
    this.selectDestination(this.selectedOrigin);
  }

  public selectDestination(selectedStart: IAddress = null) {
    if (!this.selectedOrigin || !this.selectedDestination) {
      return;
    }
    this._subscriptions.push(
      this.mapService.getMapBoxDirections(
        {
          lat: this.selectedOrigin.lat,
          lng: this.selectedOrigin.lng
        },
        {
          lat: this.selectedDestination.lat,
          lng: this.selectedDestination.lng
        }).subscribe((res: any) => {
        if (!res['distance'] && res['distance'] !== 0) {
          alert('Distance not found');
          return;
        }
        this.trip = {
          origin: this.selectedOrigin.placeName,
          destination: this.selectedDestination.placeName,
          distance: res['distance'],
          geoOrigin: {
            lat: this.selectedOrigin.lat,
            lng: this.selectedOrigin.lng,
          },
          geoDestination: {
            lat: this.selectedDestination.lat,
            lng: this.selectedDestination.lng,
          }
        } as ITripModel;
      }),
    );

  }

  public begin(): void {
    this.store.dispatch(new PostTrip(this.trip));
  }

  public close(): void {
    this.modalController.dismiss();
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
  }


}
