import { Subscription } from 'rxjs';
import {
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: 'semester-modal.component.html'
})
export class SemesterModalComponent {
  constructor(
    private dialogRef: MatDialogRef<SemesterModalComponent>,
    private fb: FormBuilder
  ) {
    this.formModel = this.fb.group({
      name: ['', Validators.required],
      start: ['', Validators.required],
      date_1: ['', Validators.required],
      date_2: ['', Validators.required],
      date_3: ['', Validators.required],
      end: ['', Validators.required]
    })
  }

  formModelChangeObservable: Subscription;
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
