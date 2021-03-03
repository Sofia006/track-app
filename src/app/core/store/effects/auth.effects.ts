import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {EAuthActions, Logout, PostLogin, PostLoginSuccess} from '../actions/auth.actions';
import {IAccountModel} from '../../models/account.model';
import {LoadError} from '../actions/error.actions';
import {LocalstorageService} from '../../services/localstorage/localstorage.service';
import {Router} from '@angular/router';
import {GetTrips} from '../actions/trip.actions';
import * as moment from 'moment';
import {GetMarkers} from '../actions/marker.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  public onPostLogin$ = this.actions$.pipe(
    ofType<PostLogin>(EAuthActions.PostLogin),
    switchMap((action: PostLogin) => from(this.authService.postLogin(action.email, action.password)).pipe(
      switchMap((account: IAccountModel) => {
        this.localStorageService.storeAccount(account);
        this.router.navigateByUrl('home/trip');
        return [
          new PostLoginSuccess(account),
          new GetTrips(moment(), moment()),
          new GetMarkers(),
        ];
      }),
      catchError(error => of(new LoadError(error, action))),
    )),
  );


  @Effect()
  public onLogout$ = this.actions$.pipe(
    ofType<Logout>(EAuthActions.Logout),
    switchMap((action: Logout) => {
      this.localStorageService.clearAuth();
      this.router.navigateByUrl('/login');

      return [];
    }),
    catchError((err: any) => {
      return of(console.log('error'));
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalstorageService,
    private router: Router,
  ) {
  }
}
