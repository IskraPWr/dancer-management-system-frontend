import { AfterViewInit, Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Title } from '@angular/platform-browser';
import * as Chart from 'chart.js';

import { RandomColor } from '../../items/colorGenerator/colorGenerator';
import { ServerService } from './../../../server/server.service';
import { PathService } from './../../service';


@Component({
  templateUrl: './documents.component.html'
})
export class DocumentsComponent {

  constructor(
    private Service: PathService,
    private titleService: Title,
    public dialog: MatDialog
  ) {
    this.Service.updateFlag('Admin');
    this.titleService.setTitle('Dokumenty');

  }
  openDialog(nr?): void {
    this.dialog.open(DocumentsModalComponent, {
      width: '50%',
      data : {id : nr ? nr.id : null},
    });
  }

}

@Component({
  selector: 'app-modal',
  template:
    '<mat-dialog-content><canvas id="myChart"></canvas></mat-dialog-content>'
})
export class DocumentsModalComponent implements AfterViewInit, OnDestroy {
  constructor(public dialogRef: MatDialogRef<DocumentsModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
   private server: ServerService) {
    if (this.data.id !== null) {
     this.presence = this.server.getStatPresencGroupByIdAndIdSemester(this.data.id, this.data.id_semester).subscribe((dat) => {
        const value = Object.values({...dat});
        this.setModalPresence(value);
      }, error => console.log(error));
    } else {
      this.charges = this.server.getStatCharges().subscribe((dat) => {
        const value = Object.values({...dat});
        this.setModal(value);
      }, error => console.log(error));
    }
   }
   presence;
   charges;
   color = new RandomColor;
   chart;
   ctx: HTMLCanvasElement;

   backgroundColorA = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(31, 190, 15, 0.5)',
    'rgb(77, 166, 255, 0.5)'
  ];

  borderColor = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(31, 190, 15, 1)',
    'rgb(77, 166, 255, 1)'
  ];

   ngOnDestroy () {
    this.data.id !== null ? this.presence.unsubscribe() : this.charges.unsubscribe();
   }

  setModalPresence(value) {
    this.chart = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Ilość wizyt',
              data: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1
            },
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Ilość wizyt na poszczególnych grupach w wybranym semestrze'
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
        }
      });

    let i = 0;
    value.forEach(element => {
      this.chart.config.data.datasets[0].backgroundColor.push(this.backgroundColorA[i]);
      this.chart.config.data.datasets[0].borderColor.push(this.borderColor[i]);
      this.chart.config.data.datasets[0].data.push(element.data);
      this.chart.config.data.labels.push(element.name);
      i++;
    });
    this.chart.update();
  }

   setModal (value) {
    this.chart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [],
            backgroundColor: [
            ],
            label: 'Dataset 1'
          }
        ],
        labels: []
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Deklarowane wysokości składek'
        }
      }
    });

    value.forEach(element => {
      this.chart.config.data.datasets[0].data.push(element.value);
      this.chart.config.data.datasets[0].backgroundColor.push(this.color.getRandomColor());
      this.chart.config.data.labels.push(element.name);
    });
    this.chart.update();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.ctx = document.getElementById(
      'myChart'
    ) as HTMLCanvasElement;
  }
}
