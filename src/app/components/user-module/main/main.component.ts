import { LoginTokenService } from './../../items/login-token-servise/login-token.service';
import { chartDoughnutDefault } from './../../items/chart-config-default/chart-config-default';
import { IUserDaysStat } from './../../../typings/typings.d';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as Chart from 'chart.js';
import { IUser } from 'src/app/typings/typings';

import { getRandomColor } from '../../items/colorGenerator/colorGenerator';
import { PathService } from '../../items/path-service';
import { ServerService } from '../../server/server.service';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './main.component.html'
})
export class MainComponent implements AfterViewInit   {
  constructor(
    private Service: PathService,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private server: ServerService,
    private tokenService: LoginTokenService
  ) {
    this.Service.updatePath('Konto');
    this.titleService.setTitle('Dane');

    this.server
      .getUserById(this.tokenService.token.id)
      .toPromise()
      .then((data: IUser) => {
        this.user = data;
      })
      .catch((err: HttpErrorResponse) => {
        this.snackBar.open('Błąd!', 'Serwer nie mógł pobrać danych.', {
          duration: 3000
        });
      });

    this.server
      .getStatPresenceAllById(this.tokenService.token.id)
      .toPromise()
      .then((dataPack: IUserDaysStat[]) => {
        this.setData(dataPack);
      })
      .catch((err: HttpErrorResponse) => {

        this.snackBar.open('Błąd!', 'Serwer nie mógł pobrać danych.', {
          duration: 3000
        });
      });
  }

  user: IUser;
  chart: Chart;

  setData(dataPack: IUserDaysStat[]): void {
    // set chart data

    this.chart.data.datasets[0] = {
      data: dataPack.map(day => day.data),
      backgroundColor: getRandomColor(dataPack.length),

    };
    this.chart.data.labels = dataPack.map(day =>  day.day);
    this.chart.options.title = {
      text: 'Suma ilości wizyt na zajęciach SKTT Iskra',
      fontSize: 15,
      display: true,
    };
    this.chart.update();
  }

  ngAfterViewInit (): void{
    const ctx: HTMLCanvasElement = document.getElementById(
      'myCharty'
    ) as HTMLCanvasElement;

    // set chart

    ctx.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'doughnut',
     });
  }
}
