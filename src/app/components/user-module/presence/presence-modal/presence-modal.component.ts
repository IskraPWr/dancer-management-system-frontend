import { LoginTokenService } from './../../../items/login-token-servise/login-token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatSelectChange } from '@angular/material';
import * as Chart from 'chart.js';
import { IPresenceStat, IPresence } from 'src/app/typings/typings';

import { getRandomColor } from '../../../items/colorGenerator/colorGenerator';
import { ServerService } from '../../../server/server.service';
import { ISelectOptions, ISemesterDataPack } from './../../../../typings/typings.d';
import { chartDoughnutDefault } from './../../../items/chart-config-default/chart-config-default';


@Component({
  selector: 'app-modal',
  templateUrl: './presence-modal.component.html'
})
export class PresenceModalComponent implements AfterViewInit {
  constructor(
    private dialogRef: MatDialogRef<PresenceModalComponent>,
    private server: ServerService,
    private snackBar: MatSnackBar,
    private tokenService: LoginTokenService
  ) {
    this.server
      .getStatPresenceById(this.tokenService.token.id)
      .toPromise()
      .then((data: IPresenceStat) => {
        this.setData(data);
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.snackBar.open('Błąd!', 'Nie udało się pobrać danych', {
          duration: 2000
        });
      });

      this.semesters = [];
  }

  semesters: ISelectOptions[];
  month: Chart;
  semester: Chart;
  all: Chart;
  semesterDataPack: ISemesterDataPack;

  setData(data: IPresenceStat) {
    data.allSemestersGroups.map((semester, index) => this.semesters.push({
      value: index.toString(),
      viewValue: semester.name,
    }));

    // month
    this.month.data.datasets[0] = {
      data: data.lastMonth.map(group => group.data),
      backgroundColor: getRandomColor(data.lastMonth.length),
    };
    this.month.data.labels = data.lastMonth.map(group => group.name);
    this.month.options.title = {
      text: 'Ilość wizyt na zajęciach poszczególnych grupach w ostatnim miesiacu',
      fontSize: 15,
      display: true,
    };

    // semester
    this.semesterDataPack = {
      data: data.allSemestersGroups.map(semester =>
         (<IPresence[]>semester.data).map(group => group.data)
      ),
      labels: data.allSemestersGroups.map(semester =>
        (<IPresence[]>semester.data).map(group => group.name)
     ),
    };

    this.semester.data.datasets[0] = {
      data : this.semesterDataPack.data[0],
      backgroundColor : getRandomColor(this.semesterDataPack.data[0].length),
    };
    this.semester.data.labels = this.semesterDataPack.labels[0];
    this.semester.options.title = {
      text: 'Ilość wizyt na zajęciach poszczególnych grupach w ostatnim semestrze',
      fontSize: 15,
      display: true,
    };

    // all
    this.all.data.datasets[0] = {
      data: data.allVisits.map(day => day.data),
      backgroundColor: getRandomColor(data.allVisits.length),
    };
    this.all.data.labels = data.allVisits.map(day => day.name);
    this.all.options.title = {
      text: 'Suma ilości wizyt na zajęciach',
      fontSize: 15,
      display: true,
    };


    this.month.update();
    this.semester.update();
    this.all.update();
  }

  setSemester(matSelect: MatSelectChange): void{
    const index =  (<number>matSelect.value);
    this.semester.data.datasets[0] = {
      data : this.semesterDataPack.data[index],
      backgroundColor : getRandomColor(this.semesterDataPack.data[index].length),
    };
    this.semester.data.labels = this.semesterDataPack.labels[index];

    this.semester.update();
  }

  ngAfterViewInit() {
    const ctxMonth = document.getElementById('month') as HTMLCanvasElement;
    const ctxSemester = document.getElementById('semester') as HTMLCanvasElement;
    const ctxAll = document.getElementById('all') as HTMLCanvasElement;

    this.month = new Chart(ctxMonth,  {
      type: 'doughnut',
     });
    this.semester = new Chart(ctxSemester,  {
      type: 'doughnut',
     });
    this.all = new Chart(ctxAll, {
      type: 'doughnut',
     });
  }m
}
