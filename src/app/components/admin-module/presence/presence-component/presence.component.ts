import { PresenceModalComponent } from './../presence-modal/presence-modal.component';
import {
  ISelectOptions,
  INewNote,
  IUsersId
} from './../../../../typings/typings.d';
import { NoteModalComponent } from '../../notes/notes-modal.component';
import {
  Component,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Title } from '@angular/platform-browser';

import {
  MatDialog,
  MatSnackBar,
  MatSelectChange
} from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { PathService } from '../../../items/path-service';
import { ServerService } from '../../../server/server.service';
import {
  IUserListPresence,
  INote,
  IUsersPresence
} from 'src/app/typings/typings';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './presence.component.html'
})
export class PresenceComponent {
  constructor(
    private server: ServerService,
    private service: PathService,
    private titleService: Title,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.service.updatePath('Admin');
    this.titleService.setTitle('Obecność');

    this.server
      .getPresence()
      .toPromise()
      .then((data: IUsersPresence[]) => {
        this.dataFromServer = data;
        this.usersData = new MatTableDataSource<IUserListPresence>(data[0]
          .data as IUserListPresence[]);
        this.weeks = data.map((week: IUsersPresence, index: number) => {
          return {
            viewValue: week.week,
            value: index.toString()
          } as ISelectOptions;
        });
        this.usersData.paginator = this.paginator;
        this.usersData.sort = this.sort;
      })
      .catch((err: HttpErrorResponse) => {
        this.openSnackBar('Błąd!', 'Nie udało się pobrać danych');
      });
  }

  displayedColumns: string[] = [
    'select',
    'name',
    'surname',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
    'sun',
    'note'
  ];

  dialogMessage: string;
  weeks: ISelectOptions[];
  usersData: MatTableDataSource<IUserListPresence>;
  dataFromServer: IUsersPresence[];
  selection = new SelectionModel<IUserListPresence>(true, []);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') searchInput: ElementRef;

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  setWeek(event: MatSelectChange) {
    this.selection.clear();
    this.searchInput.nativeElement.value = '';
    const id: number = parseInt(event.value, 10);
    this.usersData = new MatTableDataSource<IUserListPresence>(this
      .dataFromServer[id].data as IUserListPresence[]);
    this.usersData.paginator = this.paginator;
    this.usersData.sort = this.sort;
  }

  openDialog(): void {
    this.dialog.open(PresenceModalComponent, {
      maxHeight: '100vh',
      minWidth: '80vw'
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

  add(event: MatChipInputEvent, user: IUserListPresence): void {
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
          this.dataFromServer.forEach((week: IUsersPresence) => {
            const findedUser: IUserListPresence = week.data.find(
              (individualUser: IUserListPresence) => {
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

  remove(note: INote, user: IUserListPresence): void {
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
        this.dataFromServer.forEach((week: IUsersPresence) => {
          const findedUser: IUserListPresence = week.data.find(
            (individualUser: IUserListPresence) => {
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

          this.dataFromServer.forEach((week: IUsersPresence) => {
            const newServerData: IUserListPresence[] = week.data;
            usersId.forEach((id: number) => {
              newServerData.splice(
                newServerData.indexOf(
                  newServerData.find((user: IUserListPresence) => {
                    return user.id === id;
                  })
                ),
                1
              );
            });
            if(week.data === this.usersData.data){
              this.usersData.data = newServerData;
            }
            week.data = newServerData;
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
          this.dataFromServer.forEach((week: IUsersPresence) => {
            userIds.map((id: number) => {
              const data: IUserListPresence[] = week.data;
              data
                .find((user: IUserListPresence) => {
                  return user.id === id;
                })
                .notes.push({ name: this.dialogMessage } as INote);
              if (week.data === this.usersData.data) {
                this.usersData.data = data;
              }
              week.data = data;
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
