import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import * as Chart from 'chart.js';
import { Valid } from '../../validators/validators';
import {MAT_DIALOG_DATA} from '@angular/material';

import { ServerService } from './../../../server/server.service';
import { PathService } from './../../service';
import {RandomColor} from '../../items/colorGenerator/colorGenerator';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';


import * as $ from 'jquery';

export interface PeriodicElement {
  name: string;
  surname: string;
  amount: number;
  payment1: string;
  payment2: string;
  payment3: string;
  entryFee: string;
  sum: number;
}

export interface PeriodicElementList {
  id: number;
  id_sys: number;
  name: string;
  product_name: string;
  price: string;
  quantiti: number;
  value: string;
}

export interface Note {
  name: string;
}

@Component({
  templateUrl: './documents.component.html'
})
export class DocumentsComponent {
  formModel: FormGroup;
  valid = new Valid();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  notes: Note[] = [];
  ELEMENT_DATA;
  dataSource;
  LIST_DATA;
  dataSourceList;

  constructor(
    private server: ServerService,
    private Service: PathService,
    private titleService: Title,
    public dialog: MatDialog,
    fb: FormBuilder
  ) {
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

    this.server.getCharges().subscribe(
      data => {
        this.ELEMENT_DATA = Object.values({ ...data });
        this.ELEMENT_DATA = Object.values({...data});
        this.initiateTable();
      },
      error => console.log(error)
    );

    this.server.getList().subscribe(
      data => {
        this.LIST_DATA = Object.values({ ...data });
        this.LIST_DATA = Object.values({...data});
        this.initiateTableList();
      },
      error => console.log(error)
    );
  }

  displayedColumns: string[] = [
    'select',
    'name',
    'surname',
    'amount',
    'entryFee',
    'payment1',
    'payment2',
    'payment3',
    'sum',
    'stat',
    'note'
  ];

  selection = new SelectionModel<PeriodicElement>(true, []);

  displayedColumnsList: string[] = [
    'select',
    'id_sys',
    'name',
    'product_name',
    'price',
    'quantiti',
    'value'
  ];

  selectionList = new SelectionModel<PeriodicElementList>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  initiateTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initiateTableList() {
    this.dataSourceList = new MatTableDataSource<PeriodicElementList>(this.LIST_DATA);
  }

  openDialog(nr?): void {
    this.dialog.open(DocumentsModalComponent, {
      width: '50%',
      data : {id : nr ? nr.id : null},
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.notes.push({ name: value.trim() });
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
  template:
    '<mat-dialog-content><canvas id="myChart"></canvas></mat-dialog-content>'
})
export class DocumentsModalComponent implements AfterViewInit {
  constructor(public dialogRef: MatDialogRef<DocumentsModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
   private server: ServerService) {

    if (this.data.id !== null) {
      this.server.getPresenceById(this.data.id).subscribe((dat) => {
        const value = Object.values({...dat});
        this.setModalPresence(value);
      }, error => console.log(error));
    } else {
      this.server.getStatCharges().subscribe((dat) => {
        const value = Object.values({...dat});
        this.setModal(value);
      }, error => console.log(error));
    }
   }

   color = new RandomColor;
   chart;
   ctx: HTMLCanvasElement;

  setModalPresence(value) {
    this.chart = new Chart(this.ctx, {
      type: 'doughnut',

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
        legend: {
          display: true,
        },
        responsive: true,
        title: {
          display: true,
          text: 'Ilość wizyt na zajęciach w tym semestrze'
          }
      }
    });

    this.chart.config.data.datasets[0].data = Object.values(value[0]);
    // tslint:disable-next-line:forin
    for (const ele in value[0]) {
      this.chart.config.data.datasets[0].backgroundColor.push(this.color.getRandomColor());
    }
    this.chart.update();

  }

   setModal (value) {
    this.chart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [],
            backgroundColor: [
            ],
            label: 'Dataset 1'
          }
        ],
        labels: [
          '1 blok',
          '2 bloki',
          '3 bloki',
          '4 bloki',
          '5 bloków',
          '6 bloków',
          'BO'
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

    this.chart.config.data.datasets[0].data = Object.values(value[0]);
    // tslint:disable-next-line:forin
    for (const ele in value[0]) {
      this.chart.config.data.datasets[0].backgroundColor.push(this.color.getRandomColor());
    }
    this.chart.update();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.ctx = document.getElementById(
      'myChart'
    ) as HTMLCanvasElement;
  }
}
