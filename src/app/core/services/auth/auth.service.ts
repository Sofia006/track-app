import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {IAccountModel} from '../../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public uri = environment.apiUrl + 'auth/trackerz/login';

  constructor(
    private http: HttpClient,
  ) {
  }

  public postLogin(email: string, password: string): Observable<IAccountModel> {
    return this.http.post<IAccountModel>(this.uri, {email, password});
  }

}
