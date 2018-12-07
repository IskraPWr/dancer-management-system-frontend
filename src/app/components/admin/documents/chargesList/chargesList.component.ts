import { DocumentsModalComponent } from './../documents.component';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import * as Chart from 'chart.js';
import { Valid } from '../../../validators/validators';
import {MAT_DIALOG_DATA} from '@angular/material';

import { ServerService } from './../../../../server/server.service';
import { PathService } from './../../../service';
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
  name: string;
  surname: string;
  amount: number;
  payment1: string;
  payment2: string;
  payment3: string;
  entryFee: string;
  sum: number;
}

@Component({
  selector: 'app-charges-list',
 templateUrl: './chargesList.component.html',
})
export class ChargesListComponent {
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

      this.server.getCharges().subscribe(
        data => {
          this.ELEMENT_DATA = Object.values({ ...data });
          for ( const object of this.ELEMENT_DATA ) {
            const array = [];
              object.notes.forEach(element => {
              array.push({name: element});
            });
            object.notes = array;
          }
          this.initiateTable();
        },
        error => console.log(error)
      );
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = [
      'select',
      'name',
      'surname',
      'amount',
      'entryFee',
      'payment1',
      'payment2',
      'payment3',
      'sum',
      'stat',
      'note'
    ];

    initiateTable() {
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    add(event: MatChipInputEvent, element): void {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        element.notes.push({ name: value.trim() });
      }

      if (input) {
        input.value = '';
      }
    }

    remove(note: Note, element): void {
      const index = element.notes.indexOf(note);

      if (index >= 0) {
        element.notes.splice(index, 1);
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


    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach(row => this.selection.select(row));
    }

    openDialog(nr?): void {
      this.dialog.open(DocumentsModalComponent, {
        width: '50%',
        data : {id : nr ? nr.id : null},
      });
    }
}
