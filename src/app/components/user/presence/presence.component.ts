import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import * as Chart from 'chart.js';

import { RandomColor } from '../../items/colorGenerator/colorGenerator';
import { ServerService } from './../../../server/server.service';
import { PathService } from './../../service';

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

export interface Semester {
  value: string;
  viewValue: string;
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

    this.server.getPresenceById(1).subscribe(
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
  templateUrl: './presence-modal.component.html'
})
export class PresenceModalComponent implements AfterViewInit, OnInit {
  constructor(
    public dialogRef: MatDialogRef<PresenceModalComponent>,
    private server: ServerService
  ) {}

  random = new RandomColor();
  colors = this.random.getRandomColor(10);
  semesters: Semester[] = [];

  ctx = [];
  chart = [];
  name = ['myChart', 'myChart1', 'myChart2'];
  value;
  selected;


  ngOnInit () {
    this.server.getStatPresenceById(1).subscribe(
      data => {
        this.value = Object.values({ ...data });
        this.setPresenceStatic();
        this.setPresenceDynamic('0');
      },
      error => console.log(error)
    );
  }

  setPresenceStatic() {

    let i = 0;
    for (const group of this.value[0].data) {
      this.chart[0].config.data.datasets[0].data.push(group.data);
      this.chart[0].config.data.labels.push(group.name);
      this.chart[0].config.data.datasets[0].backgroundColor.push(this.colors[i]);
      i++;
    }

    let j = 0;
    for (const semester of this.value[1].data) {
      this.semesters.push({
        value: j.toString(),
        viewValue: semester.name,
      });
      j++;
    }
    this.selected = this.semesters[0].value;

    let k = 0;
    for (const days of this.value[2].data) {
      this.chart[2].config.data.datasets[0].data.push(days.data);
      this.chart[2].config.data.labels.push(days.day);
      this.chart[2].config.data.datasets[0].backgroundColor.push(this.colors[k]);
      k++;
    }
    this.chart[0].config.options.title.text = 'Ilość wizyt w poszczególnych grupach w ostatnim miesiącu';
    this.chart[1].config.options.title.text = 'Ilość wizyt w poszczególnych grupach w wybranym semestrze';
    this.chart[2].config.options.title.text = 'Suma ilości wiyt na zajęciach SKTT Iskra';

    this.chart[0].update();
    this.chart[1].update();
    this.chart[2].update();

  }

  setPresenceDynamic(nr) {
    const index = parseInt(nr, 10);
    let j = 0;
    this.chart[1].config.data.datasets[0].data = [];
    this.chart[1].config.data.labels = [];
    this.chart[1].config.data.datasets[0].backgroundColor = [];
    for (const group of this.value[1].data[index].data) {
      this.chart[1].config.data.datasets[0].data.push(group.data);
      this.chart[1].config.data.labels.push(group.name);
      this.chart[1].config.data.datasets[0].backgroundColor.push(this.colors[j]);
      j++;
    }

    this.chart[1].update();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {

    for (let i = 0; i < 3; i++) {
      this.ctx[i] = document.getElementById(this.name[i]) as HTMLCanvasElement;
      this.ctx[i].getContext('2d');

      this.chart[i] = new Chart(this.ctx[i], {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [],
            backgroundColor: [
            ],
            label: 'Ilość wizyt'
          }],
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
    }
  }
}
