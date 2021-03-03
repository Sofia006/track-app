import {IAccountModel} from '../../models/account.model';

export interface IAuthState {
  account: IAccountModel;
  isLoading: boolean;
}

export const initialAuthState: IAuthState = {
  account: null,
  isLoading: false,
};
