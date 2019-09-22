import { HttpErrorResponse } from '@angular/common/http';
import * as Chart from 'chart.js';
import { getRandomColor } from '../../../items/colorGenerator/colorGenerator';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AfterViewInit, Component } from '@angular/core';
import { ServerService } from '../../../server/server.service';
import { IGenderData, IUniversityData } from 'src/app/typings/typings';

@Component({
  selector: 'app-modal',
  templateUrl: './main-modal.component.html'
})
export class MainModalComponent implements AfterViewInit {
  constructor(
    private server: ServerService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<MainModalComponent>
  ) {
    this.server
      .getStatGender()
      .toPromise()
      .then((data: IGenderData[]) => {
        this.chartGender.data.datasets[0] = {
          data: [
            data.find((genderData: IGenderData) => {
              return genderData.gender === 'male';
            }).value,
            data.find((genderData: IGenderData) => {
              return genderData.gender === 'female';
            }).value
          ],
          backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)']
        };
        this.chartGender.data.labels = ['Mężczyźni', 'Kobiety'];
        this.chartGender.options.title = {
          text: 'Podział na płeć',
          display: true,
          fontSize: 15,
        }
        this.chartGender.update();
      }).catch((err: HttpErrorResponse) => {
        this.snackBar.open('Błąd!', 'Nie udało się pobrać danych', {duration: 2000});
      });

    this.server
      .getStatUniversity()
      .toPromise()
      .then((data: IUniversityData[]) => {
        this.chartUniversity.data.datasets[0] = {
          data:  data.map((university: IUniversityData) => {
            return university.value;
          }),
          backgroundColor: getRandomColor(data.length),
        };
        this.chartUniversity.data.labels = data.map((university: IUniversityData) => {
          return university.name;
        });

        this.chartUniversity.options.title = {
          text: 'Podział na uniwersytety',
          display: true,
          fontSize: 15,
        };
        this.chartUniversity.update();
      }).catch((err: HttpErrorResponse) => {
        this.snackBar.open('Błąd!', 'Nie udało się pobrać danych', {duration: 2000});
      });
  };

  chartGender: Chart;
  chartUniversity: Chart;

  ngAfterViewInit() {
    const ctx: HTMLCanvasElement = document.getElementById(
      'gender'
    ) as HTMLCanvasElement;
    const ctx1: HTMLCanvasElement = document.getElementById(
      'university'
    ) as HTMLCanvasElement;

    this.chartUniversity = new Chart(ctx, {
      type: 'pie'
    });

    this.chartGender = new Chart(ctx1, {
      type: 'pie'
    });
  }
}
