import { IInstallments } from 'src/app/typings/typings';
import {
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl,
  FormControl,
  NgModel
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: 'installment-modal.component.html'
})
export class InstalmentModalComponent {
  constructor(
    private dialogRef: MatDialogRef<InstalmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) private nameOfPeopleType: string[],
    private fb: FormBuilder
  ) {
    this.formModel = fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      installment_1: ['', [Validators.required]],
      installment_2: ['', [Validators.required]],
      installment_3: ['', [Validators.required]]
    });
  }

  formModel: FormGroup;

  @ViewChild('installment_1a', { read: NgModel }) installment_1a: NgModel;
  @ViewChild('installment_2a', { read: NgModel }) installment_2a: NgModel;
  @ViewChild('installment_3a', { read: NgModel }) installment_3a: NgModel;

  setName(nr) {
    const oldPhrase: string = this.nameOfPeopleType[parseInt(nr, 10)];
    const newPhrase: string = oldPhrase
      .slice(0, 1)
      .toLocaleLowerCase()
      .concat(oldPhrase.slice(1));

    return this.formModel.controls['type'].value === '-1'
      ? ` - ${newPhrase}`
      : '';
  }

  sendMessage(): null {
    if (this.formModel.valid) {
      if (this.formModel.controls['type'].value === '-1') {
        if (
          this.installment_1a.valid &&
          this.installment_2a.valid &&
          this.installment_3a.valid
        ) {
          this.createAnswer(this.formModel.value, [
            this.installment_1a.value,
            this.installment_2a.value,
            this.installment_3a.value
          ]);
          return null;
        } else {
          this.installment_1a.control.markAsTouched();
          this.installment_2a.control.markAsTouched();
          this.installment_3a.control.markAsTouched();
        }
      } else {
        this.createAnswer(this.formModel.value);
        return null;
      }
    } else {
      Object.values(this.formModel.controls).forEach((field: AbstractControl) =>
        field.markAsTouched()
      );
      if (this.formModel.controls['type'].value === '-1') {
        this.installment_1a.control.markAsTouched();
        this.installment_2a.control.markAsTouched();
        this.installment_3a.control.markAsTouched();
      }
    }
  }

  createAnswer(
    formDataValues: IInstallments,
    valueFromFormTemplate?: number[]
  ) {
    const arrayOfValue: IInstallments[] = [];
    if (valueFromFormTemplate) {
      arrayOfValue.push({
        name: formDataValues.name,
        type: 1,
        installment_1: valueFromFormTemplate[0],
        installment_2: valueFromFormTemplate[1],
        installment_3: valueFromFormTemplate[2]
      });
    }

    arrayOfValue.push({
      name: formDataValues.name,
      type: 0,
      installment_1: formDataValues.installment_1,
      installment_2: formDataValues.installment_2,
      installment_3: formDataValues.installment_3
    });

    this.dialogRef.close(arrayOfValue);
  }

  close() {
    this.dialogRef.close();
  }
}
