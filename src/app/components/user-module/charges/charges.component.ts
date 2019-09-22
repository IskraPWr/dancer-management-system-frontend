import { LoginTokenService } from './../../items/login-token-servise/login-token.service';
import { IChargesUserData, ISemester, IChargesUser, IChargesUserSetData } from './../../../typings/typings.d';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from '../../server/server.service';
import { PathService } from '../../items/path-service';
import { MatSnackBar, MatOption } from '@angular/material';

@Component({
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.css']
})
export class ChangesComponent {
  constructor(
    private Service: PathService,
    private titleService: Title,
    private snackBar: MatSnackBar,
    private server: ServerService,
    private tokenService: LoginTokenService
  ) {
    this.Service.updatePath('Konto');
    this.titleService.setTitle('Dane');

    this.isChangeActive = false;
    this.optionSelected  = 0;

    this.server
      .getChargesById(this.tokenService.token.id)
      .toPromise()
      .then((data: IChargesUserData) => {
        this.blocks = data.dues;
        this.semester = data.semester;
        this.charges = data.charges;
      })
      .catch((err: HttpErrorResponse) => {
        this.snackBar.open('Błąd!', 'Nie udało się pobrać danych', {
          duration: 2000
        });
      });
  }

  charges: IChargesUser;
  semester: ISemester;
  isChangeActive: boolean;
  optionSelected: number;
  blocks: string[];


  change() {
    if(this.isChangeActive){
      this.server
      .setUserDeclaredContribution(this.tokenService.token.id, {charges: this.blocks[this.optionSelected]} as IChargesUserSetData )
      .toPromise()
      .then(() => {
        this.isChangeActive = false;
        this.snackBar.open('Sukces!', 'Dane poprawnie zmienione', {
          duration: 2000
        });
      }).catch((err: HttpErrorResponse) => {
        this.snackBar.open('Błąd!', 'Nie udało się zmienić danych', {
          duration: 2000
        });
      });
    } else{
      this.isChangeActive = true;
    }
  }
}
