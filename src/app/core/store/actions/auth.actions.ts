import {Action} from '@ngrx/store';
import {IAccountModel} from '../../models/account.model';

export enum EAuthActions {
  PostLogin = '[Auth] Post Login',
  PostLoginSuccess = '[Auth] Post Login Success',
  Logout = '[Auth] Logout',
  SetAccount = '[Auth] Set Account',
}

export class PostLogin implements Action {
  public readonly type = EAuthActions.PostLogin;

  constructor(public email: string, public password: string) {
  }
}

export class PostLoginSuccess implements Action {
  public readonly type = EAuthActions.PostLoginSuccess;

  constructor(public data: IAccountModel) {

  }
}

export class SetAccount implements Action {
  public readonly type = EAuthActions.SetAccount;

  constructor(public account: IAccountModel) {

  }
}

export class Logout implements Action {
  public readonly type = EAuthActions.Logout;

  constructor() {

  }
}

export type AuthActions =
  PostLogin |
  PostLoginSuccess |
  Logout |
  SetAccount
  ;
