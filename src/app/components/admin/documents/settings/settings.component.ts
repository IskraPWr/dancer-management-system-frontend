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
  templateUrl: './settings.component.html'
})
export class SettingsComponent {

  constructor(
    private Service: PathService,
    private titleService: Title,
    public dialog: MatDialog
  ) {
    this.Service.updateFlag('Admin');
    this.titleService.setTitle('Dokumenty');

  }
}
