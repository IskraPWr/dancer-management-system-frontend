import { LoginTokenService } from './../../items/login-token-servise/login-token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerService } from 'src/app/components/server/server.service';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { PathService } from '../../items/path-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './delete.component.html'
})
export class DeleteComponent {
  constructor(
    private Service: PathService,
    private titleService: Title,
    private router: Router,
    private server: ServerService,
    private snackBar: MatSnackBar,
    private tokenService: LoginTokenService
  ) {
    this.Service.updatePath('Konto');
    this.titleService.setTitle('Usuń konto');
  }

  delete(): void {
    this.server
      .deleteUser(this.tokenService.token.id)
      .toPromise()
      .then(() => {
        this.tokenService.token = null;
        this.router.navigate(['/']);
      })
      .catch((err: HttpErrorResponse) => {
        this.snackBar.open('Błąd!', 'Nie udało się usunąć konta', {
          duration: 2000
        });
      });
  }

  cancel(): void {
    this.router.navigate(['/konto']);
  }
}
