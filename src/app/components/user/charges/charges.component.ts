import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { Component } from '@angular/core';

@Component({
  templateUrl: './charges.component.html'
})
export class ChangesComponent {
  value = false;
  constructor (private Service: PathService, private titleService: Title  ) {
    this.Service.updateFlag('Konto');
    this.titleService.setTitle('Dane');
  }
}

