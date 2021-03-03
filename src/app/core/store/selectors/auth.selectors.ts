import {createSelector} from '@ngrx/store';
import {IAppState} from '../state/app.state';
import {IAuthState} from '../state/auth.state';

const _selectAuth = (state: IAppState) => state.auth;

export const selectAuthAccount = createSelector(
  _selectAuth,
  (state: IAuthState) => state.account,
);

export const selectIsAuthLoading = createSelector(
  _selectAuth,
  (state: IAuthState) => state.isLoading,
);
