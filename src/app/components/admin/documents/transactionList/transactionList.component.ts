import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild, AfterViewInit, Inject, OnDestroy } from '@angular/core';
import * as Chart from 'chart.js';
import { Valid } from '../../../validators/validators';
import {MAT_DIALOG_DATA} from '@angular/material';

import { ServerService } from './../../../../server/server.service';
import {RandomColor} from '../../../items/colorGenerator/colorGenerator';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';



export interface Note {
  name: string;
}

export interface PeriodicElement {
  id: number;
  id_transaction: number;
  name: string;
  email: string;
  product: string;
  date: string;
  price: string;
  quantity: number;
  sum: string;
}

export interface Semesters {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-transaction-list',
 templateUrl: './transactionList.component.html',
})
export class TransactionListComponent implements AfterViewInit {

    constructor(
      private server: ServerService,
      public dialog: MatDialog,
    ) {}

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    ELEMENT_DATA;
    dataSource;
    selection = new SelectionModel<PeriodicElement>(true, []);
    semesters = [];
    selected;
    data = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = [
      'id_transaction',
      'name',
      'email',
      'product',
      'date',
      'price',
      'quantity',
      'sum'
    ];

    ngAfterViewInit() {

      Promise.all([
        this.server.getList().toPromise(),
        this.server.getSemesterDetails().toPromise()
      ]).then(value => {
        this.ELEMENT_DATA = Object.values({ ...value[0] });

        this.semesters = Object.values({ ...value[1] });

        this.setSemestersTable();

          let i = 0;
          for (const obj of this.semesters) {
            obj.value = 'semester-' + (i + 1);
            obj.viewValue = obj.name;
            delete obj.name;
            i++;
          }
          const all = {
            value: 'all-0',
            viewValue: 'Cała lista'
          };
         this.semesters.unshift(all);
         this.selected = this.semesters[0].value;

         for (let j = 0; j < Object.keys(this.ELEMENT_DATA).length; j++) {
          this.ELEMENT_DATA[j].date = new Date(this.ELEMENT_DATA[j].date).toLocaleDateString();
         }

         this.initiateTable('0');

      }).catch(error => console.log(error));
    }


    setSemestersTable () {
        // tslint:disable-next-line:no-shadowed-variable
        let j = 0;
        let currentIterator = 0;
        for (const sem of this.semesters) {
          const semester = {
            id_semester: sem.id_semester,
            data : [],
          };

          const semesterStart = sem.start;
          const semesterEnd = sem.end;
            for (let i = currentIterator; i < Object.keys(this.ELEMENT_DATA).length; i++) {
              if (this.ELEMENT_DATA[i].date > semesterStart && this.ELEMENT_DATA[i].date <= semesterEnd) {
                semester.data.push(this.ELEMENT_DATA[i]);
                currentIterator = i;
              } else if (this.ELEMENT_DATA[i].date < semesterStart) {
                currentIterator = i;
                break;
              }
            }
            if (j < this.semesters.length) {
              this.data.push(semester);
            }
            j++;
          }
    }

    initiateTable(id) {
      if (id === '0') {
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.data[parseInt(id, 10) - 1].data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.paginator.firstPage();
      }
    }

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    masterToggle() {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach(row => this.selection.select(row));
    }
}
