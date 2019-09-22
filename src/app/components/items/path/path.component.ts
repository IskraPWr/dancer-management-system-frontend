import { PathService } from '../path-service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-path',
  templateUrl: './path.component.html'
})
export class PathComponent implements OnDestroy {
  constructor (private pathService: PathService) {
    const pathChanger = this.pathService.getCurrentPath();
    this.pathServiceSubscription  = pathChanger.subscribe((viewName: string) => this.viewName = viewName);
  }
  pathServiceSubscription: Subscription;
  viewName: string;

  ngOnDestroy(): void{
    this.pathServiceSubscription.unsubscribe();
  }
}


