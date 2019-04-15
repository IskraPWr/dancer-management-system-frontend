import { FormControl, Validators, FormGroup, NgModel } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { OnDestroy, Component, ViewChild } from '@angular/core';
import { NoteDataService } from '../../main/data.service';


@Component({
  selector: 'app-modal',
  templateUrl: 'group-modal.component.html',
})
export class GroupModalComponent implements OnDestroy {
  constructor(private data: NoteDataService, public dialogRef: MatDialogRef<GroupModalComponent>) {
  }

  @ViewChild('name', {read: NgModel}) name: NgModel;
  @ViewChild('start', {read: NgModel}) start: NgModel;
  @ViewChild('day', {read: NgModel}) day: NgModel;
  @ViewChild('end', {read: NgModel}) end: NgModel;

  days = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota'
  ];

  isGood = false;

  sendMessage(){
    if (this.name.valid && this.start.valid && this.day.valid && this.end.valid ) {
      const message = JSON.stringify({
        name: this.name.value,
        start: this.start.value,
        end: this.end.value,
        day: this.day.value,
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
