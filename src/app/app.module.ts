import { NoLogGuard } from './components/guards/no-login-guard';
import { AdminGuard } from './components/guards/admin-guard';
import { UserGuard } from './components/guards/user-guard';
import { LoginTokenService } from './components/items/login-token-servise/login-token.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MatDialogModule } from '@angular/material/dialog';


import { PathComponent as Path } from './components/items/path/path.component';
import { LogComponent } from './components/start-components/account-log/log.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/start-components/login/login.component';
import { RemindPasswordComponent } from './components/start-components/remind-password/remind-password.component';
import { CreateAccountComponent } from './components/start-components/create-account/create-accont-component/create-account.component';
import { SuccessModalComponent } from './components/start-components/create-account/create-account-modal-component/success-modal.component';

import { ServerService } from './components/server/server.service';
import { PathService } from './components/items/path-service';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [NoLogGuard]},
  { path: 'tworzenie-konta', component: CreateAccountComponent, canActivate: [NoLogGuard]},
  { path: 'przypomnij-haslo', component: RemindPasswordComponent, canActivate: [NoLogGuard]},
  { path: 'admin', loadChildren: './components/admin-module/admin.module', canLoad: [AdminGuard], canActivateChild: [AdminGuard] },
  { path: 'konto', loadChildren: './components/user-module/user.module', canLoad: [UserGuard], canActivateChild: [UserGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    RemindPasswordComponent,
    LogComponent,
    Path,
    SuccessModalComponent,
  ],
  entryComponents: [SuccessModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy'
    }),
    ReactiveFormsModule,
    FormsModule,
    NgxCaptchaModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    LoginTokenService,
    Title,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    PathService,
    ServerService,
    { provide: MAT_DATE_LOCALE, useValue: 'pl' },
    NoLogGuard,
    AdminGuard,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
