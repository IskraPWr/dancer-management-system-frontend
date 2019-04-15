import { InstalmentModalComponent } from './installment-modal.component';
import { ConfirmationModalComponent } from './../../archives/confirmation-archives.component';
import { DocumentsModalComponent } from './../documents.component';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  OnDestroy,
  Inject
} from '@angular/core';
import * as Chart from 'chart.js';
import { Valid } from '../../../validators/validators';
import {
  MAT_DIALOG_DATA,
  MatCalendarHeader,
  MatDatepicker,
  MatDatepickerInput,
  matDatepickerAnimations,
  MatDatepickerToggle,
  MatInput
} from '@angular/material';

import { ServerService } from './../../../../server/server.service';
import { PathService } from './../../../service';
import { RandomColor } from '../../../items/colorGenerator/colorGenerator';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material';
import { NoteDataService } from '../../main/data.service';

export interface PeriodicElement {
  id: number;
  name: string;
  installment_1: number;
  installment_2: number;
  installment_3: number;
  sum: number;
  click: Array<boolean>;
}

export interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.css']
})
export class InstallmentComponent implements AfterViewInit, OnDestroy {
  constructor(
    private server: ServerService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private data: NoteDataService
  ) {}

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[3]);
  position2 = new FormControl(this.positionOptions[0]);
  semesters = [];

  selected;
  visible = true;
  click = [true, true, true, true, true];
  selectable = true;
  removable = true;
  addOnBlur = true;
  ELEMENT_DATA;
  dataSource;
  selection = new SelectionModel<PeriodicElement>(true, []);
  semester;
  installment;
  usersType: Type[] = [];

  message = 'podane stawkę z bazy?';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'select',
    'name',
    'installment_1',
    'installment_2',
    'installment_3',
    'sum'
  ];

  ngAfterViewInit(flag?) {
    this.installment = this.server.getInstallment().subscribe(
      data => {
        this.ELEMENT_DATA = Object.values({ ...data });
        for (let i = 0; i < Object.values(this.ELEMENT_DATA).length; i++) {
          for (
            let k = 0;
            k < Object.values(this.ELEMENT_DATA[i].data).length;
            k++
          ) {
            this.ELEMENT_DATA[i].data[k].click = [];
            for (let j = 0; j < 4; j++) {
              this.ELEMENT_DATA[i].data[k].click.push(false);
            }
          }
          if(!flag){
            this.usersType.push({
              value: i.toString(),
              viewValue: this.ELEMENT_DATA[i].name
            });
          }
        }
        this.initiateTable('0');
        this.selected = this.usersType[0].value;
      },
      error => console.log(error)
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  save(keyCode, el, element, name, nr) {
    if (keyCode === 13 && element.valid) {
      const data = {
        id: el.id,
        name: name,
        value: element.value
      };
      let formBody = [];
      for (const property in data) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      const message = formBody.join('&');

      const server = this.server.updateInstallment(message).subscribe(
        () => {
          if (name === 'name') {
            this.openSnackBar('Zmiana nazwy', 'Sukces!');
          } else {
            this.openSnackBar('Zmiana ceny', 'Sukces!');
          }
          el.click[nr] = false;
          server.unsubscribe();
        },
        () => this.openSnackBar('Uwaga', 'Błąd!')
      );
    }
  }

  removeInstalment() {
    if (this.selection.selected.length != 0) {
      this.dialog.open(ConfirmationModalComponent, {
        data: { thingToRemoved: this.message }
      });

      const dialog = this.dialog.afterAllClosed.subscribe(
        () => {
          if (this.data.messageSource.getValue() != 'error404') {
            let idArray: Array<any> = [];
            this.selection.selected.forEach(installment =>
              idArray.push(installment.id)
            );

            let server = this.server
              .deleteInstallment(
                encodeURIComponent('id') +
                  '=' +
                  encodeURIComponent(idArray.toString())
              )
              .subscribe(
                () => {
                  this.selection.clear();
                  this.usersType = [];
                  this.ELEMENT_DATA = [];
                  this.ngAfterViewInit();

                  this.openSnackBar('Usunięcie stawki', 'Sukces!');
                  server.unsubscribe();
                  dialog.unsubscribe();
                },
                () => this.openSnackBar('Usunięcie stawki', 'Błąd!')
              );
          } else {
            dialog.unsubscribe();
          }
        },
        error => console.log(error)
      );
    } else {
      this.openSnackBar('Uwaga', 'Nie wybrano grup!');
    }
  }

  addInstallment() {
    this.dialog.open(InstalmentModalComponent, {
      width: '50%'
    });

    const dialog = this.dialog.afterAllClosed.subscribe(
      () => {
        if (this.data.messageSource.getValue() != 'error404') {
          const data = JSON.parse(this.data.messageSource.getValue());
          let part = [];
          let i, j = 0;

          if (data.first) {
            part[0] = data.first;
            part[1] = data.second;
            i = 2;
          } else {
            part[0] = data;
            i = 1;
          }

          while (j < i) {
            console.log('robi');
            console.log(part);
            let formBody = [];
            for (const property in part[j]) {
              const encodedKey = encodeURIComponent(property);
              const encodedValue = encodeURIComponent(part[j][property]);
              formBody.push(encodedKey + '=' + encodedValue);
            }
            const message = formBody.join('&');

            const server = this.server.addInstallment(message).subscribe(
              () => {
                this.openSnackBar('Dodanie nowej stawki', 'Sukces!');
                this.selection.clear();
                this.ngAfterViewInit('no');
                dialog.unsubscribe();
                server.unsubscribe();
              },
              () => {
                this.openSnackBar('Dodanie nowej stawki', 'Błąd!');
              }
            );

            j++;
          }
        } else {
          dialog.unsubscribe();
        }
      },
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    this.installment.unsubscribe();
  }

  initiateTable(nr) {
    const index = parseInt(nr, 10);
    this.dataSource = new MatTableDataSource<PeriodicElement>(
      this.ELEMENT_DATA[index].data
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.paginator.firstPage();
    }
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
}
