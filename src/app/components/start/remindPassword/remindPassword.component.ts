import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { Component} from '@angular/core';

@Component({
  templateUrl: './remindPassword.component.html'
})
export class RemindPasswordComponent {

  constructor (private Service: PathService, private titleService: Title  ) {
    this.Service.updateFlag('Wygeneruj hasło');
    this.titleService.setTitle('Wygeneruj hasło');
  }
}
