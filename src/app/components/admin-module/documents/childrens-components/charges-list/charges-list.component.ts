import { NoteModalComponent } from './../../../notes/notes-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ISelectOptions,
  IChargesData,
  IChargesDataDetails,
  INewNote,
  INote,
  IUsersId,
  IStatModalPresenceGroup
} from './../../../../../typings/typings.d';
import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { MatDialog, MatInput } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ServerService } from 'src/app/components/server/server.service';
import { DocumentsModalComponent } from '../../documents-modal/documents-modal.component';

@Component({
  selector: 'app-charges-list',
  templateUrl: './charges-list.component.html'
})
export class ChargesListComponent {
  constructor(
    private server: ServerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.server
      .getCharges()
      .toPromise()
      .then((data: IChargesData[]) => {
        this.semesters = data.map((semesters: IChargesData, index: number) => {
          return {
            value: index.toString(),
            viewValue: semesters.name
          } as ISelectOptions;
        });

        this.dataFromServer = data;
        this.setDataTable('0');
      })
      .catch((err: HttpErrorResponse) => {
        this.openSnackBar('Błąd!', 'Nie udało się pobrać danych');
      });
  }

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selection = new SelectionModel<IChargesDataDetails>(true);
  semesters: ISelectOptions[];
  usersData: MatTableDataSource<IChargesDataDetails>;
  dataFromServer: IChargesData[];

  dialogMessage: string;
  currentSemesterId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) searchInput: MatInput;

  displayedColumns: string[] = [
    'select',
    'name',
    'surname',
    'declaration',
    'entryFee',
    'payment1',
    'payment2',
    'payment3',
    'sum',
    'stat',
    'note'
  ];

  setDataTable(value: string): void {
    const index = parseInt(value, 10);
    this.selection.clear();

    this.usersData = new MatTableDataSource<IChargesDataDetails>(this
      .dataFromServer[index].data as IChargesDataDetails[]);
    this.usersData.paginator = this.paginator;
    this.usersData.sort = this.sort;

    this.searchInput.value = '';
    this.currentSemesterId = this.dataFromServer[index].id_semester;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  openDialog(user: IChargesDataDetails): void {
    this.dialog.open(DocumentsModalComponent, {
      width: '60%',
      data: {
        id_user: user.id,
        id_semester: this.currentSemesterId,
        name: user.name,
        surname: user.surname,
      } as IStatModalPresenceGroup
    });
  }

  applyFilter(filterValue: string) {
    this.usersData.filter = filterValue.trim().toLowerCase();

    if (this.usersData.paginator) {
      this.usersData.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.usersData.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.usersData.data.forEach(row => this.selection.select(row));
  }

  add(event: MatChipInputEvent, user: IChargesDataDetails): void {
    const input = event.input;
    const value = event.value;

    if (value !== '') {
      const newNote: INewNote = {
        id_user: user.id,
        note: value
      };

      this.server
        .postNote(newNote)
        .toPromise()
        .then(() => {
          this.openSnackBar('Sukces!', 'Notatka prawidłowo dodana');
          this.dataFromServer.forEach((semester: IChargesData) => {
            const findedUser: IChargesDataDetails = semester.data.find(
              (individualUser: IChargesDataDetails) => {
                return individualUser.id === user.id;
              }
            );
            findedUser ? findedUser.notes.push({ name: value.trim() }) : null;
          });
          input.value = '';
        })
        .catch((err: HttpErrorResponse) => {
          this.openSnackBar('Błąd!', 'Nie udało się wysłać notatki');
        });
    }
  }

  remove(note: INote, user: IChargesDataDetails): void {
    const index: number = user.notes.indexOf(note);
    const value: string = note.name;

    const newNote: INewNote = {
      id_user: user.id,
      note: value
    };

    this.server
      .deleteNote(newNote)
      .toPromise()
      .then(() => {
        this.openSnackBar('Sukces!', 'Notatka prawidłowo usunięta');
        this.dataFromServer.forEach((semester: IChargesData) => {
          const findedUser: IChargesDataDetails = semester.data.find(
            (individualUser: IChargesDataDetails) => {
              return individualUser.id === user.id;
            }
          );
          findedUser ? findedUser.notes.splice(index, 1) : null;
        });
      })
      .catch((err: HttpErrorResponse) => {
        this.openSnackBar('Błąd!', 'Nie udało się usunąć notatki');
      });
  }

  sendToArchive(): void {
    if (this.selection.selected.length !== 0) {
      const usersId: number[] = [];
      this.selection.selected.forEach(user => usersId.push(user.id));

      this.server
        .updateArchive({ ids: usersId } as IUsersId)
        .toPromise()
        .then(() => {
          this.selection.clear();

          // set dataFromServer: IUsersPresence[] && MatTableDataSource

          this.dataFromServer.forEach((semester: IChargesData) => {
            const newServerData: IChargesDataDetails[] = semester.data;
            usersId.forEach((id: number) => {
              newServerData.splice(
                newServerData.indexOf(
                  newServerData.find((user: IChargesDataDetails) => {
                    return user.id === id;
                  })
                ),
                1
              );
            });
            if (semester.data === this.usersData.data) {
              this.usersData.data = newServerData;
            }
            semester.data = newServerData;
          });

          this.openSnackBar('Sukces!', 'Przeniesienie do archiwum');
        })
        .catch((err: HttpErrorResponse) => {
          this.openSnackBar('Błąd!', 'Nie udało się zarchiwizować osób');
        });
    } else {
      this.openSnackBar('Uwaga!', 'Nie wybrano osób');
    }
  }

  addNotes() {
    if (this.selection.selected.length !== 0) {
      const userIds: number[] = [];
      this.selection.selected.forEach(user => userIds.push(user.id));

      this.dialog
        .open(NoteModalComponent)
        .afterClosed()
        .toPromise()
        .then((message: string | null) => {
          this.selection.clear();
          if (typeof message === 'string') {
            this.dialogMessage = message as string;
            const newNote: INewNote = {
              id_user: userIds,
              note: message as string
            };
            return this.server.postNotes(newNote).toPromise();
          } else {
            throw new Error('noData');
          }
        })
        .catch((err: Error) => {
          if (err.message === 'noData') {
            this.openSnackBar('Uwaga!', 'Nie wstawiono pustych notatek');
          } else {
            this.openSnackBar(
              'Błąd!',
              'Nie udało się zamknąć okna dialogowego'
            );
          }
          throw new Error('noData');
        })
        .then(() => {
          this.openSnackBar('Sukces!', 'Notatki prawidłowo dodane');
          this.dataFromServer.forEach((semester: IChargesData) => {
            userIds.map((id: number) => {
              const data: IChargesDataDetails[] = semester.data;
              data
                .find((user: IChargesDataDetails) => {
                  return user.id === id;
                })
                .notes.push({ name: this.dialogMessage } as INote);
              if (semester.data === this.usersData.data) {
                this.usersData.data = data;
              }
              semester.data = data;
            });
          });
        })
        .catch((err: HttpErrorResponse | Error) => {
          err.message !== 'noData'
            ? this.openSnackBar('Błąd!', 'Nie udało się wysłać notatek')
            : null;
        });
    } else {
      this.openSnackBar('Uwaga!', 'Nie wybrano osób');
    }
  }
}
