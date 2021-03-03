import {Store} from '@ngrx/store';
import {IAppState} from './store/state/app.state';
import {take} from 'rxjs/operators';

export function getCurrentState(aStore: Store<IAppState>): IAppState {

  let state: IAppState;

  aStore.pipe(take(1)).subscribe(s => state = s);

  if (!state) {
    throw new Error('error');
  }

  return state;
}
