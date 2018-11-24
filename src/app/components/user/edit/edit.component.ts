import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Valid } from '../../validators/validators';

import * as $ from 'jquery';

@Component({
  templateUrl: './edit.component.html'
})
export class EditComponent {
  formModel: FormGroup;
  formModelLogin: FormGroup;
  formModelPassword: FormGroup;
  formModelKeys: FormGroup;
  name: string;
  valid = new Valid();

  user: any = {
    name: 'Greg',
    surname: 'Kikut',
    email: '',
    phone: '',
    university: '',
    department: '',
    year: '',
    index: ''
  };

  constructor(
    private Service: PathService,
    private titleService: Title,
    fb: FormBuilder
  ) {
    this.Service.updateFlag('Konto');
    this.titleService.setTitle('Edytuj konto');

    this.formModel = fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z żółćęśąźń]*')]
      ],
      surname: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z żółćęśąźń]*')]
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9+ ]*')]],
      university: [''],
      department: ['', Validators.pattern('[a-zA-Z żółćęśąźń]*')],
      year: ['', Validators.pattern('[0-9]*')],
      index: ['', Validators.pattern('[0-9]*')]
    });

    this.formModelKeys = fb.group({
      key1: ['', []],
      key2: ['', []]
    });

    this.formModelLogin = fb.group({
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
            ]
          ],
          login2: ['', [Validators.required]]
        },
        {validator: this.valid.equilValidator}
      )
    });

    this.formModelPassword = fb.group({
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
        {validator: this.valid.equilValidator}
      )
    });
  }

  checkFormInput ($event) {
    // dostarcz konkretny form
    const inputName = $event.path[0].id;
    const formName = $($event.path).filter('form')[0].id;
    const formGroup = $($event.path).filter('.formGroup');

    if (formGroup.length === 0) {
      this.valid.checkInputs(
        $event.target,
        this[formName].controls[inputName].errors
      );
    } else {
      if (
        this.valid.checkInputs(
          $event.target,
          this[formName].controls[formGroup[0].id].controls[inputName].errors
        )
      ) {
        this.valid.checkGroupInputs(
          $event.target,
          this[formName].controls[formGroup[0].id].errors
        );
      }
    }
 }

  onSubmit($event) {
    // dostarcz event i konkretny form

    const formName = $($event.path).filter('form')[0].id;
    if (this[formName].valid) {

    } else {
      this.valid.checkForm($event);
    }
  }

}
