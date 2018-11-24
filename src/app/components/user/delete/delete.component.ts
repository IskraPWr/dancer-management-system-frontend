import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { Component } from '@angular/core';


@Component({
  templateUrl: './delete.component.html'
})
export class DeleteComponent {
  constructor (private Service: PathService, private titleService: Title  ) {
    this.Service.updateFlag('Konto');
    this.titleService.setTitle('Usuń konto');
}
}
