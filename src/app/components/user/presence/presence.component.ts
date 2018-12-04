import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { Component,  ViewChild, AfterViewInit } from '@angular/core';
import { ServerService } from './../../../server/server.service';

import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatSort} from '@angular/material';
import {MatDialog, MatDialogRef} from '@angular/material';

import {RandomColor} from '../../items/colorGenerator/colorGenerator';

import * as Chart from 'chart.js';

export interface PeriodicElement {
  week: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
}

@Component({
  templateUrl: './presence.component.html'
})
export class PresenceComponent {

  ELEMENT_DATA;
  displayedColumns: string[] = ['week', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private Service: PathService, private titleService: Title, public dialog: MatDialog, private server: ServerService) {
    this.Service.updateFlag('Konto');
    this.titleService.setTitle('Obecność');

    this.server.getPresenceById(21).subscribe(
      data => {
        this.ELEMENT_DATA = Object.values({ ...data });
        this.setPresence();
      },
      error => console.log(error));
  }

  setPresence() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    this.dialog.open(PresenceModalComponent, {
      width: '65%'
    });
  }

}

@Component({
  selector: 'app-modal',
  template: '<mat-dialog-content><div class="row justify-content-center"><canvas class="col-6" id="myChart">\
  </canvas></div><div class="row"><canvas class="col-6" \
  id="myChart1"></canvas><canvas class="col-6" id="myChart2"></canvas></div></mat-dialog-content>'
})
export class PresenceModalComponent implements AfterViewInit {


  constructor(
    public dialogRef: MatDialogRef<PresenceModalComponent>) {
    }

    random = new RandomColor;
    color = [
      this.random.getRandomColor(),
      this.random.getRandomColor(),
      this.random.getRandomColor(),
      this.random.getRandomColor(),
      this.random.getRandomColor(),
      this.random.getRandomColor(),
      this.random.getRandomColor(),
      this.random.getRandomColor(),
      this.random.getRandomColor(),
      this.random.getRandomColor()
    ];


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit () {
    const ctx: HTMLCanvasElement = document.getElementById('myChart') as HTMLCanvasElement;
   ctx.getContext('2d');
   const chartMonth = new Chart(ctx, {
    type: 'doughnut',

      // The data for our dataset
      data: {
        datasets: [{
          data: [12, 19, 32, 23, 12, 12, 1, 3, 1, 5],
          backgroundColor: [
            this.color[0],
            this.color[1],
            this.color[2],
            this.color[3],
            this.color[4],
            this.color[5],
            this.color[6],
            this.color[7],
            this.color[8],
            this.color[9]
          ],
          label: 'Ilość wizyt'
        }],
        labels: [
          'Podstawowa I',
          'Podstawowa II',
          'Podstawowa +',
          'Średnio-zaawansowana - pon',
          'Średnio-zaawansowana - śr',
          'Zaawansowana - pon',
          'Zaawansowana - śr',
          'Practise - sob',
          'Practise - niedz',
          'Nieprzyporządkowane'
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Ilość wizyt na zajęciach w tym miesiącu'
          }
      }
    });

const ctx1: HTMLCanvasElement = document.getElementById('myChart1') as HTMLCanvasElement;
ctx.getContext('2d');
const chartSemester = new Chart(ctx1, {
  type: 'doughnut',

  // The data for our dataset
  data: {
    datasets: [{
      data: [12, 19, 32, 23, 12, 12, 1, 3, 1, 5],
      backgroundColor: [
        this.color[0],
        this.color[1],
        this.color[2],
        this.color[3],
        this.color[4],
        this.color[5],
        this.color[6],
        this.color[7],
        this.color[8],
        this.color[9]
      ],
      label: 'Ilość wizyt'
    }],
    labels: [
      'Podstawowa I',
      'Podstawowa II',
      'Podstawowa +',
      'Średnio-zaawansowana - pon',
      'Średnio-zaawansowana - śr',
      'Zaawansowana - pon',
      'Zaawansowana - śr',
      'Practise - sob',
      'Practise - niedz',
      'Nieprzyporządkowane'
    ]
  },
  options: {
    legend: {
      display: false
    },
    responsive: true,
    title: {
      display: true,
      text: 'Ilość wizyt na zajęciach w tym semestrze'
      }
  }
});

const ctx2: HTMLCanvasElement = document.getElementById('myChart2') as HTMLCanvasElement;
ctx.getContext('2d');
const chartAll = new Chart(ctx2, {
  type: 'doughnut',

  // The data for our dataset
  data: {
    datasets: [{
      data: [12, 19, 32, 23, 12, 12, 1, 3, 1, 5],
      backgroundColor: [
        this.color[0],
            this.color[1],
            this.color[2],
            this.color[3],
            this.color[4],
            this.color[5],
            this.color[6],
            this.color[7],
            this.color[8],
            this.color[9]
      ],
      label: 'Ilość wizyt'
    }],
    labels: [
      'Podstawowa I',
      'Podstawowa II',
      'Podstawowa +',
      'Średnio-zaawansowana - pon',
      'Średnio-zaawansowana - śr',
      'Zaawansowana - pon',
      'Zaawansowana - śr',
      'Practise - sob',
      'Practise - niedz',
      'Nieprzyporządkowane'
    ]
  },
  options: {
    legend: {
      display: false
    },
    responsive: true,
    title: {
      display: true,
      text: 'Suma ilość wizyt na zajęciach'
      }
  }
});
  }
}
