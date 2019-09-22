import { NgModel } from '@angular/forms';
import { MainModalComponent } from '../main/main-modal/main-modal.component';
import { MatDialogRef } from '@angular/material';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: 'notes-modal.component.html'
})
export class NoteModalComponent {
  constructor(
    private dialogRef: MatDialogRef<MainModalComponent>
  ) {}

  @ViewChild('noteInput', { read: NgModel }) noteInput: NgModel;


  showNote() {
   if (this.noteInput.valid) {
      this.dialogRef.close(this.noteInput.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
