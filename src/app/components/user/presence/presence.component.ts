import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ServerService } from './../../../server/server.service';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';

import { RandomColor } from '../../items/colorGenerator/colorGenerator';

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
  displayedColumns: string[] = [
    'week',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
    'sun'
  ];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private Service: PathService,
    private titleService: Title,
    public dialog: MatDialog,
    private server: ServerService
  ) {
    this.Service.updateFlag('Konto');
    this.titleService.setTitle('Obecność');

    this.server.getPresenceById(21).subscribe(
      data => {
        this.ELEMENT_DATA = Object.values({ ...data });
        this.setPresence();
      },
      error => console.log(error)
    );
  }

  setPresence() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(
      this.ELEMENT_DATA
    );
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
  template:
    '<mat-dialog-content><div class="row justify-content-center"><canvas class="col-6" id="myChart">\
  </canvas></div><div class="row"><canvas class="col-6" \
  id="myChart1"></canvas><canvas class="col-6" id="myChart2"></canvas></div></mat-dialog-content>'
})
export class PresenceModalComponent implements AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<PresenceModalComponent>,
    private server: ServerService
  ) {
    this.server.getStatPresenceById(21).subscribe(
      data => {
        const value = Object.values({ ...data });
        this.setPresence(value[0]);
      },
      error => console.log(error)
    );
  }

  labels = [
    'Podstawowa I',
    'Podstawowa II',
    'Podstawowa +',
    'Średnio-zaawansowana - pon',
    'Średnio-zaawansowana - śr',
    'Zaawansowana - pon',
    'Zaawansowana - śr',
    'Nieprzyporządkowane'
  ];

  random = new RandomColor();
  colors = this.random.getRandomColor(7);
  ctx: HTMLCanvasElement;
  ctx1: HTMLCanvasElement;
  ctx2: HTMLCanvasElement;

  arrayCtx = ['ctx', 'ctx1', 'ctx2'];

  setPresence(value) {
    let i = 0;
    const array = [];
    // tslint:disable-next-line:curly
    // tslint:disable-next-line:forin
    for (const term in value) {
      array[i] = new Chart(this[this.arrayCtx[i]], {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [],
              backgroundColor: [],
              label: 'Ilość wizyt'
            }
          ],
          labels: []
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: ''
          }
        }
      });
      array[i].config.data.datasets[0].data = Object.values(value[term]);
      array[i].config.data.datasets[0].backgroundColor = this.colors;
      array[i].config.data.labels = this.labels;
      i === 0
        ? ((array[i].config.options.legend.display = true),
          (array[i].config.options.title.text =
            'Ilość wizyt na zajęciach w tym miesiacu'))
        : (array[i].config.options.legend.display = false);
      if (i > 0) {
        i === 1
          ? (array[i].config.options.title.text =
              'Ilość wizyt na zajęciach w tym miesiącu')
          : (array[i].config.options.title.text =
              'Suma ilości wizyt na zajęciach SKTT Iskra');
      }
      array[i].update();
      i++;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.ctx.getContext('2d');
    this.ctx1 = document.getElementById('myChart1') as HTMLCanvasElement;
    this.ctx1.getContext('2d');
    this.ctx2 = document.getElementById('myChart2') as HTMLCanvasElement;
    this.ctx2.getContext('2d');
  }
}
