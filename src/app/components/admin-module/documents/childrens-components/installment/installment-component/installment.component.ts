import { HttpErrorResponse } from '@angular/common/http';
import { NoteDataService } from '../../../../main/data.service';
import { ServerService } from '../../../../../server/server.service';
import { InstalmentModalComponent } from './../installment-modal/installment-modal.component';
import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import {
  MatDialog,
  MatSnackBar,
  MatInput,
  MatSelectChange
} from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, NgModel } from '@angular/forms';
import { TooltipPosition } from '@angular/material';
import { ConfirmationModalComponent } from '../../../../confirmation/confirmation-modal.component';
import {
  IInstallmentsPack,
  ISelectOptions,
  IInstallmentsPackDetails,
  IInstallments,
  IInstallmentChangeValuePack,
  TConfirmationType,
  IInstallmentChangeDataPack
} from 'src/app/typings/typings';

@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.css']
})
export class InstallmentComponent {
  constructor(
    private server: ServerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.setInstallmentsFromServer();
  }

  groupOfPeople: ISelectOptions[];
  installmentTypeValues: IInstallmentsPackDetails[];

  selection = new SelectionModel<IInstallments>(true);
  installments: MatTableDataSource<IInstallments>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) search: MatInput;

  displayedColumns: string[] = [
    'select',
    'name',
    'installment_1',
    'installment_2',
    'installment_3',
    'sum'
  ];

  setInstallmentsFromServer(): void {
    this.server
      .getInstallment()
      .toPromise()
      .then((installmentsData: IInstallmentsPack) => {
        this.installmentTypeValues = Object.values(installmentsData);

        this.groupOfPeople = this.installmentTypeValues.map(
          (installment: IInstallmentsPackDetails, index: number) => {
            return {
              value: index.toString(),
              viewValue: installment.name
            } as ISelectOptions;
          }
        );

        this.installmentTypeValues = this.installmentTypeValues.map(
          (installments: IInstallmentsPackDetails) => {
            const installmentData: IInstallments[] = installments.data.map(
              (value: IInstallments) => {
                value.isActiveInput = Array(4).fill(false);
                return value;
              }
            );

            return {
              name: installments.name,
              data: installmentData
            } as IInstallmentsPackDetails;
          }
        );

        this.installments = new MatTableDataSource<IInstallments>(
          this.installmentTypeValues[0].data
        );

        this.installments.paginator = this.paginator;
        this.installments.sort = this.sort;
      })
      .catch((err: HttpErrorResponse) => {
        this.openSnackBar('Błąd!', 'Nie udało się pobrać danych');
      });
  }

  setInstallments(value: MatSelectChange): void {
    const index = parseInt(value.value, 10);

    this.installments = new MatTableDataSource<IInstallments>(
      this.installmentTypeValues[index].data
    );

    this.installments.paginator = this.paginator;
    this.installments.sort = this.sort;

    this.search.value = '';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  save(
    installment: NgModel,
    fieldName: string,
    installmentsData: IInstallments,
    index: number
  ): void {
    if (installment.valid) {
      const updateServerInfoPack: IInstallmentChangeValuePack = {
        id: installmentsData.id,
        field: fieldName,
        value: installment.value
      };

      this.server
        .updateInstallment(updateServerInfoPack)
        .toPromise()
        .then(() => {
          fieldName === 'name'
            ? this.openSnackBar(
                'Sukces!',
                'Zmiana nazwy przeprowadzona pomyślnie'
              )
            : this.openSnackBar(
                'Sukces!',
                'Zmiana wysokości raty przeprowadzona pomyślnie'
              );
        })
        .catch((err: HttpErrorResponse) => {
          this.openSnackBar('Błąd!', 'Nie udało się zmienić danych');
        });

      installmentsData.isActiveInput[index] = false;
    }
  }

  removeInstallment() {
    if (this.selection.selected.length !== 0) {
      const installmentsIds: number[] = [];
      this.selection.selected.forEach(installmentData =>
        installmentsIds.push(installmentData.id)
      );

      this.dialog
        .open(ConfirmationModalComponent, {
          data: { confirmationType: 'intallment-delete' as TConfirmationType }
        })
        .afterClosed()
        .toPromise()
        .then((isConfirm: boolean) => {
          if (!isConfirm) {
            throw new Error('nodata');
          }
          const dataPack: IInstallmentChangeDataPack = {
            ids: installmentsIds
          };
          return this.server.deleteInstallment(dataPack).toPromise();
        })
        .then(() => {
          this.selection.clear();

          const newData: IInstallments[] = this.installments.data;

          installmentsIds.forEach((id: number) => {
            newData.splice(
              newData.indexOf(
                newData.find((instalments: IInstallments) => {
                  return instalments.id === id;
                })
              ),
              1
            );
          });
          this.installments.data = newData;

          this.openSnackBar('Sukces!', 'Dane składek prawidłowo usunięte');
        })
        .catch((err: HttpErrorResponse | Error) => {
          err.message === 'nodata'
            ? null
            : this.openSnackBar(
                'Błąd!',
                'Nie udało się usunąć progów składkowych'
              );
        });
    } else {
      this.openSnackBar('Uwaga', 'Nie wybrano grup!');
    }
  }

  addInstallment(): void {
    this.dialog
      .open(InstalmentModalComponent, {
        data: this.groupOfPeople.map((type: ISelectOptions) => type.viewValue)
      })
      .afterClosed()
      .toPromise()
      .then((newInstallments: IInstallments[]) => {
        if (!newInstallments) {
          throw new Error('nodata');
        }

        const promiseArray: Promise<Object>[] = newInstallments.map((installments: IInstallments, index: number) =>
        this.server.addInstallment(newInstallments[index]).toPromise());
        return Promise.all(promiseArray);
      })
      .then(() => {
        this.openSnackBar(
          'Sukces!',
          'Dodanie nowego progu składkowego powiodło się'
        );
        this.selection.clear();

        this.setInstallmentsFromServer();
      })
      .catch((err: HttpErrorResponse | Error) => {
        err.message === 'nodata'
          ? null
          : this.openSnackBar('Błąd!', 'Nie udało się dodać progu składkowego');
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.installments.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.installments.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.installments.filter = filterValue.trim().toLowerCase();

    if (this.installments.paginator) {
      this.paginator.firstPage();
    }
  }
}
