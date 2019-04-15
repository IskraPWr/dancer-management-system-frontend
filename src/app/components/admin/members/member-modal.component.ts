import { NoteDataService } from './../main/data.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { OnDestroy, Component, OnInit } from '@angular/core';
import { ServerService } from './../../../server/server.service';

@Component({
  selector: 'app-modal',
  templateUrl: 'member-modal.component.html'
})
export class MemberModalComponent implements OnDestroy, OnInit {
  constructor(private data: NoteDataService, public dialogRef: MatDialogRef<MemberModalComponent>, private server: ServerService, private snackBar: MatSnackBar) {
  }

  semesters: Array<any> = [];
  groups: Array<any> = [];

  isGood = false;
  lastSelected;

  ngOnInit (){
    let semesterHeaders = this.server.getSemesterHeaders().subscribe(
      data => {
        this.semesters = [];
        for ( const object of data as Array<any>) {
          this.semesters.push({
            value: object.id_semester,
            viewValue: object.name,
          })
        }
        semesterHeaders.unsubscribe();
      },
      error => console.log(error)
    );
  }

  selectData(value){
    this.lastSelected = value;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  sendToGroup(){
    if(this.lastSelected){
      this.data.changeMessage(this.lastSelected);
      this.isGood = true;
      this.dialogRef.close();
    }else {
      this.openSnackBar('Uwaga', 'Wybierz grupę!');
    };
  }

  close() {
    this.dialogRef.close();
  }

  getGroups(data){
    this.groups = [];
    this.lastSelected = null;
    let groupHeaders = this.server.getGroupsHeadersById(data).subscribe(
      data => {
        for ( const object of data as Array<any>) {
          this.groups.push({
            value: object.id,
            viewValue: object.name,
          })
        }
        groupHeaders.unsubscribe();
      },
      error => console.log(error)
    );
  }

  ngOnDestroy (){
    if (!this.isGood) {
      this.data.changeMessage('error404');
    }
  }
}
