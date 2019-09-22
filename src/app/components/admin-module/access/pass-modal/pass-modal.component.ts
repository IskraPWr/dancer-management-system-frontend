import { ApplicationAdministratorsComponent } from './../application-administrators/application-administrators.component';
import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';
import { SiteAdministratorsComponent } from '../site-administrators/site-administrators.component';


@Component({
  selector: 'app-modal',
  templateUrl: 'pass-modal.component.html'
})
export class PassModalComponent {
  constructor(
    private dialogRef: MatDialogRef<ApplicationAdministratorsComponent | SiteAdministratorsComponent>,
  ) {}

  confirmation() {
   this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
