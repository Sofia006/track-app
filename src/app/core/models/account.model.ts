export interface IAccountModel {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;

  password?: string;
  token?: string;
}
