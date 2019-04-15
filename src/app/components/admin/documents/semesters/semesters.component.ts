import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, TooltipPosition } from '@angular/material';

import { ServerService } from './../../../../server/server.service';
import { ConfirmationModalComponent } from './../../archives/confirmation-archives.component';
import { NoteDataService } from './../../main/data.service';
import { SemesterModalComponent } from './semester-modal.component';


export interface Note {
  name: string;
}

export interface PeriodicElement {
  id_semester : number;
  name: string;
  start: Date;
  date_1: Date;
  date_2: Date;
  date_3: Date;
  end: Date;
  click: Array<boolean>;
}


@Component({
  selector: 'app-semester-list',
 templateUrl: './semesters.component.html',
 encapsulation: ViewEncapsulation.None,
 styleUrls: ['./semesters.component.css']
})
export class SemestersComponent implements AfterViewInit, OnDestroy {
  constructor(
    private server: ServerService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private data: NoteDataService,
  ) {
  }



   positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
   position = new FormControl(this.positionOptions[3]);
   position2 = new FormControl(this.positionOptions[0]);

    visible = true;
    click = [true, true, true, true, true];
    selectable = true;
    removable = true;
    addOnBlur = true;
    ELEMENT_DATA;
    dataSource;
    selection = new SelectionModel<PeriodicElement>(true, []);
    semesters;

    message = 'podane semestry z bazy? Razem z nimi zostaną usunięte wszystkie grupy przypisane do tych semestrów jak również wszystkie logi wejść każdej z grup co spowoduje utrate ważnych statystyk.';



    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('name', {read: NgModel}) name: NgModel;
    @ViewChild('start', {read: NgModel}) start: NgModel;
    @ViewChild('date_1', {read: NgModel}) date_1: NgModel;
    @ViewChild('date_2', {read: NgModel}) date_2: NgModel;
    @ViewChild('date_3', {read: NgModel}) date_3: NgModel;
    @ViewChild('end', {read: NgModel}) end: NgModel;

    displayedColumns: string[] = [
      'select',
      'name',
      'start',
      'date_1',
      'date_2',
      'date_3',
      'end'
    ];


    ngAfterViewInit() {
     this.semesters = this.server.getSemesters().subscribe(
        data => {
          this.ELEMENT_DATA = Object.values({ ...data });
          for (let i = 0; i <  Object.values(this.ELEMENT_DATA).length; i++ ) {
            this.ELEMENT_DATA[i].click = [];
            this.ELEMENT_DATA[i].start = new Date(this.ELEMENT_DATA[i].start);
            this.ELEMENT_DATA[i].date_1 = new Date(this.ELEMENT_DATA[i].date_1);
            this.ELEMENT_DATA[i].date_2 = new Date(this.ELEMENT_DATA[i].date_2);
            this.ELEMENT_DATA[i].date_3 = new Date(this.ELEMENT_DATA[i].date_3);
            this.ELEMENT_DATA[i].end = new Date(this.ELEMENT_DATA[i].end);
            for (let j = 0; j < 6; j++) {
              this.ELEMENT_DATA[i].click.push(false);
            }
          }
          this.initiateTable();
        },
        error => console.log(error)
      );
    }

    ngOnDestroy (){
      this.semesters.unsubscribe();
    }

    checkData(first, second){
      return first < second ? false : true ;
    }


    initiateTable() {
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    save(keyCode, el, element, name, nr){
      if(keyCode === 13 && element.valid){

        const data = {
          id: el.idSemester,
          name: name,
          value: element.value,
        };
        let formBody = [];
        for (const property in data) {
          const encodedKey = encodeURIComponent(property);
          const encodedValue = encodeURIComponent(data[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        const message = formBody.join("&");

        const server = this.server.updateDate(message).subscribe(() => {
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

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
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

    removeSemesters(){
      if (this.selection.selected.length != 0) {


        this.dialog.open(ConfirmationModalComponent, {
          data : {thingToRemoved : this.message },
        });

        const dialog = this.dialog.afterAllClosed.subscribe(() => {

          if(this.data.messageSource.getValue() != 'error404') {

            let idArray: Array<any> = [];
            this.selection.selected.forEach(semester => idArray.push(semester.id_semester));

            let server = this.server.deleteSemesters(encodeURIComponent('id') + "=" + encodeURIComponent(idArray.toString())).subscribe(() => {
              this.selection.clear();
              this.ELEMENT_DATA = [];
              this.ngAfterViewInit();

              this.openSnackBar('Usunięcie użytkownika', 'Sukces!');
              server.unsubscribe();
              dialog.unsubscribe();
            },
            () => this.openSnackBar('Usunięcie użytkownika', 'Błąd!'));
          } else {
            dialog.unsubscribe();
          }
        }, error => console.log(error));
      } else {
        this.openSnackBar('Uwaga', 'Nie wybrano semestrów!');
      }
    }


    addSemester(){
        this.dialog.open(SemesterModalComponent, {
          width: '50%'
        });

        const dialog = this.dialog.afterAllClosed.subscribe(() => {

          if(this.data.messageSource.getValue() != 'error404') {

            const data = JSON.parse(this.data.messageSource.getValue());

            let formBody = [];
            for (const property in data) {
              const encodedKey = encodeURIComponent(property);
              const encodedValue = encodeURIComponent(data[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            const message = formBody.join("&");

            const server = this.server.addSemester(message).subscribe(() => {
              this.openSnackBar('Dodanie nowego semestru', 'Sukces!');
              this.selection.clear();
              this.ngAfterViewInit();
              dialog.unsubscribe();
              server.unsubscribe();
            }, () =>{
              this.openSnackBar('Dodanie nowego semestru', 'Błąd!');
            });
          } else {
            dialog.unsubscribe();
          }
        }, error => console.log(error));
    }

    applyFilter(filterValue: string) {

      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.paginator.firstPage();
      }
    }

}
