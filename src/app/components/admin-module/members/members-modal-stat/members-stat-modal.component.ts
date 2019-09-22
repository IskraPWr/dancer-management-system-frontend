import * as Chart from 'chart.js';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AfterViewInit, Component, Inject } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './members-stat-modal.component.html',
})
export class MembersStatModalComponent implements AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<MembersStatModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

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
            label: 'Podział na płeć'
          }
        ],
        labels: ['Kobiety', 'Mężczyźni']
      },
      options: {
        responsive: true,
        title: {
          display: true,
          fontSize: 15,
          text: 'Podział na płeć w grupie'
        }
      }
    });

    this.chartGender.config.data.datasets[0].data[0] = this.data.woman;
    this.chartGender.config.data.datasets[0].data[1] = this.data.man;
    this.chartGender.update();
  }

}
