import * as $ from 'jquery';

export class Valid {
 name;

 checkForm($event) {
   const divErrors = $($event.target)
    .find('input, select')
    .filter('.ng-invalid')
    .siblings()
    .filter('.invalid-feedback');
   divErrors.css('display', 'block');
   divErrors.each(function() {
    if ($(this).text() === '') {
     $(this).text('To pole jest wymagane!');
    }
   });
   $($event.target)
    .find('input, select')
    .removeClass('ng-untouched')
    .addClass('ng-touched');
 }

 checkInputs(targ, errors) {

  const target = $(targ);
  const errorDiv = target.siblings().filter('.invalid-feedback');

  if (target.hasClass('ng-invalid')) {
   errorDiv.css('display', 'block');
   target
    .siblings()
    .filter('.valid-feedback')
    .css('display', 'none');

   if (errors !== null) {
    const errorsName = Object.keys(errors);
    const errorsValue = Object.values(errors);
    switch (errorsName[0]) {
     case 'required':
      errorDiv.text('To pole jest wymagane!');
      break;
     case 'minlength':
      errorDiv.text('Wymagana długość znaków to minimum ' + errorsValue[0]['requiredLength'] + '!');
      break;
     case 'maxlength':
      errorDiv.text('Wymagana długość znaków to maksimum ' + errorsValue[0]['requiredLength'] + '!');
      break;
     case 'email':
      errorDiv.text('Wykryto nieprawidłowy adres e-mail!');
      break;
     case 'pattern':
      if (
       targ.id === 'name' ||
       targ.id === 'surname' ||
       targ.id === 'university' ||
       targ.id === 'department'
      ) {
       errorDiv.text(
        'Zły format znaków! Wymagane znaki alfanumeryczne!'
       );
      } else {
       errorDiv.text('Zły format znaków! Wymagane cyfry!');
      }
      break;
      case 'fileSize':
      errorDiv.text('Plik może mieć maksymalnie 1 MB!');
      break;
      case 'fileType':
      errorDiv.text('Plik może mieć jedynie rozszerzenia XLSX!');
      break;
    }
   } return false;
  } else {
    errorDiv.css('display', 'none')
    .text('');
   target
    .siblings()
    .filter('.valid-feedback')
    .css('display', 'block');

    return true;
  }
 }

 checkGroupInputs (targ, errors) {
  const target = $(targ);
  const group = target.parents().filter('.formGroup')[0];
  const errorDivs = $(group).find('.invalid-feedback');

  if ($(group).hasClass('ng-invalid')) {
    // console.log($(group).find('.invalid-feedback'));
   errorDivs.each(function () {
     $(this).css('display', 'block');
   });

   if (errors !== null) {
    // console.log(errors);
   const errorsName = Object.keys(errors);
   switch (errorsName[0]) {
    case 'equal':
    errorDivs.each(function () {
      if ($(this).text() === '') {
        $(this).text('Podane ciągi nie są identyczne!');
      }
    });
   }
  }
 } else {
  errorDivs.each( function () {
    $(this).css('display', 'none')
    .text('');
  });
 }
}

 ////////////////////////////////// walidatory
 // walidator grupy haseł

 equilValidator({value}): {[key: string]: any} {
   const [first, second] = Object.values(value || {});
   return  (first === second) ? null : {equal: true};
 }

 fileSizeValidator (): {[key: string]: any} {
   let size;
   if ($('#file')[0] && $('#file')[0].files[0]) {
       size = $('#file')[0].files[0].size;
   }
  return  (size !== undefined && size <= 1000000) ? null : {fileSize: true};
 }

 fileTypeValidator (): {[key: string]: any} {
  let type;
  if ($('#file')[0] && $('#file')[0].files[0]) {
    type = $('#file')[0].files[0].type;
  }
   return  (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ? null : {fileType: true};
 }
}
