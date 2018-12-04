import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as Chart from 'node_modules/chart.js';
import {RandomColor} from '../../items/colorGenerator/colorGenerator';

import { PathService } from './../../service';
import { ServerService } from './../../../server/server.service';

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
  notes: Array<string>;
}

export interface Note {
  name: string;
}

@Component({
  templateUrl: './main.component.html'
})
export class MainComponent {
   constructor(
    private server: ServerService,
    private Service: PathService,
    private titleService: Title,
    public dialog: MatDialog
  ) {
    this.Service.updateFlag('Admin');
    this.titleService.setTitle('Przegląd osób');
    this.server.getUsers().subscribe((data) => {
      this.ELEMENT_DATA = Object.values({...data});
      this.initiateTable();
    }, error => console.log(error));
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  notes: Note[] = [];
  ELEMENT_DATA;

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
  dataSource;
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

  initiateTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
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
  constructor(private server: ServerService, public dialogRef: MatDialogRef<MainModalComponent>) {
    this.server.getStatUniversity().subscribe((data) => {
      const value = Object.values({...data});
      this.setUniversity(value);
    }, error => console.log(error));
    this.server.getStatGender().subscribe((data) => {
      const value = Object.values({...data});
      this.setGender(value);
    }, error => console.log(error));
  }

  color = new RandomColor;
  chartGender: Chart;
  chartUniversity: Chart;

  onNoClick(): void {
    this.dialogRef.close();
  }

  setGender(value) {
    this.chartGender.config.data.datasets[0].data[0] = value[1].value;
    this.chartGender.config.data.datasets[0].data[1] = value[0].value;
    this.chartGender.update();
  }

  setUniversity(value) {
    value.forEach(element => {
      this.chartUniversity.config.data.datasets[0].data.push(element.value);
      this.chartUniversity.config.data.datasets[0].backgroundColor.push(this.color.getRandomColor());
      this.chartUniversity.config.data.labels.push(element.name);
    });
    this.chartUniversity.update();
  }

  ngAfterViewInit() {

    const ctx: HTMLCanvasElement = document.getElementById(
      'myChart'
    ) as HTMLCanvasElement;
    const ctx1: HTMLCanvasElement = document.getElementById(
      'myChart1'
    ) as HTMLCanvasElement;


    this.chartUniversity = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [
          {
            backgroundColor: [],
            label: 'Dataset 1'
          }
        ],
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

    this.chartGender = new Chart(ctx1, {
      type: 'pie',
      data: {
        datasets: [
          {
            backgroundColor: ['rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'],
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
