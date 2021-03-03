import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMarkerModel} from '../../models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  public uri = environment.apiUrl + 'api/trackerz/markers';

  constructor(
    private http: HttpClient,
  ) {
  }

  public getMarkers(): Observable<IMarkerModel[]> {
    return this.http.get<IMarkerModel[]>(this.uri);
  }

  public postMarker(marker: IMarkerModel): Observable<IMarkerModel> {
    return this.http.post<IMarkerModel>(this.uri, {marker});
  }

  public deleteMarker(marker: IMarkerModel): Observable<IMarkerModel> {
    return this.http.delete<IMarkerModel>(this.uri + '/' + marker._id);
  }
}
