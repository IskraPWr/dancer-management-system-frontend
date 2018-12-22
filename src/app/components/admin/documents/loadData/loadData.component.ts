import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, AfterViewInit, Inject } from '@angular/core';
import * as Chart from 'chart.js';
import { Valid } from '../../../validators/validators';
import {MAT_DIALOG_DATA} from '@angular/material';

import { ServerService } from './../../../../server/server.service';
import { PathService } from './../../../service';
import {RandomColor} from '../../../items/colorGenerator/colorGenerator';

import { MatDialog, MatDialogRef } from '@angular/material';



import * as $ from 'jquery';

@Component({
  selector: 'app-load-list',
  templateUrl: './loadData.component.html'
})
export class LoadDataComponent {
  formModel: FormGroup;
  valid = new Valid();
  constructor(
    private Service: PathService,
    private titleService: Title,
    public dialog: MatDialog,
    fb: FormBuilder
  ) {
    this.Service.updateFlag('Admin');
    this.titleService.setTitle('Dokumenty');

    this.formModel = fb.group({
      file: [
        '',
        [
          Validators.required,
          this.valid.fileTypeValidator,
          this.valid.fileSizeValidator
        ]
      ]
    });
  }

  onSubmit($event) {
    // dostarcz event i konkretny form
    if (this.formModel.valid) {
    } else {
      this.valid.checkForm($event);
    }
  }

  fileEvent($event: Event) {
    const file = (<HTMLInputElement>$event.target).files[0];

    if (file) {
      $('.custom-file-label').text(file.name);
    }
    this.valid.checkInputs($event.target, this.formModel.controls.file.errors);
  }
}

