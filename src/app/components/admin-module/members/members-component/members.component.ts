import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {
  MatChipInputEvent,
  MatDialog,
  MatPaginator,
  MatSelect,
  MatSelectChange,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
  MatInput
} from '@angular/material';
import { Title } from '@angular/platform-browser';
import { IUser } from 'src/app/typings/typings';

import { PathService } from '../../../items/path-service';
import { ServerService } from '../../../server/server.service';
import { NoteModalComponent } from '../../notes/notes-modal.component';
import { MemberModalComponent } from '../members-modal-add-to-group/members-modal.component';
import { MembersStatModalComponent } from '../members-modal-stat/members-stat-modal.component';
import {
  IAssignments,
  IGenderStat,
  IGroupChangePack,
  IGroupMember,
  IGroupMemberPresence,
  IGroupName,
  INewNote,
  INote,
  ISelectOptions,
  ISemesterName,
  IUsersId
} from './../../../../typings/typings.d';

@Component({
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent {
  constructor(
    private server: ServerService,
    private service: PathService,
    private titleService: Title,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.service.updatePath('Admin');
    this.titleService.setTitle('Grupy');
    this.isGroupList = false;
    this.isLoadedGroup = false;
    this.wasCompositionGroupChange = false;

    this.getStartData();
  }

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  usersData: MatTableDataSource<IUser>;
  currentData: MatTableDataSource<IUser | any>;
  selection = new SelectionModel<IUser | any>(true);

  currentDisplayedColumns: string[];
  dateColumns: string[];
  displayedUserColumns: string[] = [
    'select',
    'name',
    'surname',
    'email',
    'phone',
    'gender',
    'attribution',
    'note'
  ];

  displayedGroupColumns: string[] = ['select', 'name', 'surname', 'gender'];

  semesters: ISelectOptions[];
  groups: ISelectOptions[];
  isGroupList: boolean;
  isLoadedGroup: boolean;
  wasCompositionGroupChange: boolean;

  dialogMessageFromAddNoteModal: string;
  dialogMessageFromAddToGroupModal: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('groupSelect') groupSelect: MatSelect;
  @ViewChild(MatInput) matInput: MatInput;

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  getStartData = () => {
    this.server
      .getUsersWithAssignments()
      .toPromise()
      .then((data: IUser[]) => {
        data.map((user: IUser) => {
          user.assignmentsPack = [];
          user.assignments.forEach((assignments: IAssignments) =>
            user.assignmentsPack.push(assignments.group_name)
          );
        });
        this.currentDisplayedColumns = this.displayedUserColumns;
        this.usersData = new MatTableDataSource<IUser>(data);
        this.currentData = this.usersData;
        this.currentData.paginator = this.paginator;
        this.currentData.sort = this.sort;

        this.isGroupList = false;
        this.isLoadedGroup = false;
      })
      .catch((err: HttpErrorResponse) => {
        this.openSnackBar('Błąd!', 'Nie udało się pobrać danych');
      });
  }

  getSemesters(e: MatSelectChange): void {
    if (e.value === '1') {
      this.isGroupList = true;
      if (!this.semesters) {
        this.isGroupList = true;
        this.server
          .getSemesterHeaders()
          .toPromise()
          .then((data: ISemesterName[]) => {
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
    } else {
      if (this.wasCompositionGroupChange) {
        this.getStartData();
        this.wasCompositionGroupChange = false;
      } else {
        this.isLoadedGroup = false;
        this.isGroupList = false;
        this.currentDisplayedColumns = this.displayedUserColumns;
        this.currentData = this.usersData;
      }

      this.matInput.value = '';
    }
  }

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

  getUsersInGroup(e: MatSelectChange): void {
    const index: number = parseInt(e.value, 10);

    this.server
      .getUsersInGroupByIdGroup(index)
      .toPromise()
      .then((data: IGroupMember[]) => {
        this.dateColumns = data[0]
          ? data[0].presences.map(
              (presences: IGroupMemberPresence) => presences.date
            )
          : [];

        this.currentDisplayedColumns = this.displayedGroupColumns.concat(
          this.dateColumns,
          ['note']
        );

        const groupData: object[] = data.map((user: IGroupMember) => {
          const userData: object = {};
          user.presences.map(
            (presence: IGroupMemberPresence) =>
              (userData[presence.date] = presence.value)
          );
          userData['gender'] = user.gender;
          userData['name'] = user.name;
          userData['surname'] = user.surname;
          userData['notes'] = user.notes;
          userData['id'] = user.id;
          return userData;
        });

        this.isLoadedGroup = true;
        this.currentData = new MatTableDataSource<any>(groupData);
        this.matInput.value = '';
      })
      .catch((err: HttpErrorResponse) => {
        this.openSnackBar('Błąd!', 'Nie udało się pobrać danych');
      });
  }

  openDialog(): void {
    const stat: IGenderStat = {
      man: 0,
      woman: 0
    };

    this.currentData.data.forEach((user: IUser) => {
      user.gender === 0 ? stat.man++ : stat.woman++;
    });

    this.dialog.open(MembersStatModalComponent, {
      width: 'auto',
      data: stat
    });
  }

  applyFilter(filterValue: string) {
    this.currentData.filter = filterValue.trim().toLowerCase();

    if (this.currentData.paginator) {
      this.currentData.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.currentData.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.currentData.data.forEach(row => this.selection.select(row));
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
        .updateArchive({ ids: usersId } as IUsersId)
        .toPromise()
        .then(() => {
          this.selection.clear();
          const newData: IUser[] = this.currentData.data;
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
          this.currentData.data = newData;
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
      const usersIds: number[] = [];
      this.selection.selected.forEach(user => usersIds.push(user.id));

      this.dialog
        .open(NoteModalComponent)
        .afterClosed()
        .toPromise()
        .then((message: string | null) => {
          if (typeof message === 'string') {
            this.dialogMessageFromAddNoteModal = message as string;
            const newNote: INewNote = {
              id_user: usersIds,
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
          usersIds.map((id: number) => {
            this.currentData.data
              .find((user: IUser) => {
                return user.id === id;
              })
              .notes.push({ name: this.dialogMessageFromAddNoteModal });

            this.usersData !== this.currentData
              ? this.usersData.data
                  .find((user: IUser) => {
                    return user.id === id;
                  })
                  .notes.push({ name: this.dialogMessageFromAddNoteModal })
              : null;
          });
          this.selection.clear();
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

  addToGroup(): void {
    if (this.selection.selected.length !== 0) {
      const usersIds: number[] = [];
      this.selection.selected.forEach(user => usersIds.push(user.id));

      this.dialog
        .open(MemberModalComponent)
        .afterClosed()
        .toPromise()
        .then((idGroup: number | null) => {
          if (idGroup) {
            this.dialogMessageFromAddToGroupModal = idGroup as number;
            const newGroupPack: IGroupChangePack = {
              id_user: usersIds,
              id_group: idGroup as number
            };
            return this.server.addToGroup(newGroupPack).toPromise();
          } else {
            throw new Error('noData');
          }
        })
        .catch((err: Error) => {
          if (err.message === 'noData') {
            this.openSnackBar('Uwaga!', 'Nie przypisano osób do grup');
          } else {
            this.openSnackBar(
              'Błąd!',
              'Nie udało się zamknąć okna dialogowego'
            );
          }
          throw new Error('noData');
        })
        .then(() => {
          this.openSnackBar(
            'Sukces!',
            'Użytkownicy zostali przypisani do grupy'
          );
          this.selection.clear();
          this.getStartData();
        })
        .catch((err: HttpErrorResponse | Error) => {
          err.message !== 'noData'
            ? this.openSnackBar(
                'Błąd!',
                'Nie udało się przypisać użytkowników do grup'
              )
            : null;
        });
    } else {
      this.openSnackBar('Uwaga!', 'Nie wybrano osób!');
    }
  }

  removeFromGroup(): void {
    if (this.selection.selected.length !== 0) {
      const usersIds: number[] = [];
      this.selection.selected.forEach(user => usersIds.push(user.id));

      const removeGroupPack: IGroupChangePack = {
        id_user: usersIds,
        id_group: this.groupSelect.value as number
      };

      this.server
        .removeFromGroup(removeGroupPack)
        .toPromise()
        .then(() => {
          const newData: IUser[] = this.currentData.data;
          usersIds.forEach((id: number) => {
            newData.splice(
              newData.indexOf(
                newData.find((user: IUser) => {
                  return user.id === id;
                })
              ),
              1
            );
          });
          this.currentData.data = newData;
          this.selection.clear();
          this.wasCompositionGroupChange = true;
          this.openSnackBar('Usuniecie z grupy', 'Sukces!');
        })
        .catch((err: HttpErrorResponse) => {
          this.openSnackBar('Błąd!', 'Nie udało się usunąć osób z grup');
        });
    } else {
      this.openSnackBar('Uwaga!', 'Nie wybrano osób!');
    }
  }
}
