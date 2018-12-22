import { DocumentsModalComponent } from './../documents.component';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild, ViewEncapsulation, AfterViewInit, Inject } from '@angular/core';
import * as Chart from 'chart.js';
import { Valid } from '../../../validators/validators';
import {MAT_DIALOG_DATA, MatCalendarHeader, MatDatepicker, MatDatepickerInput,
   matDatepickerAnimations, MatDatepickerToggle} from '@angular/material';

import { ServerService } from './../../../../server/server.service';
import { PathService } from './../../../service';
import {RandomColor} from '../../../items/colorGenerator/colorGenerator';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material';




export interface Note {
  name: string;
}

export interface PeriodicElement {
  name: string;
  start: Date;
  date_1: Date;
  date_2: Date;
  date_3: Date;
  end: Date;
  click: Array<boolean>;
}


@Component({
  selector: 'app-semester-list',
 templateUrl: './semesters.component.html',
 encapsulation: ViewEncapsulation.None,
})
export class SemestersComponent {
   date = new FormControl(new Date());
   serializedDate = new FormControl((new Date()).toISOString());

   positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
   position = new FormControl(this.positionOptions[3]);
   position2 = new FormControl(this.positionOptions[0]);

    visible = true;
    click = [true, true, true, true, true];
    selectable = true;
    removable = true;
    addOnBlur = true;
    ELEMENT_DATA;
    dataSource;
    selection = new SelectionModel<PeriodicElement>(true, []);


    constructor(
      private server: ServerService,
      public dialog: MatDialog,
    ) {

      this.server.getSemesters().subscribe(
        data => {
          this.ELEMENT_DATA = Object.values({ ...data });
          for (let i = 0; i <  Object.values(this.ELEMENT_DATA).length; i++ ) {
            this.ELEMENT_DATA[i].click = [];
            for (let j = 0; j < 6; j++) {
              this.ELEMENT_DATA[i].click.push(false);
            }
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
      'start',
      'date_1',
      'date_2',
      'date_3',
      'end'
    ];

    initiateTable() {
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
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
    }

}
