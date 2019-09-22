import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {
  MatChipInputEvent,
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
  MatTable
} from '@angular/material';
import { Title } from '@angular/platform-browser';
import { INote, IUsersId } from 'src/app/typings/typings';

import { PathService } from '../../../items/path-service';
import { ServerService } from '../../../server/server.service';
import { NoteModalComponent } from '../../notes/notes-modal.component';
import { MainModalComponent } from '../main-modal/main-modal.component';
import { INewNote, IUser } from './../../../../typings/typings.d';

@Component({
  templateUrl: './main.component.html'
})
export class MainComponent {
  constructor(
    private server: ServerService,
    private service: PathService,
    private titleService: Title,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.service.updatePath('Admin');
    this.titleService.setTitle('Przegląd osób');

    this.server
      .getUsers()
      .toPromise()
      .then((data: IUser[]) => {
        this.usersData = new MatTableDataSource<IUser>(data);
        this.usersData.paginator = this.paginator;
        this.usersData.sort = this.sort;
      })
      .catch((err: HttpErrorResponse) => {
        this.openSnackBar('Błąd!', 'Nie udało się pobrać danych');
      });
  }

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  displayedColumns: string[] = [
    'select',
    'name',
    'surname',
    'email',
    'phone',
    'university',
    'department',
    'year',
    'index',
    'note'
  ];

  usersData: MatTableDataSource<IUser>;
  selection = new SelectionModel<IUser>(true);
  dialogMessage: string;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  openDialog(): void {
    this.dialog.open(MainModalComponent);
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

  add(event: MatChipInputEvent, user: IUser): void {
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
          user.notes.push({ name: value.trim() });
          input.value = '';
        })
        .catch((err: HttpErrorResponse) => {
          this.openSnackBar('Błąd!', 'Nie udało się wysłać notatki');
        });
    }
  }

  remove(note: INote, user: IUser): void {
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
        user.notes.splice(index, 1);
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
        .updateArchive({ids: usersId} as IUsersId )
        .toPromise()
        .then(() => {
          this.selection.clear();
          const newData: IUser[] = this.usersData.data;
          usersId.forEach((id: number) => {
            newData.splice(
              newData.indexOf(
                newData.find((user: IUser) => {
                  return user.id === id;
                })
              ),
              1
            );
          });
          this.usersData.data = newData;
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
          if (err.message === 'noData'){
            this.openSnackBar('Uwaga!', 'Nie wstawiono pustych notatek');
          } else {
            this.openSnackBar('Błąd!', 'Nie udało się zamknąć okna dialogowego');
          }
          throw new Error('noData');
        })
        .then(() => {
          this.openSnackBar('Sukces!', 'Notatki prawidłowo dodane');
          this.selection.clear();
          userIds.map((id: number) =>
            this.usersData.data
              .find((user: IUser) => {
                return user.id === id;
              })
              .notes.push({ name: this.dialogMessage })
          );
        })
        .catch((err: HttpErrorResponse | Error) => {
          err.message !== 'noData' ?  this.openSnackBar('Błąd!', 'Nie udało się wysłać notatek') : null;
        });
    } else {
      this.openSnackBar('Uwaga!', 'Nie wybrano osób');
    }
  }
}
