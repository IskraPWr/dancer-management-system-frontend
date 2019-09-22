import { Router } from '@angular/router';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  constructor(private router: Router) {
    this.isAdminOrUserView = false;
  }

  isAdminOrUserView: boolean;

  @ViewChild('button') button: ElementRef<HTMLButtonElement>;

  trrigerMenu() {
    document.querySelector('.sidebar').classList.toggle('is-open');
    this.button.nativeElement.classList.toggle('is-active');
  }

  checkUrl(): void {
    const url: string = this.router.url;

    if (
      url === '/' ||
      url === '/tworzenie-konta' ||
      url === '/przypomnij-haslo'
    ) {
      if (this.isAdminOrUserView) {
        this.isAdminOrUserView = false;
        document.querySelector('.hamburger').classList.add('inactive');
      }
    } else {
      if (!this.isAdminOrUserView) {
        this.isAdminOrUserView = true;
        document.querySelector('.hamburger').classList.remove('inactive');
      }
    }
  }

  ngAfterViewChecked(): void {
    this.checkUrl();
  }

}
