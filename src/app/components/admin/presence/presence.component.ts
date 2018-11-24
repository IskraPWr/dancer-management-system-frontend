import { ModalComponent } from './modal';
import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PathService } from './../../service';

import {MatDialog, MatDialogRef} from '@angular/material';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

export interface PeriodicElement {
  name: string;
  surname: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
}

export interface Note {
  name: string;
}

export interface Week {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Grzegorz', surname: 'Kikut', mon: '|', tue: '|', wed: '', thu: '', fri: '', sat: '', sun: '|'}
];


@Component({
  templateUrl: './presence.component.html'
})
export class PresenceComponent implements OnInit {
  constructor(private Service: PathService, private titleService: Title, public dialog: MatDialog) {
    this.Service.updateFlag('Admin');
    this.titleService.setTitle('Obecność');
  }

  displayedColumns: string[] = ['select', 'name', 'surname', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'note'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  weeks: Week[] = [
    {value: 'week-0', viewValue: 'Steak'},
    {value: 'week-1', viewValue: 'Pizza'},
    {value: 'week-2', viewValue: 'Tacos'}
  ];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  notes: Note[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  openDialog(): void {
    this.dialog.open(PresenceModalComponent, {
      width: 'auto'
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
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
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
  templateUrl: 'modal.html',
  providers: [NgbCarouselConfig]
})
export class PresenceModalComponent implements AfterViewInit {

  chart: ModalComponent = new ModalComponent;

  constructor(
    public dialogRef: MatDialogRef<PresenceModalComponent>,
    config: NgbCarouselConfig) {
      config.interval = 0;
    }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit () {
    this.chart.getChart();
  }
}
