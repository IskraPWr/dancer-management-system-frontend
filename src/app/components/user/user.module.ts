import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from './../start/logGuardFunction/logGuardClass';
import { PresenceComponent, PresenceModalComponent } from './presence/presence.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { MainComponent } from './main/main.component';
import { ChangesComponent } from './charges/charges.component';

import { UserMenuComponent } from '../items/userMenu/user.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSortModule} from '@angular/material/sort';


const userRoutes: Routes = [
  {path: 'konto/edycja', component: EditComponent},
  {path: 'konto/usun', component: DeleteComponent},
  {path: 'konto/obecnosc', component: PresenceComponent},
  {path: 'konto/oplaty', component: ChangesComponent},
  {path: 'konto/dane', component: MainComponent, canActivate: [LoginGuard]}

];

@NgModule({
  declarations: [
    MainComponent,
    UserMenuComponent,
    ChangesComponent,
    DeleteComponent,
    EditComponent,
    PresenceComponent,
    PresenceModalComponent
  ],
  entryComponents: [
    PresenceModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule
  ],
  providers: [LoginGuard]
})
export class UserModule {}
