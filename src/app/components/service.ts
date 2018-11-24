import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class PathService {

  private readonly someFlag$ = new Subject();

  public getFlagData() {
  return this.someFlag$.asObservable();
  }

  public updateFlag(message: string) {
  this.someFlag$.next(message);
  }
}

