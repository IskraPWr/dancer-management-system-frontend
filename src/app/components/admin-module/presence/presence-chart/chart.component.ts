import {
  IChartConfig
} from './../../../../typings/typings';
import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  OnChanges
} from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-canvas',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit, OnChanges {
  constructor() {
  }

  @ViewChild('contentWrapper') content: ElementRef<HTMLElement>;
  @Input() data: IChartConfig;

  chart: Chart;

  ngAfterViewInit() {
    const ctx: HTMLCanvasElement = this.content.nativeElement.children[0] as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar'
    });
    this.ngOnChanges();
  }

  ngOnChanges() {

    if (this.data && this.chart) {
    const manColor: string = 'rgba(54, 162, 235, 1)';
    const womanColor: string = 'rgba(255, 99, 132, 1)';
    const arrayOfManColor: string[] = Array(this.data.data[0].length).fill(manColor);
    const arrayOfWomanColor: string[] = Array(this.data.data[1].length).fill(womanColor);

    this.chart.data = {
      datasets: [
        {
          data: this.data.data[0],
          backgroundColor: this.data.type === 'bar' ? arrayOfManColor : manColor,
          borderColor: this.data.type === 'bar' ? arrayOfManColor : manColor,
          label: this.data.dataLabel[0],
          fill: this.data.type === 'bar' ? true  : false,
        },
        {
          data: this.data.data[1],
          backgroundColor: this.data.type === 'bar' ? arrayOfWomanColor : womanColor,
          borderColor: this.data.type === 'bar' ? arrayOfWomanColor : womanColor,
          label: this.data.dataLabel[1],
          fill: this.data.type === 'bar' ? true  : false,
        }
      ],
      labels: this.data.labels
    };

    this.chart.config.type = this.data.type;

    this.chart.options = {
      title: {
        display: true,
        fontSize: 15,
        text: this.data.title
      },
      tooltips: {
       // mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      }
    };

    this.chart.update();
    }
  }
}
