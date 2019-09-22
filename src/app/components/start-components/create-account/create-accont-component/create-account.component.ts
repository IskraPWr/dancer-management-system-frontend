import { IUser } from '../../../../typings/typings';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ReCaptcha2Component } from 'ngx-captcha';
import { SuccessModalComponent } from '../create-account-modal-component/success-modal.component';

import { PathService } from '../../../items/path-service';
import { ServerService } from '../../../server/server.service';

import * as validators from '../../../validators/validators';

export const universities = [
  'Akademia Muzyczna we Wrocławiu',
  'Akademia Sztuk Pięknych we Wrocławiu',
  'Akademia Lądowych we Wrocławiu',
  'AWF - Akademia Wychowania Fizycznego we Wrocławiu',
  'Dolnośląska Szkoła Wyższa we Wrocławiu',
  'Ewangelikalna Wyższa Szkoła Teologiczna we Wrocławiu',
  'Instytut Konfucjusza w Uniwersytecie Wrocławskim',
  'Metropolitalne Wyższe Seminarium Duchowne we Wrocławiu',
  'Międzynarodowa Wyższa Szkoła Logistyki i Transportu we Wrocławiu',
  'AST - Akademia Sztuk Teatralnych - filia Wrocławiu',
  'Papieski Wydział Teologiczny we Wrocławiu',
  'Politechnika Wrocławska',
  'Uniwersytet SWPS Wrocław',
  'Szkoła Wyższa Rzemiosł Artystycznych i Zarządzania we Wrocławiu',
  'Uniwersytet Ekonomiczny we Wrocławiu',
  'Uniwersytet Medyczny we Wrocławiu',
  'Uniwersytet Przyrodniczy we Wrocławiu',
  'Uniwersytet Wrocławski',
  'Wyższa Szkoła Bankowa we Wrocławiu',
  'Wyższa Szkoła Filologiczna we Wrocławiu',
  'Wyższa Szkoła Handlowa we Wrocławiu',
  'Wyższa Szkoła Humanistyczna we Wrocławiu',
  'Wyższa Szkoła Informatyki i Zarządzania Copernicus we Wrocławiu',
  'Wyższa Szkoła Prawa',
  'Wyższa Szkoła Zarządzania „Edukacja”',
  'Wyższa Szkoła Zarządzania i Coachingu we Wrocławiu',
  'Wrocławska Wyższa Szkoła Informatyki Stosowanej „Horyzont”',
  'Inna'
];

@Component({
  templateUrl: './create-account.component.html',
  styles: [
    'mat-hint {color:red!important}'
  ]
})
export class CreateAccountComponent {
  constructor(
    private server: ServerService,
    private Service: PathService,
    private titleService: Title,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.Service.updatePath('Tworzenie konta');
    this.titleService.setTitle('Tworzenie konta');
    this.universities = universities;

    this.formModel = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z żółćęśąźń]*')]
      ],
      surname: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z żółćęśąźń]*')]
      ],
      gender: ['', [Validators.required]],
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ],
        validators.loginValidator.bind(this)
      ],
      passwordsGroup: fb.group(
        {
          pass1: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(20),
            ]
          ],
          pass2: ['', [Validators.required]]
        },
        { validator: validators.equilValidator }
      ),
      email: [
        '',
        [Validators.required, Validators.email],
        validators.emailValidator.bind(this)
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern('[0-9+ ]*')],
        validators.phoneValidator.bind(this)
      ],
      university: [''],
      department: ['', Validators.pattern('[a-zA-Z żółćęśąźń]*')],
      year: ['', Validators.pattern('[0-9]*')],
      index: ['', Validators.pattern('[0-9]*')],
      key1: ['', Validators.minLength(3), validators.keyValidator.bind(this)],
      key2: ['', Validators.minLength(3), validators.keyValidator.bind(this)],
      gridCheck: ['', [Validators.requiredTrue]],
      recaptcha: ['', [Validators.required]]
    });
  }

  formModel: FormGroup;
  universities: Array<string>;
  name: string;

  siteKey: string = '6LeOaZ8UAAAAAJxj6ctHizhPWwpOnuf8B2CTz0QS';

  @ViewChild('captchaElem')
  captchaElem: ReCaptcha2Component;

  onSubmit(): void {
    if (this.formModel.valid) {
      const objToSend = Object.assign({}, this.formModel.value);

      this.universities.forEach((university: string, index: number) => {
        if (index === objToSend.university) {
          objToSend.university = university;
        }
      });

      delete objToSend.recaptcha;
      delete objToSend.gridCheck;
      objToSend.password = this.formModel.value.passwordsGroup.pass1;
      delete objToSend.passwordsGroup;

      this.server
        .addUser(<IUser>objToSend)
        .toPromise()
        .then(() => {
          return this.dialog
            .open(SuccessModalComponent)
            .afterClosed()
            .toPromise();
        }).then(() => {
          this.router.navigate(['/']);
        })
        .catch(() => {
          this.snackBar.open('Błąd!','Dodanie do bazy SKTT Iskra nie powiodło się', {
            duration: 2000
          });
        });
    } else {
      this.formModel.markAsDirty();
      this.formModel.controls['gridCheck'].markAsDirty();
    }
  }
}
