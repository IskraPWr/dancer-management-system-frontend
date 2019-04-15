import * as Chart from 'chart.js';
import { RandomColor } from './../../items/colorGenerator/colorGenerator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServerService } from './../../../server/server.service';
import { AfterViewInit, OnDestroy, Component, Inject } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  template:
    '<mat-dialog-content><div class="row"><canvas class="col-12" id="myChart">\
    </canvas></div></mat-dialog-content>'
})
export class MembersStatModalComponent implements AfterViewInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<MembersStatModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  gender;
  university;
  color = new RandomColor();
  chartGender: Chart;
  chartUniversity: Chart;

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngAfterViewInit() {
    const ctx: HTMLCanvasElement = document.getElementById(
      'myChart'
    ) as HTMLCanvasElement;

    this.chartGender = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [
          {
            backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            label: 'Dataset 1'
          }
        ],
        labels: ['Kobiety', 'Mężczyźni']
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Podział na płeć w grupie'
        }
      }
    });

    this.chartGender.config.data.datasets[0].data[0] = this.data.woman;
    this.chartGender.config.data.datasets[0].data[1] = this.data.man;
    this.chartGender.update();
  }

  ngOnDestroy() {
    this.gender.unsubscribe();
    this.university.unsubscribe();
  }
}
