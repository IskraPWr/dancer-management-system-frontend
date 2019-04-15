import { MemberModalComponent } from './members/member-modal.component';
import { MembersComponent } from './members/members.component';
import { NoteDataService } from './main/data.service';
import { InstallmentComponent } from './documents/installment/installment.component';
import { SiteAdministratorsComponent} from './access/site-administrators/site-administrators.component';
import { ApplicationAdministratorsComponent } from './access/application-administrators/application-administrators.component';
import { AccessComponent, ChangesModalComponent } from './access/access.component';
import { GroupComponent } from './documents/group/group.component';
import { SettingsComponent } from './documents/settings/settings.component';
import { LoadDataComponent } from './documents/loadData/loadData.component';
import { TransactionListComponent } from './documents/transactionList/transactionList.component';
import { ChargesListComponent } from './documents/chargesList/chargesList.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar'

import { PresenceComponent, PresenceModalComponent } from './presence/presence.component';
import { ArchivesComponent, ArchivesModalComponent } from './archives/archives.component';
import { DocumentsComponent, DocumentsModalComponent } from './documents/documents.component';
import { MainModalComponent} from './main/main-modal.component';
import { MainComponent} from './main/main.component';
import { NoteModalComponent} from './main/note-modal.component';

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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';


import {NgbModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import { SemestersComponent } from './documents/semesters/semesters.component';
import { ConfirmationModalComponent } from './archives/confirmation-archives.component';
import { SemesterModalComponent } from './documents/semesters/semester-modal.component';
import { GroupModalComponent } from './documents/group/group-modal.component';
import { InstalmentModalComponent } from './documents/installment/installment-modal.component';
import { MembersStatModalComponent } from './members/members-stat-modal.component';

const adminRoutes: Routes = [
  {path: 'admin/archiwum', component: ArchivesComponent},
  {path: 'admin/platnosci', component: DocumentsComponent},
  {path: 'admin/dane', component: MainComponent},
  {path: 'admin/obecnosc', component: PresenceComponent},
  {path: 'admin/ustawienia', component: SettingsComponent},
  {path: 'admin/dostep', component: AccessComponent},
  {path: 'admin/grupy', component: MembersComponent}
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
    GroupComponent,
    AccessComponent,
    ApplicationAdministratorsComponent,
    SiteAdministratorsComponent,
    InstallmentComponent,
    ChangesModalComponent,
    NoteModalComponent,
    MembersComponent,
    MemberModalComponent,
    ConfirmationModalComponent,
    SemesterModalComponent,
    GroupModalComponent,
    InstalmentModalComponent,
    MembersStatModalComponent

  ],
  entryComponents: [
    ArchivesModalComponent,
    DocumentsModalComponent,
    MainModalComponent,
    PresenceModalComponent,
    ChangesModalComponent,
    NoteModalComponent,
    MemberModalComponent,
    ConfirmationModalComponent,
    SemesterModalComponent,
    GroupModalComponent,
    InstalmentModalComponent,
    MembersStatModalComponent
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
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatBadgeModule,
    NgbPopoverModule,
  ],
  providers: [NoteDataService]
})
export class AdminModule {}


