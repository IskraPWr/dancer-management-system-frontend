import { NgModel, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Component, ViewChild } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: 'administrators-modal.component.html',
})
export class AdministratorsModalComponent {
  constructor(public dialogRef: MatDialogRef<AdministratorsModalComponent>, private fb: FormBuilder) {
    this.formModel = fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  formModel: FormGroup;

  sendMessage() {
    if (this.formModel.valid) {
      this.dialogRef.close(this.formModel.value);
    } else {
      Object.values(this.formModel.controls).forEach((field: AbstractControl) => field.markAsTouched());
    }
  }

  close() {
    this.dialogRef.close();
  }
}
