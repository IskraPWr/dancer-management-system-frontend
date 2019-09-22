import { HttpErrorResponse } from '@angular/common/http';
import { ISelectOptions, IGroupDetails } from 'src/app/typings/typings';
import { ISemesterHeader } from './../../../../../../typings/typings.d';
import {
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { ServerService } from 'src/app/components/server/server.service';
import { minValidator } from 'src/app/components/validators/validators';

@Component({
  selector: 'app-modal',
  templateUrl: 'group-modal.component.html'
})
export class GroupModalComponent {
  constructor(
    public dialogRef: MatDialogRef<GroupModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public days: any,
    private server: ServerService,
    private snackBar: MatSnackBar
  ) {
    this.server
      .getSemesterHeaders()
      .toPromise()
      .then((semesters: ISemesterHeader[]) => {
        this.semesters = semesters.map((semester: ISemesterHeader) => {
          return {
            value: semester.id_semester.toString(),
            viewValue: semester.name
          } as ISelectOptions;
        });
      })
      .catch((err: HttpErrorResponse) => {
        this.snackBar.open('Błąd!', 'Nie udało się pobrać danych', {
          duration: 3000
        });
      });

    this.formModel = this.fb.group({
      name: ['', Validators.required],
      semester: ['', Validators.required],
      start: ['', Validators.required],
      day: ['', Validators.required],
      end: ['', [Validators.required]]
    });
  }

  semesters: ISelectOptions[];
  formModel: FormGroup;

  onStartValueChange(): void {
    if (this.formModel) {
      this.formModel.controls['end'].setValidators(
        minValidator.bind(this, this.formModel.controls['start'].value)
      );
      this.formModel.controls['end'].updateValueAndValidity();
    }
  }

  sendMessage() {
    if (this.formModel.valid) {
      const newGroupPack: IGroupDetails = {
        name: this.formModel.controls['name'].value,
        start: this.formModel.controls['start'].value,
        end: this.formModel.controls['end'].value,
        day: this.formModel.controls['day'].value,
        id_semester: this.formModel.controls['semester'].value
      };

      this.dialogRef.close(newGroupPack);
    } else {
      Object.values(this.formModel.controls).forEach((field: AbstractControl) =>
        field.markAsTouched()
      );
    }
  }

  close() {
    this.dialogRef.close();
  }
}
