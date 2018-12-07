import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { Component } from '@angular/core';

@Component({
  templateUrl: './charges.component.html'
})
export class ChangesComponent {
  constructor (private Service: PathService, private titleService: Title  ) {
    this.Service.updateFlag('Konto');
    this.titleService.setTitle('Dane');
  }

  edit = false;
  numberOfBlocks =  '3 bloki';
  buttonStatusArray = ['Edytuj', 'Zmień'];
  button = this.buttonStatusArray[0];
  status = ['Zapłacono', 'kon' , 'zalegla naleznosc'];

  change () {
    if (this.edit === false ) {
      this.edit = true;
      this.button = this.buttonStatusArray[1];
    } else {
      this.edit = false;
      this.button = this.buttonStatusArray[0];
    }
  }
}

