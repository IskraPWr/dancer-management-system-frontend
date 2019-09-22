import { FormControl, FormGroup } from '@angular/forms';

export function equilValidator({ value }: FormGroup): { [key: string]: any } {
  const [first, second] = Object.values(value || {});
  return first === second ? null : { equal: true };
}

export function loginValidator({ value }: FormControl): { [key: string]: any } {
  return this.server.checkLogin({ login: value });
}

export function emailValidator({ value }: FormControl): { [key: string]: any } {
  return this.server.checkEmail({ email: value });
}

export function phoneValidator({ value }: FormControl): { [key: string]: any } {
  return this.server.checkPhone({ phone: value });
}

export function keyValidator({ value }: FormControl): { [key: string]: any } {
  return this.server.checkKey({ key: value });
}

export function loginValidatorWithCurrentUserId(id: number, { value }: FormControl): { [key: string]: any } {
  return this.server.checkLogin({ login: value, id });
}

export function emailValidatorWithCurrentUserId(id: number, { value }: FormControl): { [key: string]: any } {
  return this.server.checkEmail({ email: value, id });
}

export function phoneValidatorWithCurrentUserId(id: number, { value }: FormControl): { [key: string]: any } {
  return this.server.checkPhone({ phone: value, id });
}

export function keyValidatorWithCurrentUserId(id: number, { value }: FormControl): { [key: string]: any } {
  return this.server.checkKey({ key: value, id });
}


export function minValidator(startValue: string, {value: endValue}: FormControl) {

  if (!endValue || !startValue) {
    return null;
  }
  const end = endValue.split(':');
  const endMin = end[1];
  const endHour = end[0];

  const start = startValue.split(':');
  const startMin = start[1];
  const startHour = start[0];

  if (startHour < endHour) {
    return null;
  }

  if (startHour === endHour) {
    if (startMin < endMin) {
      return null;
    }
  }

  return { minTime: true,  minTimeValue: startValue};
}

export function typeValidator(type: string, {value: inputValue}: FormControl) {

  if (!type) {
    return null;
  }

  return type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? null : { type: true,  expectedType: 'XLSX'};
}

export function sizeValidator(size: number, {value: inputValue}: FormControl) {
  if (!size) {
    return null;
  }

  return size > 1000000 ? { size: true,  maxSize: '1MB'} : null;
}

