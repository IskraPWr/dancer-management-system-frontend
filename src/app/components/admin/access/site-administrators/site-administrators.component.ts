import { ChangesModalComponent } from './../access.component';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild, ViewEncapsulation, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import * as Chart from 'chart.js';
import { Valid } from '../../../validators/validators';
import {MAT_DIALOG_DATA, MatCalendarHeader, MatDatepicker, MatDatepickerInput,
   matDatepickerAnimations, MatDatepickerToggle, } from '@angular/material';

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

export interface PeriodicElement {
  name: string;
  surname: string;
  login: string;
  password: string;
  click: Array<boolean>;
}

@Component({
  selector: 'app-site-administrators',
  templateUrl: './site-administrators.component.html',
  styleUrls: ['./site-administrators.component.css']
})
export class SiteAdministratorsComponent implements AfterViewInit, OnDestroy {

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[3]);
  position2 = new FormControl(this.positionOptions[0]);

   visible = true;
   selectable = true;
   removable = true;
   addOnBlur = true;
   ELEMENT_DATA;
   dataSource;
   selection = new SelectionModel<PeriodicElement>(true, []);
   admins;


   constructor(
     private server: ServerService,
     public dialog: MatDialog,
   ) {}

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

   ngAfterViewInit() {
    this.admins = this.server.getAdmins().subscribe(
       data => {
         this.ELEMENT_DATA = Object.values({ ...data });
         for (let k = 0; k < Object.values(this.ELEMENT_DATA).length; k++) {
          this.ELEMENT_DATA[k].click = [];
          for (let j = 2; j < 4; j++) {
            this.ELEMENT_DATA[k].click.push(false);
          }
        }
         this.initiateTable();
       },
       error => console.log(error)
     );
   }

   ngOnDestroy () {
     this.admins.unsubscribe();
   }

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

   openDialog(nr?): void {
    this.dialog.open(ChangesModalComponent, {
      width: '60%',
      data : {},
    });
  }

}


