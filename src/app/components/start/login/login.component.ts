import { PathService } from './../../service';
import { FormGroup, FormControl} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Component, AfterViewInit } from '@angular/core';
declare var window: any;
declare var FB: any;


@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements AfterViewInit {
  formModel = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor (private Service: PathService, private titleService: Title ) {
    this.Service.updateFlag('Logowanie');
    this.titleService.setTitle('Logowanie');

  }

  onSubmit() {
    console.log('Dziala');
  }


  ngAfterViewInit () {
  }
}

