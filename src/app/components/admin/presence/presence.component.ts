import { ModalComponent } from './modal';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PathService } from './../../service';
import { ServerService } from './../../../server/server.service';

import { MatDialog, MatDialogRef } from '@angular/material';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

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

@Component({
  templateUrl: './presence.component.html'
})
export class PresenceComponent {
  constructor(
    private server: ServerService,
    private Service: PathService,
    private titleService: Title,
    public dialog: MatDialog
  ) {
    this.Service.updateFlag('Admin');
    this.titleService.setTitle('Obecność');
    this.server.getPresence().subscribe(
      data => {
        this.ELEMENT_DATA = Object.values({ ...data });
        this.weeks.push(this.ELEMENT_DATA[0]['week']);
        this.ELEMENT_DATA = this.ELEMENT_DATA[0]['data'];
        this.initiateTable();
      },
      error => console.log(error)
    );
  }

  displayedColumns: string[] = [
    'select',
    'name',
    'surname',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
    'sun',
    'note'
  ];
  selection = new SelectionModel<PeriodicElement>(true, []);
  weeks: Week[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  dataSource;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  notes: Note[] = [];
  ELEMENT_DATA;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  openDialog(): void {
    this.dialog.open(PresenceModalComponent, {
      width: 'auto'
    });
  }

  initiateTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(
      this.ELEMENT_DATA
    );
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
}

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.html',
  providers: [NgbCarouselConfig]
})
export class PresenceModalComponent implements AfterViewInit {
  chart: ModalComponent = new ModalComponent();

  constructor(
    public dialogRef: MatDialogRef<PresenceModalComponent>,
    config: NgbCarouselConfig,
    private server: ServerService
  ) {
    this.server.getStatPeople().subscribe((data) => {
      const value = Object.values({...data});
      this.setPeople(value[0]);
    }, error => console.log(error));
    config.interval = 0;
  }

  setPeople (value) {
   let i = 0;
   const array = this.chart.getNamelist();
   // tslint:disable-next-line:forin
   for (const elem in value) {
      // tslint:disable-next-line:forin
      for (const el in value[elem].men[0]) {
        this.chart[array[i]].config.data.datasets[0].data.push(value[elem].men[0][el]);
      }
      // tslint:disable-next-line:forin
      for (const el in value[elem].women[0]) {
        this.chart[array[i]].config.data.datasets[1].data.push(value[elem].women[0][el]);
      }
    this.chart[array[i]].update();
    i++;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.chart.getChart();
  }
}
