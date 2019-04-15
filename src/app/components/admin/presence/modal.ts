import * as Chart from 'chart.js';

export class ModalComponent {
  chart = [];

  weekDays = [
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela'
  ];

  backgroundColorA = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(31, 190, 15, 0.5)'
  ];

  backgroundColorB = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(31, 190, 15, 0.2)'
  ];

  borderColor = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(31, 190, 15, 1)'
  ];

  ctx = [];

  chartName = [
    'chartWeek',
    'chartMonth',
    'chartSemester',
    'chartAll',
    'chartWeekToWeek',
    'chartDayMon',
    'chartDayTue',
    'chartDayWed',
    'chartDayThu',
    'chartDayFri',
    'chartDaySat',
    'chartDaySun',
  ];

  texts = [
    'Ilość osób na zajęciach w obecnym tygodniu',
    'Ilość osób na zajęciach w obecnym miesiącu',
    'Ilość osób na zajęciach w ostatnim zdefiniowanym semestrze',
    'Suma ilość osób na zajęciach',
    'Zmiana ilości w poszczególnych tygodniach',
    'Zmiana ilości osób w poniedziałki',
    'Zmiana ilości osób w wtorki',
    'Zmiana ilości osób w środy',
    'Zmiana ilości osób w czwartki',
    'Zmiana ilości osób w piątki',
    'Zmiana ilości osób w soboty',
    'Zmiana ilości osób w niedziele'
  ];

  getNamelist() {
    return this.chartName;
  }

  getChartStatic() {
    for (let i = 0; i < 5; i++) {
      this.ctx[i] = document.getElementById(
        this.chartName[i]
      ) as HTMLCanvasElement;
      this.ctx[i].getContext('2d');
      if (i < 4) {
        const configFirstPage: Chart.ChartConfiguration = {
          type: 'bar',
          data: {
            labels: this.weekDays,
            datasets: [
              {
                label: 'Ilość osób - meżczyźni',
                data: [],
                backgroundColor: this.backgroundColorA,
                borderColor: this.borderColor,
                borderWidth: 1
              },
              {
                label: 'Ilość osób - kobiety',
                data: [],
                backgroundColor: this.backgroundColorB,
                borderColor: this.borderColor,
                borderWidth: 1
              }
            ]
          },
          options: {
            title: {
              display: true
            },
            tooltips: {
              mode: 'index',
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
          }
        };

        this.chart[i] = new Chart(this.ctx[i], configFirstPage);
      } else {
        const configsSecondPage: Chart.ChartConfiguration = {
          type: 'line',
          data: {
            labels: [],
            datasets: [
              {
                label: 'Mężczyźni',
                backgroundColor: ['#343a40'],
                borderColor: ['#343a40'],
                data: [],
                fill: false
              },
              {
                label: 'Kobiety',
                fill: false,
                backgroundColor: 'rgba(155, 159, 12, 1)',
                borderColor: 'rgba(155,159,12,1)',
                data: []
              }
            ]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: ''
            },
            tooltips: {
              mode: 'index',
              intersect: false
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  ticks: {
                    display: false
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Tydzień'
                  }
                }
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Ilość'
                  }
                }
              ]
            }
          }
        };

        this.chart[i] = new Chart(this.ctx[i], configsSecondPage);
      }
      this.chart[i].config.options.title.text = this.texts[i];
      this.chart[i].update();
    }
  }
  getChartDynamic(canvasQuantity) {
    for (let i = 5; i < 12 + canvasQuantity; i++) {
      if ( i < 12) {
        this.ctx[i] = document.getElementById(
          this.chartName[i]
        ) as HTMLCanvasElement;
      } else {
        this.ctx[i] = document.getElementById(
          'chartGroup' + (i - 12)
        ) as HTMLCanvasElement;
      }

      const configsSecondPage: Chart.ChartConfiguration = {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Mężczyźni',
              backgroundColor: ['#343a40'],
              borderColor: ['#343a40'],
              data: [],
              fill: false
            },
            {
              label: 'Kobiety',
              fill: false,
              backgroundColor: 'rgba(155, 159, 12, 1)',
              borderColor: 'rgba(155,159,12,1)',
              data: []
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: ''
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [
              {
                display: true,
                ticks: {
                  display: false
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Tydzień'
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Ilość'
                }
              }
            ]
          }
        }
      };

      this.chart[i] = new Chart(this.ctx[i], configsSecondPage);
      if (i < 12) {
        this.chart[i].config.options.title.text = this.texts[i];
      }
      this.chart[i].update();
    }
  }
}
