import { MembersStatModalComponent } from '../members/members-modal-stat/members-stat-modal.component';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { Title } from '@angular/platform-browser';

import { PathService } from '../../items/path-service';
import { ServerService } from '../../server/server.service';
import { ConfirmationModalComponent } from '../confirmation/confirmation-modal.component';
import {
  IArchivesDeleteDataPack,
  IArchivesRevertDataPack,
  IUser,
  TConfirmationType,
  IGenderStat
} from '../../../typings/typings';

@Component({
  templateUrl: './archives.component.html'
})
export class ArchivesComponent {
  constructor(
    private Service: PathService,
    private titleService: Title,
    private dialog: MatDialog,
    private server: ServerService,
    private snackBar: MatSnackBar
  ) {
    this.Service.updatePath('Admin');
    this.titleService.setTitle('Archiwum');

    this.server
      .getArchives()
      .toPromise()
      .then((users: IUser[]) => {
        this.users = new MatTableDataSource<IUser>(users);
        this.users.paginator = this.paginator;
        this.users.sort = this.sort;
      });
  }

  displayedColumns: string[] = [
    'select',
    'name',
    'surname',
    'email',
    'phone',
    'university',
    'department',
    'year',
    'index'
  ];

  selection = new SelectionModel<IUser>(true);
  users: MatTableDataSource<IUser>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  openDialog(): void {
    const stat: IGenderStat = {
      man: 0,
      woman: 0
    };

    this.users.data.forEach((user: IUser) => {
      user.gender === 0 ? stat.man++ : stat.woman++;
    });

    this.dialog.open(MembersStatModalComponent, {
      width: 'auto',
      data: stat
    });
  }

  deleteUsers(): void {
    if (this.selection.selected.length !== 0) {
      const usersIds: number[] = [];
      this.selection.selected.forEach(user => usersIds.push(user.id));

      this.dialog
        .open(ConfirmationModalComponent, {
          data: { confirmationType: 'group-delete' as TConfirmationType }
        })
        .afterClosed()
        .toPromise()
        .then((isConfirm: boolean) => {
          if (!isConfirm) {
            throw new Error('nodata');
          }
          const dataPack: IArchivesDeleteDataPack = {
            ids: usersIds
          };

          return this.server.deleteUsers(dataPack).toPromise();
        })
        .then(() => {
          this.selection.clear();

          const newData: IUser[] = this.users.data;
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
          this.users.data = newData;
          this.openSnackBar('Sukces!', 'Użytkownicy prawidłowo usunięci');
        })
        .catch((err: HttpErrorResponse | Error) => {
          err.message === 'nodata'
            ? null
            : this.openSnackBar('Błąd!', 'Nie udało się usunąć użytkowników');
        });
    } else {
      this.openSnackBar('Uwaga!', 'Nie wybrano osób!');
    }
  }

  unarchiveUsers() {
    if (this.selection.selected.length !== 0) {
      const usersIds: number[] = [];
      this.selection.selected.forEach(user => usersIds.push(user.id));

      const dataPack: IArchivesRevertDataPack = {
        ids: usersIds
      };

      this.server
        .unarchiveUsers(dataPack)
        .toPromise()
        .then(() => {
          this.selection.clear();

          const newData: IUser[] = this.users.data;
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
          this.users.data = newData;
          this.openSnackBar(
            'Sukces!',
            'Przywrócenie użytkowników przebiegło pomyślnie'
          );
        })
        .catch((err: HttpErrorResponse) => {
          this.openSnackBar('Błąd!', 'Nie udało się przywrócić  użytkowników');
        });
    } else {
      this.openSnackBar('Uwaga!', 'Nie wybrano osób!');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.users.data.forEach(row => this.selection.select(row));
  }
}
