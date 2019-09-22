import { Component} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';

import { PathService } from '../../../items/path-service';
import { DocumentsModalComponent } from '../documents-modal/documents-modal.component';

@Component({
  templateUrl: './documents.component.html'
})
export class DocumentsComponent {

  constructor (
    private Service: PathService,
    private titleService: Title,
    private dialog: MatDialog
  ) {
    this.Service.updatePath('Admin');
    this.titleService.setTitle('Dokumenty');

  }
  openDialog(): void {
    this.dialog.open(DocumentsModalComponent, {
      maxWidth: '800px',
      minWidth: '600px',
    });
  }

}
