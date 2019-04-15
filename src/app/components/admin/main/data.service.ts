import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NoteDataService {

  public messageSource = new BehaviorSubject('default message');

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

}
