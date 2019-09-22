import { Injectable } from '@angular/core';
import { LoginTokenService } from '../items/login-token-servise/login-token.service';
import { CanActivate } from '@angular/router';

@Injectable()

export class NoLogGuard implements CanActivate {

  constructor(private tokenService: LoginTokenService) {}

  canActivate(): Promise<boolean> {
    if (!this.tokenService.token) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}
