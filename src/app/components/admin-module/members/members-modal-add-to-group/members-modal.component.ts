import { HttpErrorResponse } from '@angular/common/http';
import { ISemesterName, ISelectOptions, IGroupName } from './../../../../typings/typings.d';
import { MembersComponent } from './../members-component/members.component';
import { MatDialogRef, MatSnackBar, MatSelectChange, MatSelect } from '@angular/material';
import { Component, ViewChild } from '@angular/core';
import { ServerService } from '../../../server/server.service';

@Component({
  selector: 'app-modal',
  templateUrl: 'members-modal.component.html'
})
export class MemberModalComponent {
  constructor(
    private dialogRef: MatDialogRef<MembersComponent>,
    private server: ServerService,
    private snackBar: MatSnackBar
  ) {
    this.server.getSemesterHeaders().toPromise().then((data: ISemesterName[]) => {
      this.semesters = data.map((semester: ISemesterName) => {
        return {
          value: semester.id_semester.toString(),
          viewValue: semester.name
        } as ISelectOptions;
      });
    })
    .catch((err: HttpErrorResponse) => {
      this.openSnackBar('Błąd!', 'Nie udało się pobrać danych');
    });
  }

  semesters: ISelectOptions[];
  groups: ISelectOptions[];

  @ViewChild('groupSelect') groupSelect: MatSelect;


  getGroups(e: MatSelectChange): void {
    const index: number = parseInt(e.value, 10);

    this.server
      .getGroupsHeadersById(index)
      .toPromise()
      .then((data: IGroupName[]) => {
        this.groupSelect.value = undefined;
        this.groups = data.map((group: IGroupName) => {
          return {
            value: group.id.toString(),
            viewValue: group.name
          } as ISelectOptions;
        });
      })
      .catch((err: HttpErrorResponse) => {
        this.openSnackBar('Błąd!', 'Nie udało się pobrać danych');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  assignToGroup() {
    if (this.groupSelect.value) {
      this.dialogRef.close(this.groupSelect.value);
    } else {
      this.openSnackBar('Uwaga!', 'Wybierz grupę!');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
