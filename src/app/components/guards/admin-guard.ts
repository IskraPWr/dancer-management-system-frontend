import { Injectable } from '@angular/core';
import { LoginTokenService } from '../items/login-token-servise/login-token.service';
import { CanActivate, CanLoad, CanActivateChild } from '@angular/router';

@Injectable()

export class AdminGuard implements CanActivate, CanLoad, CanActivateChild {

  constructor(private tokenService: LoginTokenService) {}

  canActivate(): Promise<boolean> {
    if (!this.tokenService.token) {
      return Promise.resolve(false);
    }

    if (this.tokenService.token.role === 'admin') {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  canLoad(): Promise<boolean> {
    if (!this.tokenService.token) {
      return Promise.resolve(false);
    }

    if (this.tokenService.token.role === 'admin') {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  canActivateChild(): Promise<boolean> {
    if (!this.tokenService.token) {
      return Promise.resolve(false);
    }

    if (this.tokenService.token.role === 'admin') {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}
