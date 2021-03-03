import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ITripModel} from '../../models/trip.model';
import {Moment} from 'moment';
import {ITripStatus} from '../../store/state/trip.state';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  public uri = environment.apiUrl + 'api/trackerz/trips';

  constructor(
    private http: HttpClient,
  ) {
  }

  public getTrips(from: Moment, to: Moment): Observable<ITripModel[]> {
    return this.http.get<ITripModel[]>(this.uri + '?from=' + from.format('YYYY-MM-DD') + '&to=' + to.format('YYYY-MM-DD'));
  }

  public postTrip(trip: ITripModel): Observable<ITripModel> {
    return this.http.post<ITripModel>(this.uri, {trip});
  }

  public deleteTrip(trip: ITripModel): Observable<ITripModel> {
    return this.http.delete<ITripModel>(this.uri + '/' + trip._id);
  }

  public getTripStatus(): Observable<ITripStatus> {
    return this.http.get<ITripStatus>(this.uri + '/trip-status');
  }

  public startTrip(currentLocation: { lat: number, lng: number }): Observable<ITripModel> {
    return this.http.post<ITripModel>(this.uri + '/trip-start', {currentLocation});
  }

  public endTrip(currentLocation: { lat: number, lng: number }): Observable<ITripModel> {
    return this.http.post<ITripModel>(this.uri + '/trip-end', {currentLocation});
  }
}
