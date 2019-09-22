import { MatSnackBar } from '@angular/material';
import { LoginTokenService } from './../../items/login-token-servise/login-token.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './log.component.html'
})
export class LogComponent {
  constructor(private router: Router, private tokenService: LoginTokenService,private snackBar: MatSnackBar,) {}

  login() {
    this.router.navigate(['/']);
  }

  logout() {
    this.tokenService.token = null;
    this.snackBar.open('Sukces!', 'Wylogowywanie przebieglo pomyślnie', {
      duration: 3000
    });
    this.router.navigate(['/']);
  }
}
