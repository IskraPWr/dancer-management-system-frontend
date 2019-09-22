import { PathService } from './../../items/path-service';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent {

  constructor(private titleService: Title, private service: PathService,) {
    this.titleService.setTitle('Dostępy');
    this.service.updatePath('Admin'); }

}
