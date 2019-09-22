import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class PathService {

  private readonly currentPath = new Subject();

  public getCurrentPath() {
  return this.currentPath.asObservable();
  }

  public updatePath(viewName: string) {
  this.currentPath.next(viewName);
  }
}

