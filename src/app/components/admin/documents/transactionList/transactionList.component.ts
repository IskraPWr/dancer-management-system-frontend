import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
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
  id_sys: number;
  name: string;
  product_name: string;
  price: string;
  quantiti: number;
  value: string;
}

@Component({
  selector: 'app-transaction-list',
 templateUrl: './transactionList.component.html',
})
export class TransactionListComponent {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    ELEMENT_DATA;
    dataSource;
    selection = new SelectionModel<PeriodicElement>(true, []);

    constructor(
      private server: ServerService,
      public dialog: MatDialog,
    ) {

      this.server.getList().subscribe(
        data => {
          this.ELEMENT_DATA = Object.values({ ...data });
          this.initiateTable();
        },
        error => console.log(error)
      );
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = [
      'select',
      'id_sys',
      'name',
      'product_name',
      'price',
      'quantiti',
      'value'
    ];

    initiateTable() {
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
