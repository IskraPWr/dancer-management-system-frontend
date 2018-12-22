import { GroupComponent } from './documents/group/group.component';
import { SettingsComponent } from './documents/settings/settings.component';
import { LoadDataComponent } from './documents/loadData/loadData.component';
import { TransactionListComponent } from './documents/transactionList/transactionList.component';
import { ChargesListComponent } from './documents/chargesList/chargesList.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

import { PresenceComponent, PresenceModalComponent } from './presence/presence.component';
import { ArchivesComponent, ArchivesModalComponent } from './archives/archives.component';
import { DocumentsComponent, DocumentsModalComponent } from './documents/documents.component';
import { MainComponent, MainModalComponent } from './main/main.component';

import { AdminMenuComponent } from '../items/adminMenu/admin.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SemestersComponent } from './documents/semesters/semesters.component';

const adminRoutes: Routes = [
  {path: 'admin/archiwum', component: ArchivesComponent},
  {path: 'admin/platnosci', component: DocumentsComponent},
  {path: 'admin/dane', component: MainComponent},
  {path: 'admin/obecnosc', component: PresenceComponent},
  {path: 'admin/ustawienia', component: SettingsComponent}
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
    PresenceModalComponent,
    ChargesListComponent,
    TransactionListComponent,
    SemestersComponent,
    LoadDataComponent,
    SettingsComponent,
    GroupComponent

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
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  providers: []
})
export class AdminModule {}

