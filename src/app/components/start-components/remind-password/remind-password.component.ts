import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { PathService } from '../../items/path-service';
import { ServerService } from '../../server/server.service';
import { SuccessModalComponent } from '../create-account/create-account-modal-component/success-modal.component';

@Component({
  templateUrl: './remind-password.component.html',
  styles: ['.error {color:red']
})
export class RemindPasswordComponent {
  constructor(
    private Service: PathService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private titleService: Title,
    private fb: FormBuilder,
    private server: ServerService,
    private router: Router
  ) {
    this.Service.updatePath('Wygeneruj hasło');
    this.titleService.setTitle('Wygeneruj hasło');

    this.formModel = fb.group({
      login: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.error = false;
  }

  formModel: FormGroup;
  error: boolean;


  check(): void {
    if (this.formModel.valid) {

      this.server
        .generatePass(this.formModel.value)
        .toPromise()
        .then((res: any) => {
          return this.dialog
            .open(SuccessModalComponent, {
              data: { isRemindPassView: true }
            })
            .afterClosed()
            .toPromise();
        }).then(() => {
          this.router.navigate(['']);
        }).catch((err: HttpErrorResponse) => {
         this.error = true;
        });
    } else {
      this.formModel.controls['email'].markAsDirty();
      this.formModel.controls['login'].markAsDirty();
    }
  }
}
