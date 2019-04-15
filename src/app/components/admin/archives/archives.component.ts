import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ServerService } from './../../../server/server.service';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { NoteDataService } from '../main/data.service';
import { ConfirmationModalComponent } from './confirmation-archives.component';


export interface PeriodicElement {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  university: string;
  department: string;
  year: string;
  index: string;
}

@Component({
  templateUrl: './archives.component.html'
})
export class ArchivesComponent implements AfterViewInit, OnDestroy {

  constructor (private Service: PathService,
    private titleService: Title,
    public dialog: MatDialog,
    private server: ServerService,
    private snackBar: MatSnackBar,
    private data: NoteDataService) {
    this.Service.updateFlag('Admin');
    this.titleService.setTitle('Archiwum');
  }

  ELEMENT_DATA;
  dataSource;
  archives;

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

  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit () {
    this.archives = this.server.getArchives().subscribe((data) => {
      this.ELEMENT_DATA = Object.values({...data});
      this.initiateTable();
    }, error => console.log(error));
  }

  ngOnDestroy () {
    this.archives.unsubscribe();
  }

  initiateTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(): void {
      this.dialog.open(ArchivesModalComponent, {
        width: '50%',
        data: {thingToRemoved : 'podane osoby z bazy?' }
    });
  }

  deleteUsers(){
    if (this.selection.selected.length != 0) {

      this.dialog.open(ConfirmationModalComponent);

      const dialog = this.dialog.afterAllClosed.subscribe(() => {

        if(this.data.messageSource.getValue() != 'error404') {

          let idArray: Array<any> = [];
          this.selection.selected.forEach(user => idArray.push(user.id));

          let server = this.server.deleteUsers(encodeURIComponent('id') + "=" + encodeURIComponent(idArray.toString())).subscribe(() => {
            this.selection.clear();
            this.ELEMENT_DATA = [];
            this.ngAfterViewInit();

            this.openSnackBar('Usunięcie użytkownika', 'Sukces!');
            server.unsubscribe();
          },
          error => console.log(error));
        } else {
          dialog.unsubscribe();
        }
      }, error => console.log(error));
    } else {
      this.openSnackBar('Uwaga', 'Nie wybrano osób!');
    }
  }

  unarchiveUsers(){
    if (this.selection.selected.length != 0) {
      const idArray = [];
      this.selection.selected.forEach(user => idArray.push(user.id));
      let server = this.server.unarchiveUsers(encodeURIComponent('id') + "=" + encodeURIComponent(idArray.toString())).subscribe(() => {
      this.selection.clear();
      this.ELEMENT_DATA = [];
      this.ngAfterViewInit();

      this.openSnackBar('Przywrócenie użytkownika', 'Sukces!');
      server.unsubscribe();
    },
    error => console.log(error));
    } else {
      this.openSnackBar('Uwaga', 'Nie wybrano osób!');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

@Component({
  selector: 'app-modal',
  template: '<mat-dialog-content><canvas id="myChart"></canvas></mat-dialog-content>'
})
export class ArchivesModalComponent implements AfterViewInit {

  constructor(
    public dialogRef: MatDialogRef<ArchivesModalComponent>, private server: ServerService) {
      this.server.getStatArchivesGender().subscribe((data) => {
        const value = Object.values({...data});
        this.setGender(value);
      }, error => console.log(error));
    }
    chartGender;
    setGender(value) {
      this.chartGender.config.data.datasets[0].data[0] = value[1].value;
      this.chartGender.config.data.datasets[0].data[1] = value[0].value;
      this.chartGender.update();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit () {
    const ctx: HTMLCanvasElement =  document.getElementById('myChart') as HTMLCanvasElement;
    this.chartGender = new Chart(ctx, {
      // The type of chart we want to create
      type: 'pie',

      // The data for our dataset
      data: {
        datasets: [{
          data: [12, 19],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          label: 'Dataset 1'
        }],
        labels: [
          'Kobiety',
          'Mężczyźni'
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Podział na płeć'
          }
      }
    });
  }
}

