import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as Chart from 'chart.js';
import {RandomColor} from '../../items/colorGenerator/colorGenerator';
import { ServerService } from './../../../server/server.service';

@Component({
  templateUrl: './main.component.html'
})
export class MainComponent implements AfterViewInit, OnDestroy {

  user = {
    name : '',
    surname: '',
    email: '',
    phone: '',
    university: '',
    department: '',
    year: '',
    index: '',
    key1: '',
    key2: '',
  };

color = new RandomColor;
chart;
userConnect;
presenceConnect;

  constructor (private Service: PathService, private titleService: Title, private server: ServerService ) {
    this.Service.updateFlag('Konto');
    this.titleService.setTitle('Dane');

  }

  setPresence (value) {
    // tslint:disable-next-line:forin
    for (let i = 0; i < Object.keys(value).length; i++) {
      this.chart.config.data.datasets[0].backgroundColor.push(this.color.getRandomColor());
      this.chart.config.data.datasets[0].data.push(value[i].data);
      this.chart.config.data.labels.push(value[i].day);
    }
    this.chart.update();
  }

  ngAfterViewInit() {

    this.userConnect = this.server.getUserById(1).subscribe((data) => {
      this.user = data[0];
    }, error => console.log(error));

    this.presenceConnect = this.server.getStatPresenceAllById(1).subscribe((data) => {
      const value = Object.values({...data});
      this.setPresence(value);
    }, error => console.log(error));

    const ctx: HTMLCanvasElement = document.getElementById('myCharty') as HTMLCanvasElement;
    ctx.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'doughnut',

      // The data for our dataset
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
          text: 'Suma ilości wiyt na zajęciach SKTT Iskra'
          }
      }
    });
  }

  ngOnDestroy () {
    this.presenceConnect.unsubscribe();
    this.userConnect.unsubscribe();
  }
}

