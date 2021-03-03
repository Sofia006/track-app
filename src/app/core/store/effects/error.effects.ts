import {ToastrService} from 'ngx-toastr';
import {EErrorActions, LoadError} from '../actions/error.actions';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ErrorEffects {
  @Effect()
  public onLoadError$ = this.actions$.pipe(
    ofType<LoadError>(EErrorActions.LoadError),
    switchMap((error: LoadError) => {
      console.log(error);
      this.toastrService.error(error.error['error']['message']);
      return of({type: 'error'});
    }),
  );

  constructor(
    private actions$: Actions,
    private toastrService: ToastrService,
  ) {
  }
}
