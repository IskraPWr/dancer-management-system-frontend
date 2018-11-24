import { PathService } from './../../service';
import { Component } from '@angular/core';



@Component({
  selector: 'app-path',
  templateUrl: './path.component.html'
})
export class PathComponent {
  text;

  constructor (private Service: PathService) {
    const mySubscrption = this.Service.getFlagData();
    mySubscrption.forEach(next => this.text = next);
  }
}


