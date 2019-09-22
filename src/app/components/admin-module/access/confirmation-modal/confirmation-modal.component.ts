import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationAdministratorsComponent } from './../application-administrators/application-administrators.component';
import { NgModel } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, ViewChild, Input } from '@angular/core';
import { SiteAdministratorsComponent } from '../site-administrators/site-administrators.component';
import { ServerService } from 'src/app/components/server/server.service';
import { IAdminConfirmation } from 'src/app/typings/typings';

@Component({
  selector: 'app-modal',
  templateUrl: 'confirmation-modal.component.html'
})
export class ConfirmationAdminModalComponent {
  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ConfirmationAdminModalComponent>,
    private server: ServerService,
    @Inject(MAT_DIALOG_DATA) private data: IAdminConfirmation,
  ) {}

  @ViewChild('password', { read: NgModel }) password: NgModel;


   confirmation() {
    if (this.password.valid) {
        this.checkPassword(this.password.value, this.data.id).then((isFound: boolean) => {
          isFound ? this.dialogRef.close(this.password.value) : this.openSnackBar('Uwaga!', 'Prawdopodobnie podano złe hasło dostępu');
        });
    } else {
      this.password.control.markAsTouched();
    }
  }

  checkPassword(password: string, idAdmin: number): Promise<boolean> {
    if (this.data.type === 'page') {
      return this.server.checkPageAdminPassword({password, id: idAdmin}).toPromise().then((isFound: boolean) =>{
        return isFound;
      }).catch((err: HttpErrorResponse) => {
        return false;
      });
    } else {
      return Promise.resolve(true);
    }

}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  close() {
    this.dialogRef.close();
  }

}
