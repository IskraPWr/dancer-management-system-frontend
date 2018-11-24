import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { Component, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import {RandomColor} from '../../items/colorGenerator/colorGenerator';




@Component({
  templateUrl: './main.component.html'
})
export class MainComponent implements AfterViewInit {


user: any = {
  name: 'Greg',
  surname: 'Kikut',
  email: '',
  tel: '',
  university: '',
  department: '',
  year: '',
  index: '',
  key1: '',
  key2: '',
  declaration: ''
};

color = new RandomColor;

  constructor (private Service: PathService, private titleService: Title  ) {
    this.Service.updateFlag('Konto');
    this.titleService.setTitle('Dane');
  }

  ngAfterViewInit() {
    const ctx: HTMLCanvasElement = document.getElementById('myCharty') as HTMLCanvasElement;
    ctx.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'doughnut',

      // The data for our dataset
      data: {
        datasets: [{
          data: [12, 19, 32, 23, 12, 12, 1, 3, 1, 5],
          backgroundColor: [
            this.color.getRandomColor(),
            this.color.getRandomColor(),
            this.color.getRandomColor(),
            this.color.getRandomColor(),
            this.color.getRandomColor(),
            this.color.getRandomColor(),
            this.color.getRandomColor(),
            this.color.getRandomColor(),
            this.color.getRandomColor(),
            this.color.getRandomColor()
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
          'Practise - sob',
          'Practise - niedz',
          'Nieprzyporządkowane'
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Ilość wizyt na zajęciach'
          }
      }
    });
  }
}

