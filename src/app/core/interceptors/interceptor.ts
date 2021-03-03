import {IAccountModel} from '../models/account.model';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor as HttpInterceptorInterface, HttpRequest,} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {Store} from '@ngrx/store';
import {IAppState} from '../store/state/app.state';
import {getCurrentState} from '../utility';
import {Logout} from '../store/actions/auth.actions';

@Injectable()
export class Interceptor implements HttpInterceptorInterface {

  constructor(
    private store: Store<IAppState>,
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authenticatedAccount: IAccountModel = getCurrentState(this.store).auth.account;
    let accountToken = null;
    if (authenticatedAccount) {
      accountToken = authenticatedAccount.token;
    }

    if (accountToken && !req.url.includes('trackerz/login') && !req.url.includes('geoapify')) {
      req = req.clone(
        {
          setHeaders: {
            Authorization: 'Bearer ' + accountToken,
          },
        },
      );
    }

    if (!req.url.includes('file')) {
      req = req.clone(
        {
          setHeaders: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {

      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.store.dispatch(new Logout());
          }
        }
      }),
    );
  }
}

