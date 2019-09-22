import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/components/server/server.service';
import { IChartConfig, IPresenceSemesterData, IPresenceStat2, ISemestersChartConfig, IPresenceGroupDetails } from 'src/app/typings/typings';

import { PresenceComponent } from '../presence-component/presence.component';
import {
  IGenderStat,
  IPresenceChartsConfig,
  IPresenceDaysData,
  IPresenceGroupsData,
  ISelectOptions,
} from './../../../../typings/typings.d';

const daysOfWeek = [
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
  'Niedziela',
];

const datas: IPresenceStat2 = {
  general: {
    week: {
      mon: {
        man: 1,
        woman: 2,
        date: '1 stycznia',
      },
      tue: {
        man: 3,
        woman: 4,
        date: '2 stycznia',
      },
      wed: {
        man: 5,
        woman: 6,
        date: '3 stycznia',
      },
      thu: {
        man: 7,
        woman: 8,
        date: '4 stycznia',
      },
      fri: {
        man: 9,
        woman: 10,
        date: '5 stycznia',
      },
      sat: {
        man: 11,
        woman: 12,
        date: '6 stycznia',
      },
      sun: {
        man: 13,
        woman: 14,
        date: '7 stycznia',
      },
    },
    month: {
      mon: {
        man: 1,
        woman: 2,
        date: '1 stycznia',
      },
      tue: {
        man: 3,
        woman: 4,
        date: '2 stycznia',
      },
      wed: {
        man: 5,
        woman: 6,
        date: '3 stycznia',
      },
      thu: {
        man: 7,
        woman: 8,
        date: '4 stycznia',
      },
      fri: {
        man: 9,
        woman: 10,
        date: '5 stycznia',
      },
      sat: {
        man: 11,
        woman: 12,
        date: '6 stycznia',
      },
      sun: {
        man: 13,
        woman: 14,
        date: '7 stycznia',
      },
    },
    semester: {
      mon: {
        man: 10,
        woman: 20,
        date: '1 stycznia',
      },
      tue: {
        man: 30,
        woman: 40,
        date: '2 stycznia',
      },
      wed: {
        man: 50,
        woman: 60,
        date: '3 stycznia',
      },
      thu: {
        man: 70,
        woman: 80,
        date: '4 stycznia',
      },
      fri: {
        man: 90,
        woman: 100,
        date: '5 stycznia',
      },
      sat: {
        man: 110,
        woman: 120,
        date: '6 stycznia',
      },
      sun: {
        man: 130,
        woman: 140,
        date: '7 stycznia',
      },
    },
    all: {
      mon: {
        man: 100,
        woman: 200,
        date: '1 stycznia',
      },
      tue: {
        man: 300,
        woman: 400,
        date: '2 stycznia',
      },
      wed: {
        man: 500,
        woman: 600,
        date: '3 stycznia',
      },
      thu: {
        man: 700,
        woman: 800,
        date: '4 stycznia',
      },
      fri: {
        man: 900,
        woman: 1000,
        date: '5 stycznia',
      },
      sat: {
        man: 1100,
        woman: 1200,
        date: '6 stycznia',
      },
      sun: {
        man: 1300,
        woman: 1400,
        date: '7 stycznia',
      },
    },
  },
  days: [
    {
      name: 'Letni',
      id_semester: 4,
      data: [
        {
          week: '1-7 stycznia',
          days: {
            mon: {
              man: 14,
              woman: 13,
              date: '1 stycznia',
            },
            tue: {
              man: 12,
              woman: 11,
              date: '2 stycznia',
            },
            wed: {
              man: 10,
              woman: 9,
              date: '3 stycznia',
            },
            thu: {
              man: 8,
              woman: 7,
              date: '4 stycznia',
            },
            fri: {
              man: 6,
              woman: 5,
              date: '5 stycznia',
            },
            sat: {
              man: 4,
              woman: 3,
              date: '6 stycznia',
            },
            sun: {
              man: 2,
              woman: 1,
              date: '7 stycznia',
            },
          },
        } as IPresenceDaysData,
        {
          week: '8-15 stycznia',
          days: {
            mon: {
              man: 14,
              woman: 13,
              date: '9 stycznia',
            },
            tue: {
              man: 12,
              woman: 11,
              date: '10 stycznia',
            },
            wed: {
              man: 10,
              woman: 9,
              date: '11 stycznia',
            },
            thu: {
              man: 8,
              woman: 7,
              date: '12 stycznia',
            },
            fri: {
              man: 6,
              woman: 5,
              date: '13 stycznia',
            },
            sat: {
              man: 4,
              woman: 3,
              date: '14 stycznia',
            },
            sun: {
              man: 2,
              woman: 1,
              date: '15 stycznia',
            },
          },
        } as IPresenceDaysData,
      ]
    },
    {
      name: 'Zimowy',
      id_semester: 3,
      data: [
        {
          week: '1-7 wrzesien',
          days: {
            mon: {
              man: 14,
              woman: 13,
              date: '1 wrzesien',
            },
            tue: {
              man: 12,
              woman: 11,
              date: '2 wrzesien',
            },
            wed: {
              man: 10,
              woman: 9,
              date: '3 wrzesien',
            },
            thu: {
              man: 8,
              woman: 7,
              date: '4 wrzesien',
            },
            fri: {
              man: 6,
              woman: 5,
              date: '5 wrzesien',
            },
            sat: {
              man: 4,
              woman: 3,
              date: '6 wrzesien',
            },
            sun: {
              man: 2,
              woman: 1,
              date: '7 wrzesien',
            },
          },
        } as IPresenceDaysData,
        {
          week: '8-15 wrzesien',
          days: {
            mon: {
              man: 14,
              woman: 13,
              date: '9 wrzesien',
            },
            tue: {
              man: 12,
              woman: 11,
              date: '10 wrzesien',
            },
            wed: {
              man: 10,
              woman: 9,
              date: '11 wrzesien',
            },
            thu: {
              man: 8,
              woman: 7,
              date: '12 wrzesien',
            },
            fri: {
              man: 6,
              woman: 5,
              date: '13 wrzesien',
            },
            sat: {
              man: 4,
              woman: 3,
              date: '14 wrzesien',
            },
            sun: {
              man: 2,
              woman: 1,
              date: '15 wrzesien',
            },
          },
        } as IPresenceDaysData,
      ]
    },
  ],
  groups: [
    {
      name: 'Letni',
      id_semester: 4,
      data: [
        {
          name: 'Bachata',
          groupData: [
           {
            week: '1-7 stycznia',
            day: '2 stycznia',
            man: 5,
            woman: 4,
           },
           {
            week: '7-16 stycznia',
            day: '8 stycznia',
            man: 8,
            woman: 10,
           }
          ]
        } as IPresenceGroupsData,
        {
          name: 'Salsa',
          groupData: [
           {
            week: '1-7 stycznia',
            day: '3 stycznia',
            man: 50,
            woman: 14,
           },
           {
            week: '7-16 stycznia',
            day: '9 stycznia',
            man: 18,
            woman: 100,
           }
          ]
        } as IPresenceGroupsData,
      ]
    },
    {
      name: 'Zimowy',
      id_semester: 3,
      data: [
        {
          name: 'Angielski ',
          groupData: [
           {
            week: '1-7 stycznia',
            day: '2 stycznia',
            man: 5,
            woman: 4,
           },
           {
            week: '7-16 stycznia',
            day: '8 stycznia',
            man: 8,
            woman: 10,
           }
          ]
        } as IPresenceGroupsData,
        {
          name: 'Boogi',
          groupData: [
           {
            week: '1-7 stycznia',
            day: '3 stycznia',
            man: 50,
            woman: 14,
           },
           {
            week: '7-16 stycznia',
            day: '9 stycznia',
            man: 18,
            woman: 100,
           }
          ]
        } as IPresenceGroupsData,
      ]
    },
  ],
  weekToWeek: [
    {
      man: 3,
      woman: 4,
      week: '1-7 stycznia',
    },
    {
      man: 4,
      woman: 5,
      week: '8-16 stycznia',
    }
  ],
}

@Component({
  selector: 'app-modal',
  templateUrl: './presence-modal.component.html',
  styleUrls: ['./presence-model.component.css'],
  providers: [NgbCarouselConfig]
})
export class PresenceModalComponent {
  constructor(
    private dialogRef: MatDialogRef<PresenceComponent>,
    private config: NgbCarouselConfig,
    private snackBar: MatSnackBar,
    private server: ServerService
  ) {
    this.config.interval = 0;
    this.semesters = [];
    this.server
      .getStatPeople()
      .toPromise()
      .then((data: IPresenceStat2) => {
        this.selectedSemester = '0';
        return data;
      })
      .catch((err: HttpErrorResponse) => {
        this.snackBar.open('Błąd!', 'Nie udało się pobrać danych', {
          duration: 5000
        });
      })
      .then((data: IPresenceStat2) => {
        this.setData(data);
      })
      .catch((err: any) => {
        this.snackBar.open('Błąd!', 'Nie udało się ustawić danych', {
          duration: 5000
        });
      });
  }

  chartsData: IPresenceChartsConfig;
  semesters: ISelectOptions[];
  selectedSemester: string;

  setData(data: IPresenceStat2) {

    data.days.forEach((semester: IPresenceSemesterData, index: number) => {
      this.semesters.push({
        value: index.toString(),
        viewValue: semester.name,
      } as ISelectOptions)
    });

    this.chartsData = {
      general: {
        week: {
          data: [
            Object.values(data.general.week).map((day: IGenderStat) => day.man),
            Object.values(data.general.week).map((day: IGenderStat) => day.woman),
          ],
          dataLabel: ['Mężczyźni', 'Kobiety'],
          labels: daysOfWeek,
          title: 'Ilość wejść w ostatnim tygodniu',
          type: 'bar',
        },
        month: {
          data: [
            Object.values(data.general.month).map((day: IGenderStat) => day.man),
            Object.values(data.general.month).map((day: IGenderStat) => day.woman),
          ],
          dataLabel: ['Mężczyźni', 'Kobiety'],
          labels: daysOfWeek,
          title: 'Ilość wejść w ostatnim miesiącu',
          type: 'bar',
        },
        semester: {
          data: [
            Object.values(data.general.semester).map((day: IGenderStat) => day.man),
            Object.values(data.general.semester).map((day: IGenderStat) => day.woman),
          ],
          dataLabel: ['Mężczyźni', 'Kobiety'],
          labels: daysOfWeek,
          title: 'Ilość wejść w ostatnim semestrze',
          type: 'bar',
        },
        all: {
          data: [
            Object.values(data.general.all).map((day: IGenderStat) => day.man),
            Object.values(data.general.all).map((day: IGenderStat) => day.woman),
          ],
          dataLabel: ['Mężczyźni', 'Kobiety'],
          labels: daysOfWeek,
          title: 'Suma ilości wejść w Klubie',
          type: 'bar',
        },
      },
      days: data.days.map((semester: IPresenceSemesterData) =>
        {
          const quantity: number = Object.keys((<IPresenceDaysData[]>semester.data)[0].days).length;
          const daysContainer: IGenderStat[][] = Array(quantity);

          for (let i = 0; i < quantity; i++) {
            daysContainer[i] = new Array();
          }

          (<IPresenceDaysData[]>semester.data).map((week: IPresenceDaysData) => {
            const days = (<IGenderStat[]>Object.values(week.days));

            days.forEach((day: IGenderStat, index: number) => {
              daysContainer[index].push(day);
            });
            return daysContainer;
          });

          return {
            id_semester: semester.id_semester,
            name: semester.name,
            data: daysContainer.map((days: IGenderStat[], index: number) => {
              return {
                data: [
                  days.map((day: IGenderStat) => day.man),
                  days.map((day: IGenderStat) => day.woman),
                ],
                dataLabel: ['Mężczyźni', 'Kobiety'],
                labels: days.map((day: IGenderStat) => day.date),
                title: `Zmiana ilości osób w kolejnych w ${daysOfWeek[index].toLowerCase()}`,
                type: 'line',
              } as IChartConfig;
            }),
          } as ISemestersChartConfig;
        }
      ),
      groups: data.groups.map((semester: IPresenceSemesterData) =>
      {
        return {
          id_semester: semester.id_semester,
          name: semester.name,
          data: (<IPresenceGroupsData[]>semester.data).map((group: IPresenceGroupsData) => {
            return {
              data: [
                group.groupData.map((log: IPresenceGroupDetails) => log.man),
                group.groupData.map((log: IPresenceGroupDetails) => log.woman),
              ],
              dataLabel: ['Mężczyźni', 'Kobiety'],
              labels: group.groupData.map((log: IPresenceGroupDetails) => log.day),
              title: `Zmiana ilości osób na grupie - ${group.name}`,
              type: 'line',
            } as IChartConfig;
          }),
        } as ISemestersChartConfig;
      }
    ),
      weekToWeek: {
        data: [
          Object.values(data.weekToWeek).map((week: IGenderStat) => week.man),
          Object.values(data.weekToWeek).map((week: IGenderStat) => week.woman),
        ],
        dataLabel: ['Mężczyźni', 'Kobiety'],
        labels: Object.values(data.weekToWeek).map((week: IGenderStat) => week.week),
        title: 'Zmiena ilości wejść w poszczegółnych tygodniach',
        type: 'line',
      }
    };
  }
}
