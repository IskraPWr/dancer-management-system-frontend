import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Valid } from '../../validators/validators';

import {MatDialog, MatDialogRef} from '@angular/material';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

import * as $ from 'jquery';

export interface PeriodicElement {
  name: string;
  surname: string;
  amount: number;
  payment1: string;
  payment2: string;
  payment3: string;
  sum: number;
}

export interface PeriodicElementList {
  id: number;
  sum: number;
  date: string;
  name: string;
  surname: string;
  product: string;
}

export interface Note {
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Grzegorz', surname: 'Kikut', amount: 1.0079, payment1: '212', payment2: '23232', payment3: '2323', sum: 231313}
];

const LIST_DATA: PeriodicElementList[] = [
  {id: 1111, sum: 23, date: '1.0079', name: 'greg', surname: 'kikut', product: 'kon'}
];

@Component({
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit {
  formModel: FormGroup;
  valid = new Valid();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  notes: Note[] = [];

  constructor(private Service: PathService, private titleService: Title, public dialog: MatDialog, fb: FormBuilder ) {
    this.Service.updateFlag('Admin');
    this.titleService.setTitle('Dokumenty');

    this.formModel = fb.group({
      file: [
        '',
        [
          Validators.required,
          this.valid.fileTypeValidator,
          this.valid.fileSizeValidator
        ]
      ]
    });
  }

  displayedColumns: string[] = ['select', 'name', 'surname', 'amount', 'payment1', 'payment2', 'payment3', 'sum', 'stat', 'note'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  displayedColumnsList: string[] = ['select', 'id', 'sum', 'date', 'name', 'surname', 'product'];
  dataSourceList = new MatTableDataSource<PeriodicElementList>(LIST_DATA);
  selectionList = new SelectionModel<PeriodicElementList>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  openDialog(nr?): void {
    console.log(nr);
    this.dialog.open(DocumentsModalComponent, {
      width: '50%'
  });
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
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onSubmit($event) {
    // dostarcz event i konkretny form
    if (this.formModel.valid) {
    } else {
      this.valid.checkForm($event);
    }
  }

  fileEvent($event: Event) {
    const file = (<HTMLInputElement>$event.target).files[0];

    if (file) {
      $('.custom-file-label').text(file.name);
    }
      this.valid.checkInputs($event.target, this.formModel.controls.file.errors);
  }
}

@Component({
  selector: 'app-modal',
  template: '<mat-dialog-content><canvas id="myChart"></canvas></mat-dialog-content>'
})
export class DocumentsModalComponent implements AfterViewInit {

  constructor(
    public dialogRef: MatDialogRef<DocumentsModalComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit () {
    const ctx: HTMLCanvasElement = document.getElementById('myChart') as HTMLCanvasElement;
    const chartUniversity = new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',

        // The data for our dataset
        data: {
          datasets: [{
            data: [12, 19, 3, 5, 2, 30, 21, 2],
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(225, 89, 142, 1)',
              'rgba(185, 79, 152, 1)',
              'rgba(155, 69, 162, 1)',
              'rgba(125, 59, 172, 1)',
              'rgba(95, 49, 182, 1)',
              'rgba(65, 39, 192, 1)',
              'rgba(35, 29, 212, 1)'
            ],
            label: 'Dataset 1'
          }],
          labels: [
            '130 PLN',
            '170 PLN',
            '200 PLN',
            '210 PLN',
            '230 PLN',
            '250 PLN',
            '280 PLN',
            '310 PLN'
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Deklarowane wysokości składek'
            }
        }
      });
  }
}
