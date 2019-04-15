import { NoteDataService } from './../../main/data.service';
import { NoteModalComponent } from './../../main/note-modal.component';
import { DocumentsModalComponent } from './../documents.component';

import { Component, ViewChild, AfterViewInit, OnDestroy, Inject } from '@angular/core';


import { ServerService } from './../../../../server/server.service';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material';

export interface Note {
  name: string;
}


export interface PeriodicElement {
  id: number;
  name: string;
  surname: string;
  declaration: number;
  entryFee: string;
  payment1: string;
  payment2: string;
  payment3: string;
  sum: number;
}

export interface Semesters {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-charges-list',
 templateUrl: './chargesList.component.html',
})
export class ChargesListComponent implements AfterViewInit, OnDestroy {

    constructor(
      private server: ServerService,
      public dialog: MatDialog,
      private snackBar: MatSnackBar,
      private data: NoteDataService
    ) {}

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    ELEMENT_DATA;
    dataSource;
    selection = new SelectionModel<PeriodicElement>(true, []);
    semesters = [];
    charges;
    details;
    selected;
    semestersIdArray = [];
    activeSemesterArrayPosition;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = [
      'select',
      'name',
      'surname',
      'declaration',
      'entryFee',
      'payment1',
      'payment2',
      'payment3',
      'sum',
      'stat',
      'note'
    ];

   ngAfterViewInit() {
    this.charges = this.server.getCharges().subscribe(
      data => {

        if (!data[0]){
          return null;
        }

        this.ELEMENT_DATA = Object.values({ ...data });
        for ( const semester of this.ELEMENT_DATA ) {
          for (const object of semester.data) {
            const array = [];
              object.notes.forEach(element => {
              array.push({name: element});
            });
            object.notes = array;
          }
        }
        this.initiateTable('0');
      },
      error => console.log(error)
    );

    this.details = this.server.getSemesterDetails().subscribe(
      data => {
        if (!data[0]){
          return null;
        }
        this.semesters = Object.values({ ...data });
        let i = 0;
        for (const obj of this.semesters) {
          this.semestersIdArray.push(obj.id_semester);
          obj.value = 'semester-' + i;
          obj.viewValue = obj.name;
          delete obj.name;
          i++;
        }
       this.selected = this.semesters[0].value;
      },
      error => console.log(error)
    );
   }

   ngOnDestroy () {
    this.charges.unsubscribe();
    this.details.unsubscribe();
   }

    initiateTable(id) {
      this.activeSemesterArrayPosition = parseInt(id, 10);
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA[this.activeSemesterArrayPosition].data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
        },
        error => console.log(error));
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
        },
        error => console.log(error));
      }
    }

    applyFilter(filterValue: string) {

      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.paginator.firstPage();
      }
    }

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }


    sendToArchive () {
      if (this.selection.selected.length != 0) {
        const idArray = [];
        this.selection.selected.forEach(user => idArray.push(user.id));
        let server = this.server.updateArchive(encodeURIComponent('id') + "=" + encodeURIComponent(idArray.toString())).subscribe(() => {
        this.selection.clear();
        this.ELEMENT_DATA = [];
        this.ngAfterViewInit();

        this.openSnackBar('Przeniesienie do archiwum', 'Sukces!');
        server.unsubscribe();
      },
      error => console.log(error));
      } else {
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

            this.ngAfterViewInit();

            dialog.unsubscribe();
            server.unsubscribe();
            });
          } else {
            dialog.unsubscribe();
          }
        },
        error => console.log(error));
      } else {
        this.openSnackBar('Uwaga', 'Nie wybrano osób!');
      }
    }


    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach(row => this.selection.select(row));
    }

    openDialog(nr?): void {
      const id_semester = this.semestersIdArray[this.activeSemesterArrayPosition];
      this.dialog.open(DocumentsModalComponent, {
        width: '60%',
        data : {id : nr ? nr.id : null, id_semester },
      });
    }
}
