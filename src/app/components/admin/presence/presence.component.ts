import { NoteDataService } from './../main/data.service';
import { NoteModalComponent } from './../main/note-modal.component';
import { ModalComponent } from './modal';
import { Component, ViewChild, AfterViewInit, OnDestroy, DoCheck, TemplateRef, ViewChildren, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PathService } from './../../service';
import { ServerService } from './../../../server/server.service';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { NgbCarouselConfig, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';


export interface PeriodicElement {
  id: any;
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
export class PresenceComponent implements AfterViewInit, OnDestroy {
  constructor(
    private server: ServerService,
    private Service: PathService,
    private titleService: Title,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private data: NoteDataService
  ) {

    this.Service.updateFlag('Admin');
    this.titleService.setTitle('Obecność');
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
  ELEMENT_DATA = [];
  presence;
  firstWeek;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit () {
    this.presence = this.server.getPresence().subscribe(
      data => {
        let arrayData = [];
        arrayData = Object.values({ ...data });
        for (const week of arrayData) {
          this.weeks.push(week['week']);
          this.ELEMENT_DATA.push(week['data']);
          this.firstWeek = this.weeks[0].value;
        }
        for (const weeks of this.ELEMENT_DATA) {
          for ( const week of weeks ) {
            const array = [];
              week.notes.forEach(element => {
              array.push({name: element});
            });
            week.notes = array;
          }
        }
        this.initiateTable(0);
      },
      error => console.log(error)
    );
  }

  ngOnDestroy () {
    this.presence.unsubscribe();
  }

  openDialog(): void {
    this.dialog.open(PresenceModalComponent, {
      width: '80'
    });
  }

  initiateTable(nr) {
    this.dataSource = new MatTableDataSource<PeriodicElement>(
      this.ELEMENT_DATA[nr]
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
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

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  add(event: MatChipInputEvent, element): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      element.notes.push({ name: value.trim() });
      const data = {
        id: element.id,
        note: value
      };
      let formBody = [];
      for (const property in data) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      const note = formBody.join("&");
      const server = this.server.postNote(note).subscribe(() => {
        this.openSnackBar('Dodanie notatki', 'Sukces!');
        server.unsubscribe();
      });
    }

    if (input) {
      input.value = '';
    }

  }

  remove(note: Note, element): void {
    const index = element.notes.indexOf(note);
    const value = note.name;

    if (index >= 0) {
      element.notes.splice(index, 1);
      const data = {
        id: element.id,
        note: value
      };
      let formBody = [];
      for (const property in data) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      const note = formBody.join("&");
      const server = this.server.deleteNote(note).subscribe(() => {
        this.openSnackBar('Usunięcie notatki', 'Sukces!');
        server.unsubscribe();
      });
    }
  }

  sendToArchive () {
    if (this.selection.selected.length != 0) {
      const idArray = [];
      this.selection.selected.forEach(user => idArray.push(user.id));
      let server = this.server.updateArchive(encodeURIComponent('id') + "=" + encodeURIComponent(idArray.toString())).subscribe(() => {
        this.selection.clear();
        this.ELEMENT_DATA = [];
        this.weeks = [];
        this.ngAfterViewInit();
        this.openSnackBar('Przeniesienie do archiwum', 'Sukces!');
        server.unsubscribe();
    });
    }else {
      this.openSnackBar('Uwaga', 'Nie wybrano osób!');
    }
  }

  addNotes () {
    if (this.selection.selected.length != 0) {
      let idArray: Array<any> = [];
      this.selection.selected.forEach(user => idArray.push(user.id));

      this.dialog.open(NoteModalComponent);

      const dialog = this.dialog.afterAllClosed.subscribe(() => {

        if(this.data.messageSource.getValue() != 'error404') {

          const data = {
            id: idArray,
            note: this.data.messageSource.getValue()
          };

          let formBody = [];
          for (const property in data) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          const note = formBody.join("&");

          const server = this.server.postNotes(note).subscribe(() => {
            this.openSnackBar('Dodanie notatek', 'Sukces!');
            this.selection.clear();
            this.ELEMENT_DATA = [];
            this.weeks = [];
            this.ngAfterViewInit();
            dialog.unsubscribe();
            server.unsubscribe();
          });
        } else {
          dialog.unsubscribe();
        }
      });
    }else {
      this.openSnackBar('Uwaga', 'Nie wybrano osób!');
    }
  }
}

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.html',
  providers: [NgbCarouselConfig]
})

export class PresenceModalComponent implements AfterViewInit, OnDestroy, DoCheck {
  chart: ModalComponent = new ModalComponent();
  statPeople;
  semesters: Week[] = [];
  groups = [];
  numberOfGroups = [];
  first = true;
  second = false;
  third = false;
  value;
  selected;
  activeData;
  gridClass = 'col-12 col-xl-4  btmspace-30';
  spinnerClass = ['spinner-box'];

  // progress spinner
  color = 'primary';
  mode = 'indeterminate';
  val = 50;


  constructor(
    public dialogRef: MatDialogRef<PresenceModalComponent>,
    config: NgbCarouselConfig,
    private snackBar: MatSnackBar,
    private server: ServerService
  ) {
    config.interval = 0;
  }


  resizeCanvas () {
    setTimeout (() => {
      for (let i = 12; i < this.chart.chart.length; i++) {
        this.chart.chart[i].resize();
       }
    }, 200);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngAfterViewInit() {
    this.statPeople = this.server.getStatPeople().subscribe((data) => {

      if(data === null){
        this.openSnackBar('Uwaga', 'Brak danych do wyświetlenia!');
        return null;
      }

      this.value = Object.values({...data});
      this.setCanvas();
    }, error => {
      console.log(error);
      this.first = false;
    });
  }

  ngOnDestroy () {
    this.statPeople.unsubscribe();
  }

  setCanvas () {
    let k = 0;
    for (const semester of this.value[4].data) {
      this.semesters.push({
          value: k.toString(),
          viewValue: semester.name,
      });
      this.numberOfGroups[k] = this.value[4].data[k].data[0].groups.length;
      k++;
    }
    this.selected = this.semesters[0].value;
    this.activeData = '0';

    for (let i = 0; i < this.numberOfGroups[0]; i++) {
      this.groups.push({
        id: 'chartGroup' + i,
      });
    }
    this.setGridClass();
  }

  prepareField(nr: string) {
    this.spinnerClass = ['spinner-box'];
    for (let i = 5; i < this.chart.chart.length; i++) {
      this.chart.chart[i].destroy();
    }
    this.groups = [];
    this.activeData = nr;
    this.third = true;
  }

  setDataDynamic(nr) {
    const index = parseInt(nr, 10);
    for (const week of this.value[4].data[index].data) {
      const buffer = week.days.shift();
      week.days.push(buffer);
      for (let j = 0; j < week.days.length; j++) {
        this.chart.chart[j + 5].config.data.datasets[0].data.push(week.days[j].man);
        this.chart.chart[j + 5].config.data.datasets[1].data.push(week.days[j].woman);
        this.chart.chart[j + 5].config.data.labels.push(week.days[j].date);
      }
      for (let j = 0; j < week.groups.length; j++) {
        this.chart.chart[j + 12].config.data.datasets[0].data.push(week.groups[j].man);
        this.chart.chart[j + 12].config.data.datasets[1].data.push(week.groups[j].woman);
        j + 1 === week.groups.length
          ? this.chart.chart[j + 12].config.data.labels.push(week.week)
          : this.chart.chart[j + 12].config.data.labels.push(week.groups[j].date);
      }
    }
    for (let i = 5; i < this.chart.chart.length; i++) {
      this.chart.chart[i].update();
    }
    let m = 0;
    for (let i = 12; i < this.chart.chart.length; i++, m++) {
      this.chart.chart[i].config.options.title.text = this.value[4].data[index].data[0].groups[m].name;
    }
  }

  setGridClass () {
    if (this.numberOfGroups[parseInt(this.activeData, 10)] === 1) {
      this.gridClass = 'col-12 col-xl-12  btmspace-30';
    } else if (this.numberOfGroups[parseInt(this.activeData, 10)] === 2) {
      this.gridClass = 'col-12 col-xl-6  btmspace-30';
    } else {
      this.gridClass = 'col-12 col-xl-4  btmspace-30';
    }
  }

  setDataFirst () {
    for (let i = 0; i < 4; i++) {
      const buffer = this.value[i].data.shift();
      this.value[i].data.push(buffer);
      for (const day of this.value[i].data) {
        this.chart.chart[i].config.data.datasets[0].data.push(day.man);
        this.chart.chart[i].config.data.datasets[1].data.push(day.woman);
      }
      this.chart.chart[i].update();
    }
    for (const week of this.value[5].data) {
      this.chart.chart[4].config.data.datasets[0].data.push(week.man);
      this.chart.chart[4].config.data.datasets[1].data.push(week.woman);
      this.chart.chart[4].config.data.labels.push(week.week);
    }
    this.chart.chart[4].update();
  }

  ngDoCheck(): void {
    if (this.first === true ) {
      if (document.getElementById('chartGroup0') !== null) {
        this.first = false;
        this.chart.getChartStatic();
        this.chart.getChartDynamic(this.numberOfGroups[0]);
        this.setDataFirst();
        this.setDataDynamic('0');
        this.spinnerClass = ['spinner-box', 'hidden'];
      }
    }

    if (this.second === true ) {
      if (document.getElementById('chartGroup0') !== null) {
        this.second = false;
        this.chart.getChartDynamic(this.numberOfGroups[parseInt(this.activeData, 10)]);
        this.setGridClass();
        this.setDataDynamic(this.activeData);
        this.dialogRef.updateSize('80%', 'auto');
        setTimeout (() => {
          for (let i = 12; i < this.chart.chart.length; i++) {
            this.chart.chart[i].resize();
           }
        }, 200);
        this.spinnerClass = ['spinner-box', 'hidden'];

      }
    }

    if (this.third === true ) {
      if (document.getElementById('chartGroup0') === null) {
        this.third = false;
        for (let i = 0; i < this.numberOfGroups[parseInt(this.activeData, 10)]; i++) {
          this.groups.push({
            id: 'chartGroup' + i,
          });
        }
        this.chart.chart = this.chart.chart.slice(0, 5);
        this.chart.ctx = this.chart.ctx.slice(0, 5);
        this.second = true;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
