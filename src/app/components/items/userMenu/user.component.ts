import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './user.component.html'
})
export class UserMenuComponent implements AfterViewInit {

  view;

  @ViewChild('data', {read: ElementRef}) data: ElementRef;
  @ViewChild('edit', {read: ElementRef}) edit: ElementRef;
  @ViewChild('delete', {read: ElementRef}) delete: ElementRef;
  @ViewChild('presence', {read: ElementRef}) presence: ElementRef;
  @ViewChild('charges', {read: ElementRef}) charges: ElementRef;

  constructor(private route: ActivatedRoute) {
    this.view = this.route.snapshot.routeConfig.path;
  }

  ngAfterViewInit(): void {
    switch (this.view) {
      case 'konto/dane' :
      this.data.nativeElement.classList.add('active2');
      break;
      case 'konto/edycja' :
      this.edit.nativeElement.classList.add('active2');
      break;
      case 'konto/usun' :
      this.delete.nativeElement.classList.add('active2');
      break;
      case 'konto/obecnosc' :
      this.presence.nativeElement.classList.add('active2');
      break;
      case 'konto/oplaty' :
      this.charges.nativeElement.classList.add('active2');
      break;
    }
}

}
