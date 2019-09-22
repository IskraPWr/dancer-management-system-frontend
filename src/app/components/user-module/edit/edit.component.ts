import { LoginTokenService } from './../../items/login-token-servise/login-token.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  IUser,
  IFormType,
  INewUserPass,
  INewUserKeys,
  INewUserLogin
} from 'src/app/typings/typings';
import { universities } from './../../start-components/create-account/create-accont-component/create-account.component';
import { Title } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../server/server.service';
import { PathService } from '../../items/path-service';
import { MatSnackBar } from '@angular/material';
import * as validators from '../../validators/validators';

@Component({
  templateUrl: './edit.component.html',
  styles: [
    'mat-hint {color:red!important}',
  ]
})
export class EditComponent implements OnInit {
  constructor(
    private server: ServerService,
    private Service: PathService,
    private titleService: Title,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private tokenService: LoginTokenService
  ) {
    this.Service.updatePath('Konto');
    this.titleService.setTitle('Edytuj konto');

    this.userFormModel = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z żółćęśąźń]*')]
      ],
      surname: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z żółćęśąźń]*')]
      ],
      email: [
        '',
        [Validators.required, Validators.email],
        validators.emailValidatorWithCurrentUserId.bind(this, this.tokenService.token.id)
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern('[0-9+ ]*')],
        validators.phoneValidatorWithCurrentUserId.bind(this, this.tokenService.token.id)
      ],
      university: [''],
      department: ['', Validators.pattern('[a-zA-Z żółćęśąźń]*')],
      year: ['', Validators.pattern('[0-9]*')],
      index: ['', Validators.pattern('[0-9]*')]
    });

    this.keysFormModel = this.fb.group({
      key1: ['', Validators.minLength(3), validators.keyValidatorWithCurrentUserId.bind(this, this.tokenService.token.id)],
      key2: ['', Validators.minLength(3), validators.keyValidatorWithCurrentUserId.bind(this, this.tokenService.token.id)]
    });

    this.loginFormModel = this.fb.group({
      ologin: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      loginsGroup: fb.group(
        {
          login1: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(20)
            ],
            validators.loginValidatorWithCurrentUserId.bind(this, this.tokenService.token.id)
          ],
          login2: ['', [Validators.required]]
        },
        { validator: validators.equilValidator }
      )
    });

    this.passFormModel = this.fb.group({
      opass: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(20)]
      ],
      passwordsGroup: fb.group(
        {
          pass1: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(20)
            ]
          ],
          pass2: ['', [Validators.required]]
        },
        { validator: validators.equilValidator }
      )
    });

    this.universities = universities;
  }

  user: IUser;
  userFormModel: FormGroup;
  keysFormModel: FormGroup;
  loginFormModel: FormGroup;
  passFormModel: FormGroup;
  universities: string[];

  ngOnInit() {
    this.server
      .getUserById(this.tokenService.token.id)
      .toPromise()
      .then((data: IUser) => {
        for (let stat in data) {
          if (this.userFormModel.controls[stat]) {
            if (stat === 'university') {
              this.userFormModel.controls[stat].setValue(
                universities.indexOf(data[stat])
              );
            } else {
              this.userFormModel.controls[stat].setValue(data[stat]);
            }
          }
        }
      })
      .catch((err: HttpErrorResponse) => {
        this.snackBar.open('Błąd!', 'Nie udało się pobrać danych', {
          duration: 2000
        });
      });
  }

  onSubmit(type: IFormType) {
    switch (type) {
      case 'login':
        if (this.loginFormModel.valid) {

          const {
            loginsGroup: {
              login1: login
          },
          ologin
        } = this.loginFormModel.value;

          const dataToSend: INewUserLogin = {
            id_user: this.tokenService.token.id,
            ologin,
            login
          };

          this.server
            .putUserLogin(dataToSend as INewUserLogin)
            .toPromise()
            .then(() => {
              this.snackBar.open('Sukces!', 'Login pomyślnie zmieniony', {
                duration: 2000
              });
            })
            .catch((err: HttpErrorResponse) => {
              this.snackBar.open('Błąd!', 'Nie udało się zmienić loginu', {
                duration: 2000
              });
            });
        }
        break;
      case 'password':
        if (this.passFormModel.valid) {

          const {
            passwordsGroup: {
              pass1: pass
          },
          opass
        } = this.passFormModel.value;

          const dataToSend: INewUserPass = {
            id_user: this.tokenService.token.id,
            opass,
            pass
          };

          this.server
            .putUserPassword(dataToSend as INewUserPass)
            .toPromise()
            .then(() => {
              this.snackBar.open('Sukces!', 'Hasło pomyślnie zmienione', {
                duration: 2000
              });
            })
            .catch((err: HttpErrorResponse) => {
              this.snackBar.open('Błąd!', 'Nie udało się zmienić hasła', {
                duration: 2000
              });
            });
        }
        break;
      case 'keys':
        if (this.keysFormModel.valid) {

          const dataToSend: INewUserKeys = {
            id_user: this.tokenService.token.id,
            ...this.keysFormModel.value,
          };

          this.server
            .putUserKeys(dataToSend as INewUserKeys)
            .toPromise()
            .then(() => {
              this.snackBar.open('Sukces!', 'Klucze pomyślnie zmienione', {
                duration: 2000
              });
            })
            .catch((err: HttpErrorResponse)=> {
              this.snackBar.open('Błąd!', 'Nie udało się zmienić kluczy', {
                duration: 2000
              });
            });
        }
        break;
      case 'user':
        if (this.userFormModel.valid) {

          const dataToSend: IUser = {
            id_user: this.tokenService.token.id,
            ...this.userFormModel.value,
          };

          this.universities.forEach((university: string, index: number) => {
            if (index === dataToSend.university as any) {
              dataToSend.university = university;
            }
          });

          this.server
            .putUserData(dataToSend as IUser)
            .toPromise()
            .then(() => {
              this.snackBar.open('Sukces!', 'Dane pomyślnie zmienione', {
                duration: 2000
              });
            })
            .catch((err: HttpErrorResponse) => {
              this.snackBar.open('Błąd!', 'Nie udało się zmienić danych', {
                duration: 2000
              });
            });
        }
        break;
    }
  }
}
