import * as Chart from 'chart.js';
import { RandomColor } from './../../items/colorGenerator/colorGenerator';
import { MatDialogRef } from '@angular/material';
import { ServerService } from './../../../server/server.service';
import { AfterViewInit, OnDestroy, Component } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal',
  template:
    '<mat-dialog-content><div class="row"><canvas class="col-6" id="myChart">\
    </canvas><canvas class="col-6" id="myChart1"></canvas></div></mat-dialog-content>'
})
export class MainModalComponent implements AfterViewInit, OnDestroy {
  constructor(private server: ServerService, public dialogRef: MatDialogRef<MainModalComponent>) {
  }

  gender;
  university;
  color = new RandomColor;
  chartGender: Chart;
  chartUniversity: Chart;

  onNoClick(): void {
    this.dialogRef.close();
  }

  setGender(value) {
    this.chartGender.config.data.datasets[0].data[0] = value[1].value;
    this.chartGender.config.data.datasets[0].data[1] = value[0].value;
    this.chartGender.update();
  }

  setUniversity(value) {
    const data = [];
    const color = [];
    const label = [];

    value.forEach(element => {
      data.push(element.value);
      color.push(this.color.getRandomColor());
      label.push(element.name);
    });
    this.chartUniversity.config.data.datasets[0].data = data;
    this.chartUniversity.config.data.datasets[0].backgroundColor = color;
    this.chartUniversity.config.data.labels = label;
    this.chartUniversity.update();
  }

  ngAfterViewInit() {

    this.gender = this.server.getStatGender().subscribe((data) => {
      const value = Object.values({...data});
      this.setGender(value);
    }, error => console.log(error));

    this.university = this.server.getStatUniversity().subscribe((data) => {
      const value = Object.values({...data});
      this.setUniversity(value);
    }, error => console.log(error));

    const ctx: HTMLCanvasElement = document.getElementById(
      'myChart'
    ) as HTMLCanvasElement;
    const ctx1: HTMLCanvasElement = document.getElementById(
      'myChart1'
    ) as HTMLCanvasElement;


    this.chartUniversity = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [
          {
            backgroundColor: [],
            label: 'Dataset 1'
          }
        ],
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        title: {
          display: true,
          text: 'Podział na rodzaje uniwersytetów'
        }
      }
    });

    this.chartGender = new Chart(ctx1, {
      type: 'pie',
      data: {
        datasets: [
          {
            backgroundColor: ['rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'],
            label: 'Dataset 1'
          }
        ],
        labels: ['Kobiety', 'Mężczyźni']
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

  ngOnDestroy () {
    this.gender.unsubscribe();
    this.university.unsubscribe();
  }
}

