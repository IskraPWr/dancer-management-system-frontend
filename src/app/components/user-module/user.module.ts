import { UserGuard } from './../guards/user-guard';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PresenceComponent } from './presence/presence/presence.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { MainComponent } from './main/main.component';
import { ChangesComponent } from './charges/charges.component';
import { UserMenuComponent } from './userMenu/user.component';
import { PresenceModalComponent } from './presence/presence-modal/presence-modal.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {ReactiveFormsModule, FormsModule  } from '@angular/forms';


const userRoutes: Routes = [
  {path: 'edycja', component: EditComponent, canActivate: [UserGuard]},
  {path: 'usun', component: DeleteComponent, canActivate: [UserGuard]},
  {path: 'obecnosc', component: PresenceComponent, canActivate: [UserGuard]},
  {path: 'oplaty', component: ChangesComponent, canActivate: [UserGuard]},
  {path: '', component: MainComponent, canActivate: [UserGuard]},

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
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule
  ],
  providers: [UserGuard]
})
export default class UserModule {}
