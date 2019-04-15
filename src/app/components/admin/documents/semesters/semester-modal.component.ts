import { FormControl, Validators, FormGroup, NgModel } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { OnDestroy, Component, ViewChild } from '@angular/core';
import { NoteDataService } from '../../main/data.service';


@Component({
  selector: 'app-modal',
  templateUrl: 'semester-modal.component.html'
})
export class SemesterModalComponent implements OnDestroy {
  constructor(private data: NoteDataService, public dialogRef: MatDialogRef<SemesterModalComponent>) {
  }

  @ViewChild('name', {read: NgModel}) name: NgModel;
  @ViewChild('start', {read: NgModel}) start: NgModel;
  @ViewChild('date_1', {read: NgModel}) date_1: NgModel;
  @ViewChild('date_2', {read: NgModel}) date_2: NgModel;
  @ViewChild('date_3', {read: NgModel}) date_3: NgModel;
  @ViewChild('end', {read: NgModel}) end: NgModel;

  isGood = false;

  sendMessage(){
    if (this.name.valid && this.start.valid && this.date_1.valid && this.date_2.valid && this.date_3.valid && this.end.valid ) {
      const message = JSON.stringify({
        name: this.name.value,
        start: this.start.value,
        date_1: this.date_1.value,
        date_2: this.date_2.value,
        date_3: this.date_3.value,
        end: this.end.value,
      })
      this.data.changeMessage(message);
      this.isGood = true;
      this.dialogRef.close();
    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy (){
    if (!this.isGood) {
      this.data.changeMessage('error404');
    }
  }
}
