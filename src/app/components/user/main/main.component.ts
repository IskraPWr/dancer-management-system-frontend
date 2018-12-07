import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { Component, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import {RandomColor} from '../../items/colorGenerator/colorGenerator';
import { ServerService } from './../../../server/server.service';

@Component({
  templateUrl: './main.component.html'
})
export class MainComponent implements AfterViewInit {

user = {};
color = new RandomColor;
chart;

  constructor (private Service: PathService, private titleService: Title, private server: ServerService ) {
    this.Service.updateFlag('Konto');
    this.titleService.setTitle('Dane');

    this.server.getUserById().subscribe((data) => {
      this.user = Object.values({...data})[0];
    }, error => console.log(error));

    this.server.getStatPresenceAllById(21).subscribe((data) => {
      const value = Object.values({...data});
      this.setPresence(value);
    }, error => console.log(error));
  }

  setPresence (value) {
    this.chart.config.data.datasets[0].data = Object.values(value[0]);
    // tslint:disable-next-line:forin
    for (const ele in value[0]) {
      this.chart.config.data.datasets[0].backgroundColor.push(this.color.getRandomColor());
    }
    this.chart.update();
  }

  ngAfterViewInit() {
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
        responsive: true,
        title: {
          display: true,
          text: 'Suma ilości wiyt na zajęciach SKTT Iskra'
          }
      }
    });
  }
}

