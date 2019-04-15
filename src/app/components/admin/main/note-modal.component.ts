import { FormControl, Validators, NgModel } from '@angular/forms';
import { MainModalComponent } from './main-modal.component';
import { MatDialogRef } from '@angular/material';
import { NoteDataService } from './data.service';
import { OnDestroy, Component, ViewChild } from '@angular/core';
import {DateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-modal',
  templateUrl: 'notes-modal.component.html'
})
export class NoteModalComponent implements OnDestroy {
  constructor(private data: NoteDataService, public dialogRef: MatDialogRef<MainModalComponent>, private adapter: DateAdapter<any>,) {
    this.adapter.setLocale('pl');
  }

  @ViewChild('no', {read: NgModel}) no: NgModel;

  note;
  isGood = false;

  showNote(){
    if (this.no.valid) {
      this.data.changeMessage(this.no.value);
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
