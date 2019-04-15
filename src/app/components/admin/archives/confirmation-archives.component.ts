import { ArchivesComponent } from './archives.component';
import { NoteDataService } from './../main/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OnDestroy, Component, Inject } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: 'confirmation-archives.component.html'
})
export class ConfirmationModalComponent implements OnDestroy {
  constructor(private data: NoteDataService, public dialogRef: MatDialogRef<ArchivesComponent>, @Inject(MAT_DIALOG_DATA) public modalData: any,) {
  }

  isGood = false;

  confirmation(){
      this.isGood = true;
      this.dialogRef.close();
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
