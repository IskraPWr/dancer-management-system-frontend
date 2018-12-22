import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, AfterViewInit, Inject } from '@angular/core';
import * as Chart from 'chart.js';
import { Valid } from '../../validators/validators';
import {MAT_DIALOG_DATA} from '@angular/material';

import { ServerService } from './../../../server/server.service';
import { PathService } from './../../service';
import {RandomColor} from '../../items/colorGenerator/colorGenerator';

import { MatDialog, MatDialogRef } from '@angular/material';


import * as $ from 'jquery';

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
export class DocumentsModalComponent implements AfterViewInit {
  constructor(public dialogRef: MatDialogRef<DocumentsModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
   private server: ServerService) {

    if (this.data.id !== null) {
      this.server.getStatPresenceAllById(this.data.id).subscribe((dat) => {
        const value = Object.values({...dat});
        this.setModalPresence(value);
      }, error => console.log(error));
    } else {
      this.server.getStatCharges().subscribe((dat) => {
        const value = Object.values({...dat});
        this.setModal(value);
      }, error => console.log(error));
    }
   }

   color = new RandomColor;
   chart;
   ctx: HTMLCanvasElement;

  setModalPresence(value) {
    this.chart = new Chart(this.ctx, {
      type: 'doughnut',

      data: {
        datasets: [{
          data: [],
          backgroundColor: [
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
          'Nieprzyporządkowane'
        ]
      },
      options: {
        legend: {
          display: true,
        },
        responsive: true,
        title: {
          display: true,
          text: 'Ilość wizyt na zajęciach w tym semestrze'
          }
      }
    });

    this.chart.config.data.datasets[0].data = Object.values(value[0]);
    // tslint:disable-next-line:forin
    for (const ele in value[0]) {
      this.chart.config.data.datasets[0].backgroundColor.push(this.color.getRandomColor());
    }
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
        labels: [
          '1 blok',
          '2 bloki',
          '3 bloki',
          '4 bloki',
          '5 bloków',
          '6 bloków',
          'BO'
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Deklarowane wysokości składek'
        }
      }
    });

    this.chart.config.data.datasets[0].data = Object.values(value[0]);
    // tslint:disable-next-line:forin
    for (const ele in value[0]) {
      this.chart.config.data.datasets[0].backgroundColor.push(this.color.getRandomColor());
    }
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
