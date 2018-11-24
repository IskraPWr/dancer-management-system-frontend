import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { PathService } from './../../service';
import { Valid } from '../../validators/validators';
import { ReCaptcha2Component } from 'ngx-captcha';
import * as $ from 'jquery';

@Component({
  templateUrl: './createAccount.component.html'
})
export class CreateAccountComponent {
  formModel: FormGroup;
  name: string;
  valid = new Valid();

  siteKey = '6Lf3t18UAAAAAM_cXGZRGD_M_r8eQv0H2EpnfwEQ';
  size = 'normal';
  lang = 'pl';
  theme = 'light';
  type = 'image';

  @ViewChild('captchaElem')
  captchaElem: ReCaptcha2Component;

  constructor(
    private Service: PathService,
    private titleService: Title,
    fb: FormBuilder
  ) {
    this.Service.updateFlag('Tworzenie konta');
    this.titleService.setTitle('Tworzenie konta');

    this.formModel = fb.group({
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
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
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
        { validator: this.valid.equilValidator }
      ),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9+ ]*')]],
      university: [''],
      department: ['', Validators.pattern('[a-zA-Z żółćęśąźń]*')],
      year: ['', Validators.pattern('[0-9]*')],
      index: ['', Validators.pattern('[0-9]*')],
      key1: [''],
      key2: [''],
      gridCheck: ['', [Validators.requiredTrue]],
      recaptcha: ['', Validators.required]
    });

  }

  handleExpire() {}
  handleLoad() {}
  handleSuccess($event) {}

  ///////////////////////////////////////////////////
  checkFormInput($event) {
    const inputName = $event.path[0].id;
    const formName = $($event.path).filter('form')[0].id;
    const formGroup = $($event.path).filter('.formGroup');

    const that = this;

    // cholerny problem z dostepem do obiekow DOM, nie umiem inaczej zapobiedz sprawdzeniu klas walidacji przed zmiana obiektu FormModel
    setTimeout(function() {
      if (formGroup.length === 0) {
        that.valid.checkInputs(
          $event.target,
          that[formName].controls[inputName].errors
        );
      } else {
        if (
          that.valid.checkInputs(
            $event.target,
            that[formName].controls[formGroup[0].id].controls[inputName].errors
          )
        ) {
          that.valid.checkGroupInputs(
            $event.target,
            that[formName].controls[formGroup[0].id].errors
          );
        }
      }
    }, 20);
  }

  onSubmit($event) {
    // dostarcz event i konkretny form
    if (this.formModel.valid) {
    } else {
      this.valid.checkForm($event);
    }
  }
}
