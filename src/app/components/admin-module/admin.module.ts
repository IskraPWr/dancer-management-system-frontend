import { MinTimeValidatorDirective} from './../validators/minTimeValidator.directive';
import { MemberModalComponent } from './members/members-modal-add-to-group/members-modal.component';
import { ChartComponent } from './presence/presence-chart/chart.component';
import { PresenceModalComponent } from './presence/presence-modal/presence-modal.component';
import { PassModalComponent } from './access/pass-modal/pass-modal.component';
import { NoteDataService } from './main/data.service';
import { SiteAdministratorsComponent} from './access/site-administrators/site-administrators.component';
import { ApplicationAdministratorsComponent } from './access/application-administrators/application-administrators.component';
import { AccessComponent } from './access/access.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { PresenceComponent } from './presence/presence-component/presence.component';
import { ArchivesComponent } from './archives/archives.component';
import { MainModalComponent} from './main/main-modal/main-modal.component';
import { MainComponent } from './main/main-component/main.component';
import { NoteModalComponent} from './notes/notes-modal.component';

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

import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AdministratorsModalComponent } from './access/add-administrator-modal/administrators-modal.component';
import { AdminMenuComponent } from './adminMenu/admin.component';
import { MembersComponent } from './members/members-component/members.component';
import { MembersStatModalComponent } from './members/members-modal-stat/members-stat-modal.component';
import { InstallmentComponent } from './documents/childrens-components/installment/installment-component/installment.component';
import { SettingsComponent } from './documents/childrens-components/settings/settings.component';
import { DocumentsModalComponent } from './documents/documents-modal/documents-modal.component';
import { DocumentsComponent } from './documents/documents-component/documents.component';
import { InstalmentModalComponent } from './documents/childrens-components/installment/installment-modal/installment-modal.component';
import { GroupModalComponent } from './documents/childrens-components/group/group-modal/group-modal.component';
import { SemesterModalComponent } from './documents/childrens-components/semesters/semesters-modal/semester-modal.component';
import { ChargesListComponent } from './documents/childrens-components/charges-list/charges-list.component';
import { TransactionListComponent } from './documents/childrens-components/transaction-list/transaction-list.component';
import { SemestersComponent } from './documents/childrens-components/semesters/semesters-component/semesters.component';
import { LoadDataComponent } from './documents/childrens-components/load-data/load-data.component';
import { GroupComponent } from './documents/childrens-components/group/group-component/group.component';
import { ConfirmationModalComponent } from './confirmation/confirmation-modal.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { ConfirmationAdminModalComponent } from './access/confirmation-modal/confirmation-modal.component';
import { AdminGuard } from '../guards/admin-guard';


const adminRoutes: Routes = [
  {path: 'archiwum', component: ArchivesComponent,  canActivate: [AdminGuard]},
  {path: 'platnosci', component: DocumentsComponent,  canActivate: [AdminGuard]},
  {path: '', component: MainComponent, canActivate: [AdminGuard]},
  {path: 'obecnosc', component: PresenceComponent,  canActivate: [AdminGuard]},
  {path: 'ustawienia', component: SettingsComponent,  canActivate: [AdminGuard]},
  {path: 'dostep', component: AccessComponent,  canActivate: [AdminGuard]},
  {path: 'grupy', component: MembersComponent,  canActivate: [AdminGuard]}
];


@NgModule({
  declarations: [
    MainComponent,
    AdminMenuComponent,
    ArchivesComponent,
    DocumentsComponent,
    PresenceComponent,
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
    NoteModalComponent,
    MembersComponent,
    MemberModalComponent,
    ConfirmationModalComponent,
    SemesterModalComponent,
    GroupModalComponent,
    InstalmentModalComponent,
    MembersStatModalComponent,
    AdministratorsModalComponent,
    PassModalComponent,
    ConfirmationAdminModalComponent,
    ChartComponent,
    MinTimeValidatorDirective,
    FileSelectDirective

  ],
  entryComponents: [
    DocumentsModalComponent,
    MainModalComponent,
    PresenceModalComponent,
    NoteModalComponent,
    MemberModalComponent,
    ConfirmationModalComponent,
    SemesterModalComponent,
    GroupModalComponent,
    InstalmentModalComponent,
    MembersStatModalComponent,
    AdministratorsModalComponent,
    PassModalComponent,
    ConfirmationAdminModalComponent
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
  providers: [AdminGuard]
})
export default class AdminModule {}


