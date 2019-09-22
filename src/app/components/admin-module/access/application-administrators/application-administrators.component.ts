import { ConfirmationModalComponent } from 'src/app/components/admin-module/confirmation/confirmation-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AdministratorsModalComponent } from '../add-administrator-modal/administrators-modal.component';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, TooltipPosition } from '@angular/material';

import { NoteDataService } from '../../main/data.service';
import { PassModalComponent } from '../pass-modal/pass-modal.component';
import { ServerService } from 'src/app/components/server/server.service';
import { ConfirmationAdminModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { TConfirmationType, IAdminsDeleteDataPack, IAdministrator, IAdminConfirmation, IAdminsChangeValuePack } from 'src/app/typings/typings';

export interface PeriodicElement {
  id: number;
  name: string;
  start: Date;
  date_1: Date;
  date_2: Date;
  date_3: Date;
  end: Date;
  click: Array<boolean>;
}

@Component({
  selector: 'app-application-administrators',
  templateUrl: './application-administrators.component.html',
  styleUrls: ['./application-administrators.component.css']
})
export class ApplicationAdministratorsComponent {
  constructor(
    private server: ServerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.getAdmins();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'select',
    'name',
    'surname',
    'mail',
    'login',
    'password'
  ];

  selection = new SelectionModel<IAdministrator>(true);
  admins: MatTableDataSource<IAdministrator>;

  getAdmins(): void {
    this.server
      .getAuthorization()
      .toPromise()
      .then((admins: IAdministrator[]) => {
        admins.forEach(
          (admin: IAdministrator) =>
            (admin.isActiveInput = new Array(2).fill(false))
        );

        this.admins = new MatTableDataSource<IAdministrator>(admins);
        this.admins.paginator = this.paginator;
        this.admins.sort = this.sort;
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.admins.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.admins.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.admins.filter = filterValue.trim().toLowerCase();

    if (this.admins.paginator) {
      this.paginator.firstPage();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  generatePass(adminId): void {
    this.dialog
      .open(PassModalComponent)
      .afterClosed()
      .toPromise()
      .then((confirmation: boolean) => {
        if (!confirmation) {
          throw new Error('noData');
        }
        return this.server.generateApplicationAdminsPass({id: adminId}).toPromise();
      })
      .then(() => {
        this.openSnackBar('Sukces!', 'Nowe hasło zostało wysłane!');
      })
      .catch((err: HttpErrorResponse | Error) => {
        err.message !== 'noData'
          ? this.openSnackBar('Błąd!', 'Nie udało się zmienić hasła')
          : null;
      });
  }

  deleteAdmin(): void {
    if (this.selection.selected.length !== 0) {
      const adminsIds: number[] = [];
      this.selection.selected.forEach(admin => adminsIds.push(admin.id));

      this.dialog
        .open(ConfirmationModalComponent, {
          data: { confirmationType: 'application-admin-delete' as TConfirmationType }
        })
        .afterClosed()
        .toPromise()
        .then((confirmation: boolean) => {
          if (!confirmation) {
            throw new Error('noData');
          }

          const adminsToDelete: IAdminsDeleteDataPack = {
            ids: adminsIds
          };
          return this.server.deleteApplicationAdmins(adminsToDelete).toPromise();
        })
        .then(() => {
          this.selection.clear();

          const newData: IAdministrator[] = this.admins.data;
          adminsIds.forEach((id: number) => {
            newData.splice(
              newData.indexOf(
                newData.find((group: IAdministrator) => {
                  return group.id === id;
                })
              ),
              1
            );
          });
          this.admins.data = newData;
          this.openSnackBar(
            'Sukces!',
            'Administratorzy zostali prawidłowo usunięci'
          );
        })
        .catch((err: HttpErrorResponse | Error) => {
          err.message === 'noData'
            ? null
            : this.openSnackBar(
                'Błąd!',
                'Nie udało się usunąć administratorów'
              );
        });
    } else {
      this.openSnackBar('Uwaga!', 'Nie wybrano administratorów');
    }
  }

  save(
    adminFild: NgModel,
    fieldName: string,
    admin: IAdministrator,
    index: number
  ): void {
    if (adminFild.valid) {

      const updateServerInfoPack: IAdminsChangeValuePack = {
        id: admin.id,
        field: fieldName,
        value: adminFild.value
      };

        this.server
            .updateApplicationAdmin(updateServerInfoPack)
            .toPromise()
        .then(() => {
          fieldName === 'mail'
            ? this.openSnackBar(
                'Sukces!',
                'Zmiana maila przeprowadzona pomyślnie'
              )
            : this.openSnackBar(
                'Sukces!',
                'Zmiana loginu przeprowadzona pomyślnie'
              );

              admin.isActiveInput[index] = false;
        })
        .catch((err: HttpErrorResponse | Error) => {
          err.message !== 'noData'
            ? this.openSnackBar('Błąd!', 'Nie udało się zmienić danych')
            : null;
        });
    }
  }

  addAdmin(): void {
    this.dialog.open(AdministratorsModalComponent).afterClosed().toPromise().then((newAdmin: IAdministrator) => {
      if (!newAdmin) {
        throw new Error('noData');
      }

      return this.server.addApplicationAdmin(newAdmin).toPromise();
    }).then(() => {
      this.openSnackBar('Sukces!', 'Prawidłowo dodano nowego administratora');
      this.getAdmins();
    }).catch((err: HttpErrorResponse | Error) => {
      err.message !== 'noData' ? this.openSnackBar('Błąd!', 'Nie udało się dodać nowego administratora') : null;
    });
  }
}
