import { ServerService } from './server/server.service';
import { environment } from './../environments/environment.prod';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { PathService } from './components/service';
import { PathComponent as Path} from './components/items/path/path.component';
import { LogComponent } from './components/items/accountLog/log.component';
import { AdminModule } from './components/admin/admin.module';
import { UserModule } from './components/user/user.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/start/login/login.component';
import { CreateAccountComponent } from './components/start/createAccount/createAccount.component';
import { RemindPasswordComponent } from './components/start/remindPassword/remindPassword.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { NgxCaptchaModule } from 'ngx-captcha';

import { OAuthModule } from 'angular-oauth2-oidc';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'tworzenie-konta', component: CreateAccountComponent},
  {path: 'przypomnij-haslo', component: RemindPasswordComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    RemindPasswordComponent,
    LogComponent,
    Path
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    UserModule,
    AdminModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCaptchaModule,
    OAuthModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule

  ],
  providers: [Title, {provide: LocationStrategy, useClass: HashLocationStrategy}, PathService, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
