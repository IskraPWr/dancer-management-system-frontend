import { LoginTokenService } from './../../items/login-token-servise/login-token.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PathService } from '../../items/path-service';
import { ServerService } from '../../server/server.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ILoginTokenFromServer } from 'src/app/typings/typings';


@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(
    private Service: PathService,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private server: ServerService,
    private tokenService: LoginTokenService
  ) {
    this.Service.updatePath('Logowanie');
    this.titleService.setTitle('Logowanie');

    this.error = false;

    this.formModel = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  formModel: FormGroup;
  error: boolean;

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  onSubmit(): void {
    if (this.formModel.valid) {

      this.server
        .login(this.formModel.value)
        .toPromise()
        .then((res: ILoginTokenFromServer) => {
          if (res) {
            this.tokenService.token = {
              id: res.id,
              role: res.role
            };

            this.openSnackBar('Sukces!', 'Zostałeś prawidłowo zalogowany, trwa pobieranie danych');

            if (res.role === 'user') {
              this.router.navigate(['/konto']);
            } else {
              this.router.navigate(['/admin']);
            }
          }
        })
        .catch((error: HttpErrorResponse) => {
          this.error = true;
        });
    } else {
      this.formModel.controls['password'].markAsDirty();
      this.formModel.controls['login'].markAsDirty();
    }
  }
}
