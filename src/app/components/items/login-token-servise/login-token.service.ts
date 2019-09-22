import { Injectable } from '@angular/core';
import { ILoginTokenFromServer } from 'src/app/typings/typings';

@Injectable()
export class LoginTokenService {
  constructor() {
  }

  private _token: ILoginTokenFromServer;

  get token() {
    return this._token;
  }

  set token(value: ILoginTokenFromServer) {
    this._token = value;
  }
}
