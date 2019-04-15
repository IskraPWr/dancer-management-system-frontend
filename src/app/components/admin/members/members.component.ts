import { NoteDataService } from './../main/data.service';
import { NoteModalComponent } from './../main/note-modal.component';
import { Component, ViewChild, AfterViewInit, OnDestroy, DoCheck, TemplateRef, ViewChildren, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MemberModalComponent } from './member-modal.component'

import { PathService } from './../../service';
import { ServerService } from './../../../server/server.service';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { NgbCarouselConfig, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { MembersStatModalComponent } from './members-stat-modal.component';


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

export interface Group {
  value: string;
  viewValue: string;
}

export interface Semester {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './members.component.html',
  styles: ['button[disabled]:hover {color: #FFFFFF; background-color: #EA5616;  border-color: #EA5616;}']
})
export class MembersComponent implements AfterViewInit {
  constructor(
    private server: ServerService,
    private service: PathService,
    private titleService: Title,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private data: NoteDataService
  ) {

    this.service.updateFlag('Admin');
    this.titleService.setTitle('Grupy');
  }

  displayedColumns: string[] = [
    'select',
    'name',
    'surname'
  ];


  dateListColumns: string[] = [
    'email',
    'phone',
    'gender'
  ];

  columnListNames: string[] = [
    'Mail',
    'Telefon',
    'Płeć'
  ];

  noteColumn: string[] = ['note'];

  allColumns: string[];
  activeColumns: string[];
  group = false;
  activeColumnsName: string[];

  selection = new SelectionModel<PeriodicElement>(true, []);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  groups: Group[] = [];
  semesters: Semester[] = [];
  notes: Note[] = [];

  dataSource;
  ELEMENT_DATA;
  lastData;
  isLoadedGroup = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit () {
    this.setActivePeople();
  }


  checkFlag(){
    this.group ?
    this.setActivePeople():
    this.getSemester();
  }

  setActivePeople() {
      this.group = false;
      let activeUsers = this.server.getUsersWithAssignments().subscribe(
        data => {
          this.ELEMENT_DATA = Object.values({ ...data });
          for ( const object of this.ELEMENT_DATA ) {
            const array = [];
              object.notes.forEach(element => {
              array.push({name: element});
            });
            object.notes = array;
            object.length = object.assignments.length;

            let assignmentAsString = '';
            for (const assignment of object.assignments){
              assignmentAsString +=  assignment.semester_name + ' - ' + assignment.group_name + ' ';
            }
            object.assignments = assignmentAsString;
          }
          activeUsers.unsubscribe();
          this.activeColumns = this.dateListColumns;
          this.activeColumnsName = this.columnListNames;
          this.allColumns = this.displayedColumns.concat(this.dateListColumns, Array('groupAttribution'), this.noteColumn).slice();
          this.isLoadedGroup = false;
          this.initiateTable();
        },
        error => console.log(error)
      );
    }

    openDialog(): void {
      let man = 0;
      let woman = 0;
      this.ELEMENT_DATA.forEach(element => {
        element.gender === 1 ? man++ : woman++;
      });

      this.dialog.open(MembersStatModalComponent, {
        width: '60%',
        data: {man: man, woman: woman }
      });
    }

    getSemester() {
      this.group = true;
      let semesterHeaders = this.server.getSemesterHeaders().subscribe(
        data => {
          this.semesters = [];
          for ( const object of data as Array<any>) {
            this.semesters.push({
              value: object.id_semester,
              viewValue: object.name,
            })
          }
          semesterHeaders.unsubscribe();
        },
        error => console.log(error)
      );
    }

  getGroups(data){
    this.groups = [];
    let groupHeaders = this.server.getGroupsHeadersById(data).subscribe(
      data => {
        for ( const object of data as Array<any>) {
          this.groups.push({
            value: object.id,
            viewValue: object.name,
          })
        }
        groupHeaders.unsubscribe();
      },
      error => console.log(error)
    );
  }

  getUsersInGroup(data){
    this.lastData = data;
    let usersInGroup = this.server.getUsersInGroupByIdGroup(data).subscribe(
      data => {
        this.ELEMENT_DATA = Object.values({ ...data });
        const dateGroupColumns = [];
        const columnGroupNames = [];

        if (this.ELEMENT_DATA[0]){
          let i = 0;
          this.ELEMENT_DATA[0].presences.forEach(element => {
          dateGroupColumns.push(i.toString());
          i++;
          columnGroupNames.push(element.date);
        });

        for ( const object of this.ELEMENT_DATA ) {
          let j = 0;
          const array = [];
            object.presences.forEach(element => {
              object[j] = element.value;
              j++;
          });
          object.notes.forEach(element => {
            array.push({name: element});
          });
          object.notes = array;
          delete object.presences;
        }
      }
        this.isLoadedGroup = true;
        usersInGroup.unsubscribe();
        this.activeColumns = dateGroupColumns;
        this.activeColumnsName = columnGroupNames;
        this.allColumns = this.displayedColumns.concat(dateGroupColumns, this.noteColumn).slice();
        this.initiateTable();
      },
      error => console.log(error)
    );
  }

  initiateTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(
      this.ELEMENT_DATA
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

  sendToArchive () {
    if (this.selection.selected.length != 0) {
      const idArray = [];
      this.selection.selected.forEach(user => idArray.push(user.id));
      let server = this.server.updateArchive(encodeURIComponent('id') + "=" + encodeURIComponent(idArray.toString())).subscribe(() => {
        this.selection.clear();

        this.ELEMENT_DATA = [];
        if(!this.group){
          this.setActivePeople();
        }else{
          this.getUsersInGroup(this.lastData);
        }

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

            if(!this.group){
              this.setActivePeople();
            }else{
              this.getUsersInGroup(this.lastData);
            }

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

  addToGroup(){
    if (this.selection.selected.length != 0) {
      let idArray: Array<any> = [];
      this.selection.selected.forEach(user => idArray.push(user.id));
      this.dialog.open(MemberModalComponent);

      const dialog = this.dialog.afterAllClosed.subscribe(() => {

        if(this.data.messageSource.getValue() != 'error404') {

          const server = this.server.addToGroup(this.data.messageSource.getValue(),encodeURIComponent('id') + "=" + encodeURIComponent(idArray.toString())).subscribe(() => {
            this.openSnackBar('Dodanie do grupy', 'Sukces!');
            this.selection.clear();
            this.setActivePeople()
            dialog.unsubscribe();
            server.unsubscribe();
          });
        } else {
          dialog.unsubscribe();
        }
      }, error => console.log(error));

    }else {
      this.openSnackBar('Uwaga', 'Nie wybrano osób!');
    };
  }

  removeFromGroup(){
    if (this.selection.selected.length != 0) {
      let idArray: Array<any> = [];
      this.selection.selected.forEach(user => idArray.push(user.id));

      let server = this.server.removeFromGroup(this.lastData, encodeURIComponent('id') + "=" + encodeURIComponent(idArray.toString())).subscribe(() => {
        this.selection.clear();

        this.ELEMENT_DATA = [];
        this.getUsersInGroup(this.lastData);

        this.openSnackBar('Usuniecie z grupy', 'Sukces!');
        server.unsubscribe();
    },
    error => console.log(error));

    }else {
      this.openSnackBar('Uwaga', 'Nie wybrano osób!');
    };
  }

}
