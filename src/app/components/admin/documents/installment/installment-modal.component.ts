import { FormControl, Validators, FormGroup, NgModel } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { OnDestroy, Component, ViewChild } from '@angular/core';
import { NoteDataService } from '../../main/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: 'installment-modal.component.html'
})
export class InstalmentModalComponent implements OnDestroy {
  constructor(
    private data: NoteDataService,
    public dialogRef: MatDialogRef<InstalmentModalComponent>
  ) {}

  @ViewChild('name', { read: NgModel }) name: NgModel;
  @ViewChild('type', { read: NgModel }) type: NgModel;
  @ViewChild('installment_1', { read: NgModel }) installment_1: NgModel;
  @ViewChild('installment_2', { read: NgModel }) installment_2: NgModel;
  @ViewChild('installment_3', { read: NgModel }) installment_3: NgModel;
  @ViewChild('installment_1a', { read: NgModel }) installment_1a: NgModel;
  @ViewChild('installment_2a', { read: NgModel }) installment_2a: NgModel;
  @ViewChild('installment_3a', { read: NgModel }) installment_3a: NgModel;

  nameOfPeopleType = ['- osoby z Politechniki', '- osoby z poza Politechniki'];

  isGood = false;

  setName(nr) {
    return this.type.value === 2 ? this.nameOfPeopleType[parseInt(nr, 10)] : '';
  }

  sendMessage() {
    if (this.type.valid && this.type.value === 2) {
      if (
        this.name.valid &&
        this.installment_1.valid &&
        this.installment_2.valid &&
        this.installment_3.valid &&
        this.installment_1a.valid &&
        this.installment_2a.valid &&
        this.installment_3a.valid
      ) {
        this.data.changeMessage(
          JSON.stringify({
            first: {
              name: this.name.value,
              installment_1: this.installment_1.value,
              installment_2: this.installment_2.value,
              installment_3: this.installment_3.value,
              type: 0
            },
            second: {
              name: this.name.value,
              installment_1: this.installment_1a.value,
              installment_2: this.installment_2a.value,
              installment_3: this.installment_3a.value,
              type: 1
            }
          })
        );
        this.isGood = true;
        this.dialogRef.close();
      }
    } else {
      if (
        this.name.valid &&
        this.installment_1.valid &&
        this.type.valid &&
        this.installment_2.valid &&
        this.installment_3.valid
      ) {
        const message = JSON.stringify({
          name: this.name.value,
          installment_1: this.installment_1.value,
          installment_2: this.installment_2.value,
          installment_3: this.installment_3.value,
          type: this.type.value === 0 ? 0 : 1
        });
        this.data.changeMessage(message);
        this.isGood = true;
        this.dialogRef.close();
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (!this.isGood) {
      this.data.changeMessage('error404');
    }
  }
}
