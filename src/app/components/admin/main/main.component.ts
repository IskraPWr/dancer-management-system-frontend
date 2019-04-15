import { NoteDataService } from './data.service';
import { Title } from '@angular/platform-browser';
import { NoteModalComponent } from './note-modal.component';
import { MainModalComponent } from './main-modal.component'

import { PathService } from './../../service';
import { ServerService } from './../../../server/server.service';

import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { MatDialog, MatPaginator, MatTableDataSource, MatSort, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


export interface PeriodicElement {
  id: number;
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
export class MainComponent implements AfterViewInit, OnDestroy {
   constructor(
    private server: ServerService,
    private Service: PathService,
    private titleService: Title,
    public dialog: MatDialog,
    private data: NoteDataService,
    private snackBar: MatSnackBar
  ) {
    this.Service.updateFlag('Admin');
    this.titleService.setTitle('Przegląd osób');
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  notes: Note[] = [];
  ELEMENT_DATA;
  users;

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
  modalNote: string;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngAfterViewInit () {
    this.users =   this.server.getUsers().subscribe((data) => {
      this.ELEMENT_DATA = Object.values({...data});
      for ( const object of this.ELEMENT_DATA ) {
        const array = [];
          object.notes.forEach(element => {
          array.push({name: element});
        });
        object.notes = array;
      }
      this.initiateTable();
    }, error => console.log(error));
  }

  ngOnDestroy () {
    this.users.unsubscribe();
  }

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
            this.ngAfterViewInit();
            dialog.unsubscribe();
            server.unsubscribe();
          });
        } else {
          dialog.unsubscribe();
        }
      }, error => console.log(error));
    } else {
      this.openSnackBar('Uwaga', 'Nie wybrano osób!');
    }
  }
}



