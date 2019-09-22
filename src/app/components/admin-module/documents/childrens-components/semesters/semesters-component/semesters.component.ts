import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { ConfirmationModalComponent } from 'src/app/components/admin-module/confirmation/confirmation-modal.component';
import { ServerService } from 'src/app/components/server/server.service';
import {
  ISemester,
  ISemesterChangeValuePack,
  ISemesterChangeDataPack,
  TConfirmationType
} from 'src/app/typings/typings';

import { SemesterModalComponent } from './../semesters-modal/semester-modal.component';


@Component({
  selector: 'app-semester-list',
  templateUrl: './semesters.component.html',
  styleUrls: ['./semesters.component.css']
})
export class SemestersComponent {
  constructor(
    private server: ServerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.setSemesterFromServer();
  }
  selection = new SelectionModel<ISemester>(true);
  semesters: MatTableDataSource<ISemester>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() reloadSemesterEvent: EventEmitter<boolean> = new EventEmitter();

  displayedColumns: string[] = [
    'select',
    'name',
    'start',
    'date_1',
    'date_2',
    'date_3',
    'end'
  ];

  setSemesterFromServer(): void {
    this.server
      .getSemesters()
      .toPromise()
      .then((data: ISemester[]) => {
        const semestersData = data.map((semester: ISemester) => {
          semester.isActiveInput = Array(6).fill(false);
          return semester;
        });

        this.semesters = new MatTableDataSource<ISemester>(semestersData);

        this.semesters.paginator = this.paginator;
        this.semesters.sort = this.sort;
      })
      .catch((err: HttpErrorResponse) => {
        this.openSnackBar('Błąd!', 'Nie udało się pobrać danych');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.semesters.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.semesters.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.semesters.filter = filterValue.trim().toLowerCase();

    if (this.semesters.paginator) {
      this.paginator.firstPage();
    }
  }

  save(
    date: NgModel,
    fieldName: string,
    semester: ISemester,
    index: number
  ): void {
    if (date.valid) {
      const updateServerInfoPack: ISemesterChangeValuePack = {
        id: semester.id_semester,
        field: fieldName,
        value: date.value
      };

      this.server
        .updateSemesterDate(updateServerInfoPack)
        .toPromise()
        .then(() => {
          fieldName === 'name'
            ? this.openSnackBar(
                'Sukces!',
                'Zmiana nazwy przeprowadzona pomyślnie'
              )
            : this.openSnackBar(
                'Sukces!',
                'Zmiana daty przeprowadzona pomyślnie'
              );
        })
        .catch((err: HttpErrorResponse) => {
          this.openSnackBar('Błąd!', 'Nie udało się zmienić danych');
        });
      semester.isActiveInput[index] = false;
    }
  }

  checkDate(beforeDate: string, currentDate: string): boolean {
    return new Date(beforeDate) < new Date(currentDate) ? false : true;
  }

  removeSemesters(): void {
    if (this.selection.selected.length !== 0) {
      const semestersIds: number[] = [];
      this.selection.selected.forEach(semester =>
        semestersIds.push(semester.id_semester)
      );

      this.dialog
        .open(ConfirmationModalComponent, {
          data: { confirmationType: 'semester-delete' as TConfirmationType }
        })
        .afterClosed()
        .toPromise()
        .then((isConfirm: boolean) => {
          if (!isConfirm) {
            throw new Error('nodata');
          }
          const dataPack: ISemesterChangeDataPack = {
            ids: semestersIds
          };
          return this.server.deleteSemesters(dataPack).toPromise();
        })
        .then(() => {
          this.selection.clear();
          const newData: ISemester[] = this.semesters.data;
          semestersIds.forEach((id: number) => {
            newData.splice(
              newData.indexOf(
                newData.find((semester: ISemester) => {
                  return semester.id_semester === id;
                })
              ),
              1
            );
          });
          this.semesters.data = newData;

          // reload group component
          this.reloadSemesterEvent.emit(true);

          this.openSnackBar('Sukces!', 'Dane semestrów prawidłowo usunięte');
        })
        .catch((err: HttpErrorResponse | Error) => {
          err.message === 'nodata'
            ? null
            : this.openSnackBar('Błąd!', 'Nie udało się usunąć semestrów');
        });
    } else {
      this.openSnackBar('Uwaga!', 'Nie wybrano semestrów');
    }
  }

  addSemester(): void {
    this.dialog
      .open(SemesterModalComponent, {
        // width: '50%'
      })
      .afterClosed()
      .toPromise()
      .then((newSemester: ISemester) => {
        if (!newSemester) {
          throw new Error('nodata');
        }
        return this.server.addSemester(newSemester).toPromise();
      })
      .then(() => {
        this.openSnackBar('Sukces!', 'Dodanie nowego semestru powiodło się');
        this.selection.clear();
        this.setSemesterFromServer();

        // reload group component
        this.reloadSemesterEvent.emit(true);
      })
      .catch((err: HttpErrorResponse | Error) => {
        err.message === 'nodata'
          ? null
          : this.openSnackBar('Błąd!', 'Nie udało się dodać nowego semestru');
      });
  }
}
