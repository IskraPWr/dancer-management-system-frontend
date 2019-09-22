import { LoginTokenService } from './../../../items/login-token-servise/login-token.service';
import { HttpErrorResponse } from '@angular/common/http';
import {  Component, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

import { PathService } from '../../../items/path-service';
import { ServerService } from '../../../server/server.service';
import { PresenceModalComponent } from '../presence-modal/presence-modal.component';
import { IUserPresence } from 'src/app/typings/typings';

@Component({
  templateUrl: './presence.component.html'
})
export class PresenceComponent {
  constructor(
    private service: PathService,
    private titleService: Title,
    private dialog: MatDialog,
    private server: ServerService,
    private snackBar: MatSnackBar,
    private tokenService: LoginTokenService
  ) {
    this.service.updatePath('Konto');
    this.titleService.setTitle('Obecność');

    this.server.getPresenceById(this.tokenService.token.id).toPromise().then((data: IUserPresence[]) => {
      this.presence = new MatTableDataSource<IUserPresence> (data);
      this.presence.paginator = this.paginator;
      this.presence.sort = this.sort;
      this.presenceColumns = data[0] ? Object.keys(data[0]) : [];

    }).catch((err: HttpErrorResponse) => {
      this.snackBar.open('Błąd!', 'Nie udało się pobrać danych', {
        duration: 2000
      });
    })
  }

  presence: MatTableDataSource<IUserPresence>;
  presenceColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  applyFilter(filterValue: string): void {
    this.presence.filter = filterValue.trim().toLowerCase();

    if (this.presence.paginator) {
      this.presence.paginator.firstPage();
    }
  }

  openDialog(): void {
    this.dialog.open(PresenceModalComponent);
  }
}

