import {Component, OnDestroy, OnInit} from '@angular/core';
import {IMarkerModel} from '../../../../../../core/models/marker.model';
import {ModalController} from '@ionic/angular';
import {Feature, MapService} from '../../../../../../core/services/map/map.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../../../../core/store/state/app.state';
import {PostMarker} from '../../../../../../core/store/actions/marker.actions';

@Component({
  selector: 'app-create-edit-marker',
  templateUrl: './create-edit-marker.component.html',
  styleUrls: ['./create-edit-marker.component.scss'],
})
export class CreateEditMarkerComponent implements OnInit, OnDestroy {

  public addresses: Feature[] = [];
  public selectedAddress: Feature;

  public position: {
    lat: number,
    lng: number,
  };

  private _subscriptions: Subscription[] = [];

  constructor(
    private modalController: ModalController,
    private mapService: MapService,
    private store: Store<IAppState>,
  ) {
  }

  async ngOnInit() {
    await navigator.geolocation.getCurrentPosition(pos => {
      this.position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
    });
  }

  searchStart(event: any) {
    if (event.target.value === '') {
      this.selectedAddress = null;
      this.addresses = [];
      return;
    }
    const searchTerm = event?.target?.value?.toLowerCase();
    if (searchTerm && searchTerm.length > 0 && searchTerm !== this.selectedAddress?.place_name.toLowerCase()) {
      this._subscriptions.push(
        this.mapService
          .search_word(searchTerm)
          .subscribe((features: Feature[]) => {
            this.addresses = features;
          }),
      );
    } else {
      this.addresses = [];
    }
  }

  public close(): void {
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  onSelect(address: Feature) {
    this.selectedAddress = address;
    this.addresses = [];
  }

  setCurrentLocation(): void {
    this.mapService.reverseGeocoding(this.position.lng, this.position.lat).subscribe((res: Feature[]) => {
      if (res.length > 0) {
        this.selectedAddress = {
          place_name: res[0].place_name,
          center: res[0].center,
        };
        this.onSelect(res[0]);
      } else {
        alert('Error retrieving your location place');
      }

    });
  }

  public begin(): void {
    if (!this.selectedAddress) {
      return;
    }
    const payload: IMarkerModel = {
      placeName: this.selectedAddress.place_name,
      lng: this.selectedAddress.center[0],
      lat: this.selectedAddress.center[1],
    } as IMarkerModel;
    this.store.dispatch(new PostMarker(payload));
  }
}
