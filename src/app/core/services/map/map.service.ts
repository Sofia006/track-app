import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
  center: number[];
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http: HttpClient,
  ) {
  }

  search_word(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + query + '.json?types=address&access_token=pk.eyJ1Ijoia2xhamRpYXYiLCJhIjoiY2tkYWttazY3MTY4ZDJybm5yaGJjYTN5eCJ9.4v-2asaRLRvaGOCOlCFl3g';
    return this.http.get(url)
      .pipe(map((res: MapboxOutput) => {
        return res.features;
      }));
  }

  getDirections(geomFrom: { lat: number, lng: number }, geomTo: { lat: number, lng: number }) {
    // https://api.geoapify.com/v1/routing?waypoints=55.391817,10.37355|55.3577,10.30646&mode=drive&apiKey=YOUR_API_KEY
    const url = 'https://api.geoapify.com/v1/routing?waypoints=';
    return this.http.get(url + geomFrom.lng + ',' + geomFrom.lat + '|' + geomTo.lng + ',' + geomTo.lat + '&mode=drive&apiKey='
      + environment.apify.accessToken);
  }

  reverseGeocoding(lng: number, lat: number) {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url + lng + ',' + lat + '.json?access_token=' + environment.mapbox.accessToken).pipe(map((res: MapboxOutput) => {
      return res.features;
    }));
  }

  getMapBoxDirections(geomFrom: { lat: number, lng: number }, geomTo: { lat: number, lng: number }) {
    const url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + geomFrom.lng + ',' + geomFrom.lat + ';' + geomTo.lng + ',' + geomTo.lat;
    return this.http.get(url + '?geometries=geojson&access_token=' + environment.mapbox.accessToken).pipe(map((res: any) => {
      return res?.routes[0];
    }));
  }
}
