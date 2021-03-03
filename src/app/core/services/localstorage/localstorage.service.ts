import {Injectable} from '@angular/core';
import {IAccountModel} from '../../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {

  private inMemoryStorage: { [key: string]: string } = {};
  private __isSupported: boolean = undefined;

  private ACCOUNT_KEY = 'TRACKERZACCOUNT';

  constructor() {
  }

  public storeAccount(account: IAccountModel): void {
    return this._setItem(this.ACCOUNT_KEY, JSON.stringify(account));
  }

  public getAccount(): IAccountModel | null {
    if (this._getItem(this.ACCOUNT_KEY) !== 'undefined') {
      return JSON.parse(String(this._getItem(this.ACCOUNT_KEY)));
    }
  }

  public clearAuth(): void {
    let account = this.getAccount();

    this._setItem(this.ACCOUNT_KEY, undefined);

    if (account) {
      account = undefined;
      this.storeAccount(account);
    }
  }

  private _getItem(name: string): string | null {
    if (this._isSupported()) {
      return localStorage.getItem(name);
    }
    if (this.inMemoryStorage.hasOwnProperty(name)) {
      return this.inMemoryStorage[name];
    }

    return null;
  }

  private _removeItem(name: string): void {
    if (this._isSupported()) {
      localStorage.removeItem(name);
    } else {
      delete this.inMemoryStorage[name];
    }
  }

  private _setItem(name: string, value: string): void {
    if (this._isSupported()) {
      localStorage.setItem(name, value);
    } else {
      this.inMemoryStorage[name] = String(value); // not everyone uses TypeScript
    }
  }

  private _clear(): void {
    if (this._isSupported()) {
      localStorage.clear();
    } else {
      this.inMemoryStorage = {};
    }
  }

  private _isSupported(): boolean {
    if (this.__isSupported !== undefined) {
      return this.__isSupported;
    }

    try {
      this.__isSupported = true;

      return true;
    } catch (e) {
      this.__isSupported = false;

      return false;
    }
  }
}
