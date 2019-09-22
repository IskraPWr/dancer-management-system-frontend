import { HttpErrorResponse } from '@angular/common/http';
import {
  ISelectOptions,
  IGroupDetails,
  ISemesterHeader,
  IGroupPack,
  IGroupChangeValuePack,
  TConfirmationType,
  IGroupChangeDataPack
} from 'src/app/typings/typings';
import { GroupModalComponent } from './../group-modal/group-modal.component';
import {
  Component,
  ViewChild,
  ViewEncapsulation,
  ElementRef
} from '@angular/core';

import { MatDialog, MatSnackBar, MatSelectChange } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { NgModel } from '@angular/forms';
import { ServerService } from 'src/app/components/server/server.service';
import { ConfirmationModalComponent } from '../../../../confirmation/confirmation-modal.component';

export const days = [
  { name: 'Poniedziałek', value: 1 },
  { name: 'Wtorek', value: 2 },
  { name: 'Środa', value: 3 },
  { name: 'Czwartek', value: 4 },
  { name: 'Piątek', value: 5 },
  { name: 'Sobota', value: 6 },
  { name: 'Niedziela', value: 0 }
];

@Component({
  selector: 'app-group-list',
  templateUrl: './group.component.html',
  encapsulation: ViewEncapsulation.None
})
export class GroupComponent {
  constructor(
    private server: ServerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.days = days;
    this.getGroup();
  }

  semesters: ISelectOptions[];
  selection = new SelectionModel<IGroupDetails>(true);
  groups: MatTableDataSource<IGroupDetails>;

  groupsData: IGroupPack[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') search: ElementRef<HTMLInputElement>;
  @ViewChild('end') end: NgModel;

  displayedColumns: string[] = ['select', 'name', 'day', 'start', 'end'];
  days: any;

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  onReloadSemesterEvent(event: boolean) {
    if (event === true) {
      this.selection.clear();
      this.getGroup();
    }
  }

  getDay(index: number): string {
    return this.days.find(day => day.value === index).name;
  }

  getGroup(): void {
    this.server
      .getGroups()
      .toPromise()
      .then((semesters: IGroupPack[]) => {
        this.groupsData = semesters;

        this.semesters = semesters.map(
          (semester: ISemesterHeader, index: number) => {
            return {
              value: index.toString(),
              viewValue: semester.name
            } as ISelectOptions;
          }
        );

        this.groupsData.forEach((semester: IGroupPack) => {
          semester.groups.forEach((group: IGroupDetails) => {
            group.isActiveInput = new Array(4).fill(false);
          });
        });

        this.groups = new MatTableDataSource<IGroupDetails>(
          this.groupsData[0].groups
        );
        this.groups.paginator = this.paginator;
        this.groups.sort = this.sort;
      })
      .catch((err: HttpErrorResponse) => {
        this.openSnackBar('Błąd!', 'Nie udało się pobrać danych');
      });
  }

  setSemester(value: MatSelectChange): void {
    const index: number = parseInt(value.value, 10);
    this.search.nativeElement.value = '';

    this.groups = new MatTableDataSource<IGroupDetails>(
      this.groupsData[index].groups
    );
    this.groups.paginator = this.paginator;
    this.groups.sort = this.sort;
  }

  save(
    time: NgModel,
    fieldName: string,
    group: IGroupDetails,
    index: number,
    keyCode?: number
  ): void {
    if (
      ((keyCode ? keyCode === 13 : true ) && time.valid) ||
      (keyCode === 96 && fieldName === 'day')
    ) {
      const updateGroupInfoPack: IGroupChangeValuePack = {
        id: group.id,
        field: fieldName,
        value: time.value
      };

      this.server
        .updateGroup(updateGroupInfoPack)
        .toPromise()
        .then(() => {
          switch (fieldName) {
            case 'day':
              this.openSnackBar(
                'Sukces!',
                'Zmiana dnia przeprowadzona pomyślnie'
              );
              break;
            case 'name':
              this.openSnackBar(
                'Sukces!',
                'Zmiana nazwy przeprowadzona pomyślnie'
              );
              break;
            default:
              this.openSnackBar(
                'Sukces!',
                'Zmiana godziny przeprowadzona pomyślnie'
              );
          }

          group.isActiveInput[index] = false;
        })
        .catch((err: HttpErrorResponse) => {
          this.openSnackBar('Błąd!', 'Nie udało się zmienić danych');
        });
    }
  }

  removeGroups(): void {
    if (this.selection.selected.length !== 0) {
      const groupsIds: number[] = [];
      this.selection.selected.forEach(group => groupsIds.push(group.id));

      this.dialog
        .open(ConfirmationModalComponent, {
          data: { confirmationType: 'group-delete' as TConfirmationType }
        })
        .afterClosed()
        .toPromise()
        .then((isConfirm: boolean) => {
          if (!isConfirm) {
            throw new Error('nodata');
          }
          const dataPack: IGroupChangeDataPack = {
            ids: groupsIds
          };

          return this.server.deleteGroups(dataPack).toPromise();
        })
        .then(() => {
          this.selection.clear();

          const newData: IGroupDetails[] = this.groups.data;
          groupsIds.forEach((id: number) => {
            newData.splice(
              newData.indexOf(
                newData.find((group: IGroupDetails) => {
                  return group.id === id;
                })
              ),
              1
            );
          });
          this.groups.data = newData;
          this.openSnackBar('Sukces!', 'Dane grup prawidłowo usunięte');
        })
        .catch((err: HttpErrorResponse | Error) => {
          err.message === 'nodata'
            ? null
            : this.openSnackBar('Błąd!', 'Nie udało się usunąć grup');
        });
    } else {
      this.openSnackBar('Uwaga!', 'Nie wybrano grup!');
    }
  }

  checkTime(startValue: string, endValue: string): boolean {

  const end = endValue.split(':');
  const endMin = end[1];
  const endHour = end[0];

  const start = startValue.split(':');
  const startMin = start[1];
  const startHour = start[0];

  if (startHour < endHour) {
    return false;
  }

  if (startHour === endHour) {
    if (startMin < endMin) {
      return false;
    }
  }

  return true;
  }

  addGroup(): void {
    this.dialog
      .open(GroupModalComponent, {
        data: days
      })
      .afterClosed()
      .toPromise()
      .then((newGroup: IGroupDetails) => {
        if (!newGroup) {
          throw new Error('nodata');
        }
        return this.server.addGroup(newGroup).toPromise();
      })
      .then(() => {
        this.openSnackBar('Sukces!', 'Dodanie nowej grupy powiodło się');
        this.selection.clear();
        this.getGroup();
      })
      .catch((err: HttpErrorResponse | Error) => {
        err.message === 'nodata'
          ? null
          : this.openSnackBar('Błąd!', 'Nie udało się dodać grupy');
      });
  }

  /*const dialog = this.dialog.afterAllClosed.subscribe(() => {

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
*/

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.groups.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.groups.filter = filterValue.trim().toLowerCase();

    if (this.groups.paginator) {
      this.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.groups.data.length;
    return numSelected === numRows;
  }
}
