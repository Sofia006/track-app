import {IAuthState, initialAuthState} from '../state/auth.state';
import {AuthActions, EAuthActions} from '../actions/auth.actions';
import {EErrorActions, ErrorActions} from '../actions/error.actions';

export const authReducers = (
  state = initialAuthState,
  action: AuthActions | ErrorActions,
): IAuthState => {
  switch (action.type) {
    case EErrorActions.LoadError: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case EAuthActions.PostLogin: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EAuthActions.PostLoginSuccess: {
      return {
        ...state,
        isLoading: false,
        account: action.data,
      };
    }
    case EAuthActions.SetAccount: {
      return {
        ...state,
        isLoading: false,
        account: action.account,
      };
    }
    default:
      return state;
  }
};
