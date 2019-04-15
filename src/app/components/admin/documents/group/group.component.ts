import { GroupModalComponent } from './group-modal.component';
import { ConfirmationModalComponent } from './../../archives/confirmation-archives.component';
import { DocumentsModalComponent } from './../documents.component';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  OnDestroy,
  Inject
} from '@angular/core';
import * as Chart from 'chart.js';
import { Valid } from '../../../validators/validators';
import {
  MAT_DIALOG_DATA,
  MatCalendarHeader,
  MatDatepicker,
  MatDatepickerInput,
  matDatepickerAnimations,
  MatDatepickerToggle,
  MatInput
} from '@angular/material';

import { ServerService } from './../../../../server/server.service';
import { PathService } from './../../../service';
import { RandomColor } from '../../../items/colorGenerator/colorGenerator';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material';
import { NoteDataService } from '../../main/data.service';

export interface Semesters {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  id: number;
  name: string;
  day: string;
  start: Date;
  end: Date;
  click: Array<boolean>;
}

@Component({
  selector: 'app-group-list',
  templateUrl: './group.component.html',
  encapsulation: ViewEncapsulation.None
})
export class GroupComponent implements AfterViewInit, OnDestroy {
  constructor(
    private server: ServerService,
    public dialog: MatDialog,
    private data: NoteDataService,
    private snackBar: MatSnackBar
  ) {}

  time = new FormControl(new Date().getTime());
  serializedDate = new FormControl(new Date().toISOString());

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[3]);
  position2 = new FormControl(this.positionOptions[0]);
  semesters = [];

  selected;
  visible = true;
  click = [true, true, true, true, true];
  selectable = true;
  removable = true;
  addOnBlur = true;
  ELEMENT_DATA;
  dataSource;
  selection = new SelectionModel<PeriodicElement>(true, []);
  semester;
  groups;

  message =
    'podane grupy z bazy? Razem z nimi zostaną usunięte wszystkie logi wejść każdej z grup co spowoduje utrate ważnych statystyk.';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['select', 'name', 'day', 'start', 'end'];

  days = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota'
  ];

  ngAfterViewInit() {
    this.groups = this.server.getGroups().subscribe(
      data => {
        if (!data[0]) {
          return null;
        }

        this.ELEMENT_DATA = Object.values({ ...data });
        for (let i = 0; i < Object.values(this.ELEMENT_DATA).length; i++) {
          for (
            let k = 0;
            k < Object.values(this.ELEMENT_DATA[i].data).length;
            k++
          ) {
            this.ELEMENT_DATA[i].data[k].click = [];
            for (let j = 0; j < 4; j++) {
              this.ELEMENT_DATA[i].data[k].click.push(false);
            }
          }
        }
        this.initiateTable(0);
      },
      error => console.log(error)
    );

    this.semester = this.server.getSemesterHeaders().subscribe(
      data => {
        if (!data[0]) {
          return null;
        }

        this.semesters = Object.values({ ...data });
        let i = 0;
        for (const obj of this.semesters) {
          obj.value = 'semester-' + i;
          obj.viewValue = obj.name;
          delete obj.id_semester;
          delete obj.name;
          i++;
        }
        this.selected = this.semesters[0].value;
      },
      error => console.log(error)
    );
  }

  save(keyCode, el, element, name, nr){
    if((keyCode === 13 && element.valid) || (keyCode === 96 && name === 'day')){

      const data = {
        id: el.id,
        name: name,
        value: element.value,
      };
      let formBody = [];
      for (const property in data) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      const message = formBody.join('&');

      const server = this.server.updateGroup(message).subscribe(() => {
        if(name === 'name'){
          this.openSnackBar('Zmiana nazwy', 'Sukces!');
        }else {
          this.openSnackBar('Zmiana daty', 'Sukces!');
        }
        el.click[nr] = false;
        server.unsubscribe();
      },  () =>  this.openSnackBar('Uwaga', 'Błąd!'));
    }
  }

  ngOnDestroy() {
    this.groups.unsubscribe();
    this.semester.unsubscribe();
  }

  initiateTable(semester) {
    this.dataSource = new MatTableDataSource<PeriodicElement>(
      this.ELEMENT_DATA[semester].data
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  removeGroups() {
    if (this.selection.selected.length != 0) {
      this.dialog.open(ConfirmationModalComponent, {
        data: { thingToRemoved: this.message }
      });

      const dialog = this.dialog.afterAllClosed.subscribe(
        () => {
          if (this.data.messageSource.getValue() != 'error404') {
            let idArray: Array<any> = [];
            this.selection.selected.forEach(group =>
              idArray.push(group.id)
            );

            let server = this.server
              .deleteGroups(
                encodeURIComponent('id') +
                  '=' +
                  encodeURIComponent(idArray.toString())
              )
              .subscribe(
                () => {
                  this.selection.clear();
                  this.ELEMENT_DATA = [];
                  this.ngAfterViewInit();

                  this.openSnackBar('Usunięcie grupy', 'Sukces!');
                  server.unsubscribe();
                  dialog.unsubscribe();
                },
                () => this.openSnackBar('Usunięcie grupy', 'Błąd!')
              );
          } else {
            dialog.unsubscribe();
          }
        },
        error => console.log(error)
      );
    } else {
      this.openSnackBar('Uwaga', 'Nie wybrano grup!');
    }
  }

  addGroup() {
    this.dialog.open(GroupModalComponent, {
      width: '50%'
    });

    const dialog = this.dialog.afterAllClosed.subscribe(() => {

      if(this.data.messageSource.getValue() != 'error404') {

        const data = JSON.parse(this.data.messageSource.getValue());

        let formBody = [];
        for (const property in data) {
          const encodedKey = encodeURIComponent(property);
          const encodedValue = encodeURIComponent(data[property]);
          formBody.push(encodedKey + '=' + encodedValue);
        }
        const message = formBody.join('&');

        const server = this.server.addGroup(message).subscribe(() => {
          this.openSnackBar('Dodanie nowej grupy', 'Sukces!');
          this.selection.clear();
          this.ngAfterViewInit();
          dialog.unsubscribe();
          server.unsubscribe();
        }, () =>{
          this.openSnackBar('Dodanie nowej grupy', 'Błąd!');
        });
      } else {
        dialog.unsubscribe();
      }
    }, error => console.log(error));
}

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.paginator.firstPage();
    }
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
}
