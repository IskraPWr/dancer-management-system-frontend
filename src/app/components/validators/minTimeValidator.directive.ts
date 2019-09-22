import { ENTER } from '@angular/cdk/keycodes';
import { Directive, Input, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
import { minValidator } from './validators';

@Directive({
  selector: '[appMinTime]',
})
export class MinTimeValidatorDirective {
  constructor(private input: NgModel){
  }

  @Input() startTime: string;

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    if (this.startTime) {
      this.input.control.setValidators(minValidator.bind(this, this.startTime));
    }
  }
};
