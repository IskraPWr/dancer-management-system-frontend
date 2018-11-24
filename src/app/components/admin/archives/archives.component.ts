import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';

import {MatDialog, MatDialogRef} from '@angular/material';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


export interface PeriodicElement {
  name: string;
  surname: string;
  email: string;
  phone: string;
  university: string;
  department: string;
  year: string;
  index: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Grzegorz',
    surname: 'Kikut',
    email: 'grzegorzkikut1@gmail.com',
    phone: '515951120',
    university: 'Politechnika Wrocławska',
    department: 'W12',
    year: '3',
    index: '227574'
  }
];

@Component({
  templateUrl: './archives.component.html'
})
export class ArchivesComponent implements OnInit {

  constructor (private Service: PathService, private titleService: Title, public dialog: MatDialog  ) {
    this.Service.updateFlag('Admin');
    this.titleService.setTitle('Archiwum');
  }

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
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  openDialog(): void {
      this.dialog.open(ArchivesModalComponent, {
        width: '50%'
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    public dialogRef: MatDialogRef<ArchivesModalComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit () {
    const ctx: HTMLCanvasElement =  document.getElementById('myChart') as HTMLCanvasElement;
    console.log(ctx);
    const chartGender = new Chart(ctx, {
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

