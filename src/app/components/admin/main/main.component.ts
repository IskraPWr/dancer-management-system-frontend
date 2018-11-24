import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as Chart from 'node_modules/chart.js';
import { PathService } from './../../service';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

export interface PeriodicElement {
  name: string;
  surname: string;
  email: string;
  phone: string;
  university: string;
  department: string;
  year: string;
  index: string;
}

export interface Note {
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Grzegorz',
    surname: 'Kikut',
    email: 'grzegorzkikut1@gmail.com',
    phone: '515951120',
    university: 'Politechnika Wrocławska',
    department: 'W12',
    year: '3',
    index: '227574'
  }
];

@Component({
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  notes: Note[] = [];

  constructor(
    private Service: PathService,
    private titleService: Title,
    public dialog: MatDialog
  ) {
    this.Service.updateFlag('Admin');
    this.titleService.setTitle('Przegląd osób');
  }

  displayedColumns: string[] = [
    'select',
    'name',
    'surname',
    'email',
    'phone',
    'university',
    'department',
    'year',
    'index',
    'note'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  openDialog(): void {
    this.dialog.open(MainModalComponent, {
      width: '80%'
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.notes.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  remove(note: Note): void {
    const index = this.notes.indexOf(note);

    if (index >= 0) {
      this.notes.splice(index, 1);
    }
  }
}

@Component({
  selector: 'app-modal',
  template:
    '<mat-dialog-content><div class="row"><canvas class="col-6" id="myChart">\
    </canvas><canvas class="col-6" id="myChart1"></canvas></div></mat-dialog-content>'
})
export class MainModalComponent implements AfterViewInit {
  constructor(public dialogRef: MatDialogRef<MainModalComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    const ctx: HTMLCanvasElement = document.getElementById(
      'myChart'
    ) as HTMLCanvasElement;
    const ctx1: HTMLCanvasElement = document.getElementById(
      'myChart1'
    ) as HTMLCanvasElement;
    const chartUniversity = new Chart(ctx, {
      // The type of chart we want to create
      type: 'pie',

      // The data for our dataset
      data: {
        datasets: [
          {
            data: [33,	96,	43,	24,	96,
              40,	100, 68,	79,	70,
              68,	64,	88,	87,	61,
              92,	19,	19,	10,	86,
              51,	92,	17,	38,	6,
              9,	4,	24	],
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            label: 'Dataset 1'
          }
        ],
        labels: [
          'Akademia Muzyczna we Wrocławiu',
              'Akademia Sztuk Pięknych we Wrocławiu',
              'Akademia Lądowych we Wrocławiu',
              'AWF - Akademia Wychowania Fizycznego we Wrocławiu',
              'Dolnośląska Szkoła Wyższa we Wrocławiu',
              'Ewangelikalna Wyższa Szkoła Teologiczna we Wrocławiu',
              'Instytut Konfucjusza w Uniwersytecie Wrocławskim',
              'Metropolitalne Wyższe Seminarium Duchowne we Wrocławiu',
              'Międzynarodowa Wyższa Szkoła Logistyki i Transportu we Wrocławiu',
              'AST - Akademia Sztuk Teatralnych - filia Wrocławiu',
              'Papieski Wydział Teologiczny we Wrocławiu',
              'Politechnika Wrocławska',
              'Uniwersytet SWPS Wrocław',
              'Szkoła Wyższa Rzemiosł Artystycznych i Zarządzania we Wrocławiu',
              'Uniwersytet Ekonomiczny we Wrocławiu',
              'Uniwersytet Medyczny we Wrocławiu',
              'Uniwersytet Przyrodniczy we Wrocławiu',
              'Uniwersytet Wrocławski',
              'Wyższa Szkoła Bankowa we Wrocławiu',
              'Wyższa Szkoła Filologiczna we Wrocławiu',
              'Wyższa Szkoła Handlowa we Wrocławiu',
              'Wyższa Szkoła Humanistyczna we Wrocławiu',
              'Wyższa Szkoła Informatyki i Zarządzania Copernicus we Wrocławiu',
              'Wyższa Szkoła Prawa',
              'Wyższa Szkoła Zarządzania „Edukacja”',
              'Wyższa Szkoła Zarządzania i Coachingu we Wrocławiu',
              'Wrocławska Wyższa Szkoła Informatyki Stosowanej „Horyzont”',
              'Inna'
        ]
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        title: {
          display: true,
          text: 'Podział na rodzaje uniwersytetów'
        }
      }
    });
    //////////////////

    const chartGender = new Chart(ctx1, {
      // The type of chart we want to create
      type: 'pie',

      // The data for our dataset
      data: {
        datasets: [
          {
            data: [12, 19],
            backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            label: 'Dataset 1'
          }
        ],
        labels: ['Kobiety', 'Mężczyźni']
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Podział na płeć'
        }
      }
    });
  }
}
