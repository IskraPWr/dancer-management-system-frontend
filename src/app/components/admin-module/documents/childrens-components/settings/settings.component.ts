import { Title } from '@angular/platform-browser';
import { Component} from '@angular/core';

import { MatDialog } from '@angular/material';
import { PathService } from 'src/app/components/items/path-service';



@Component({
  templateUrl: './settings.component.html'
})
export class SettingsComponent {

  constructor(
    private Service: PathService,
    private titleService: Title,
    public dialog: MatDialog
  ) {
    this.Service.updatePath('Admin');
    this.titleService.setTitle('Dokumenty');

  }
}
