import {environment} from '../../../../../../../environments/environment';
import {Component, OnDestroy, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {LngLatLike} from 'mapbox-gl';
import {Feature, MapService} from '../../../../../../core/services/map/map.service';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {AlertController, ModalController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../../../../core/store/state/app.state';
import {PostTrip} from '../../../../../../core/store/actions/trip.actions';
import {ITripModel} from '../../../../../../core/models/trip.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  public position: {
    lat: number,
    long: number,
  };
  startAdresses: Feature[] = [];
  endAddresses: Feature[] = [];

  selectedStartAddress: Feature = null;
  selectedEndAddress: Feature = null;
  public directions: any;
  public distance: number;

  public startTrip: {
    origin: string,
    destination: string,
    distance: number,
  };

  public originMarker: any;
  public destinationMarker: any;

  private _subscriptions: Subscription[] = [];
  private _markers = [];

  constructor(
    private modalController: ModalController,
    private mapService: MapService,
    private alertController: AlertController,
    private store: Store<IAppState>,
  ) {
  }


  async ngOnInit() {
    await navigator.geolocation.getCurrentPosition(pos => {
      this.position = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      };
      // @ts-ignore
      mapboxgl.accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.position?.long, this.position?.lat],
      });
      const geoLocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true
      });
      this.map.addControl(geoLocate);
      this.directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: 'metric',
          profile: 'mapbox/driving',
          controls: {
            inputs: false,
            instructions: false
          },
        }
      );
      this.map.addControl(this.directions, 'top-left');
      this.directions.on('route', (e) => {
        this.distance = e?.route[0]?.distance;
      });
      // const geocoder = new MapboxGeocoder({
      //     accessToken: environment.mapbox.accessToken,
      //     mapboxgl
      //   }
      // );
      // this.map.addControl(geocoder);
      // Add map controls
      // this.map.addControl(new mapboxgl.NavigationControl());
      // const marker = new mapboxgl.Marker()
      //   .setLngLat([this.position?.long, this.position?.lat])
      //   .addTo(this.map);
      // document.getElementById('geocoder').appendChild(geocoder.onAdd(this.map));
      document.getElementsByClassName('mapboxgl-ctrl-top-left')[0]['hidden'] = true;
    });
  }

  searchStart(event: any) {
    if (event.target.value === '') {
      this.selectedStartAddress = null;
      this.startAdresses = [];
      // this.originMarker.remove();
      // this.map.removeControl(this.directions);
      return;
    }
    const searchTerm = event?.target?.value?.toLowerCase();
    if (searchTerm && searchTerm.length > 0 && searchTerm !== this.selectedStartAddress?.place_name.toLowerCase()) {
      this._subscriptions.push(
        this.mapService
          .search_word(searchTerm)
          .subscribe((features: Feature[]) => {
            this.startAdresses = features;
          }),
      );
    } else {
      this.startAdresses = [];
    }
  }

  search(event: any) {
    if (event.target.value === '') {
      this.selectedEndAddress = null;
      this.endAddresses = [];
      // this.originMarker.remove();
      // this.map.removeControl(this.directions);
      return;
    }
    const searchTerm = event?.target?.value?.toLowerCase();
    if (searchTerm && searchTerm.length > 0 && searchTerm !== this.selectedEndAddress?.place_name.toLowerCase()) {
      this._subscriptions.push(
        this.mapService
          .search_word(searchTerm)
          .subscribe((features: Feature[]) => {
            this.endAddresses = features;
          }),
      );

    } else {
      this.endAddresses = [];
    }
  }

  onSelectStart(address: Feature) {
    this.startAdresses = [];
    this.selectedStartAddress = address;

    this.originMarker = new mapboxgl.Marker()
      .setLngLat(this.selectedStartAddress.center as LngLatLike)
      .addTo(this.map);
    this._markers.push(this.originMarker);
    this.directions.setOrigin(this.selectedStartAddress.place_name);
    this.map.flyTo({
      center: this.selectedStartAddress.center as LngLatLike,
    });
  }

  onSelect(address: Feature) {
    this.selectedEndAddress = address;
    this.endAddresses = [];
    this.destinationMarker = new mapboxgl.Marker()
      .setLngLat(this.selectedEndAddress.center as LngLatLike)
      .addTo(this.map);
    this.directions.setDestination(this.selectedEndAddress.place_name);
    this._markers.push(this.destinationMarker);
    this.map.flyTo({
      center: this.selectedEndAddress.center as LngLatLike,
    });
    // this.mapService.getDirections(
    //   {
    //     lng: this.selectedStartAddress.center[1],
    //     lat: this.selectedStartAddress.center[0],
    //   },
    //   {
    //     lng: this.selectedEndAddress.center[1],
    //     lat: this.selectedEndAddress.center[0],
    //   }
    // ).subscribe((res: any) => {
    //   // this.distance = res?.routes[0]?.distance;
    //   console.log(res);
    // });
  }

  selectTrip() {
    this.startTrip = {
      origin: this.selectedStartAddress.place_name,
      destination: this.selectedEndAddress.place_name,
      distance: this.distance,
    };
  }

  setCurrentLocation(type: number): void {
    if (type === 1) {
      this.mapService.reverseGeocoding(this.position.long, this.position.lat).subscribe((res: Feature[]) => {
        if (res.length > 0) {
          this.selectedStartAddress = {
            place_name: res[0].place_name,
            center: res[0].center,
          };
          this.onSelectStart(res[0]);
        } else {
          alert('Error retrieving your location place');
        }

      });
    } else if (type === 2) {
      this.mapService.reverseGeocoding(this.position.long, this.position.lat).subscribe((res: Feature[]) => {
        if (res.length > 0) {
          this.selectedEndAddress = {
            place_name: res[0].place_name,
            center: res[0].center,
          };
          this.onSelect(res[0]);
        } else {
          alert('Error retrieving your location place');
        }

      });
    }
  }

  public async begin(): Promise<void> {
    if (this.selectedStartAddress && this.selectedEndAddress && this.distance) {
      const alert = await this.alertController.create({
        header: 'Start the trip?',
        message: '<b>From:</b> '
          + this.selectedStartAddress.place_name + '<br>'
          + '<b>To:</b> ' + this.selectedEndAddress.place_name + '<br>'
          + '<b>Distance:</b> ' + (this.distance / 1000).toFixed(2) + 'km',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Okay',
            handler: () => {
              const trip: ITripModel = {
                destination: this.selectedEndAddress.place_name,
                distance: this.distance,
                geoDestination: {
                  lat: this.selectedEndAddress.center[1],
                  lng: this.selectedEndAddress.center[0],
                },
                geoOrigin: {
                  lat: this.selectedStartAddress.center[1],
                  lng: this.selectedStartAddress.center[0],
                },
                origin: this.selectedStartAddress.place_name,

              } as ITripModel;
              this.store.dispatch(new PostTrip(trip));
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public close(): void {
    this.modalController.dismiss();
    this.ngOnDestroy();
  }

  public ngOnDestroy(): void {
    this.selectedStartAddress = null;
    this.selectedEndAddress = null;
    this._subscriptions.forEach(s => s.unsubscribe());
    this._markers.forEach(m => m.remove());
    this.directions.actions.clearOrigin();
    this.directions.actions.clearDestination();
    this.map?.stop();
  }

  public ionViewWillLeave(): void {

    this.ngOnDestroy();
  }

}
