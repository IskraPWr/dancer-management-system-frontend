import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PresenceComponent, PresenceModalComponent } from './presence/presence.component';
import { ArchivesComponent, ArchivesModalComponent } from './archives/archives.component';
import { DocumentsComponent, DocumentsModalComponent } from './documents/documents.component';
import { MainComponent, MainModalComponent } from './main/main.component';

import { AdminMenuComponent } from '../items/adminMenu/admin.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const adminRoutes: Routes = [
  {path: 'admin/archiwum', component: ArchivesComponent},
  {path: 'admin/dokumenty', component: DocumentsComponent},
  {path: 'admin/dane', component: MainComponent},
  {path: 'admin/obecnosc', component: PresenceComponent}

];

@NgModule({
  declarations: [
    MainComponent,
    AdminMenuComponent,
    ArchivesComponent,
    DocumentsComponent,
    PresenceComponent,
    ArchivesModalComponent,
    DocumentsModalComponent,
    MainModalComponent,
    PresenceModalComponent
  ],
  entryComponents: [
    ArchivesModalComponent,
    DocumentsModalComponent,
    MainModalComponent,
    PresenceModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    NgbModule
  ],
  providers: []
})
export class AdminModule {}
