import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: 'success-modal.component.html',
})
export class SuccessModalComponent {
  constructor( public dialogRef: MatDialogRef<SuccessModalComponent>, @Inject(MAT_DIALOG_DATA) public data: object) {
  }
  close() {
    this.dialogRef.close();
  }
}
