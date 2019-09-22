import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';

import { MatDialog, MatSnackBar } from '@angular/material';
import { PathService } from 'src/app/components/items/path-service';

import { FileUploader } from 'ng2-file-upload';
import { typeValidator, sizeValidator } from 'src/app/components/validators/validators';


@Component({
  selector: 'app-load-list',
  templateUrl: './load-data.component.html'
})
export class LoadDataComponent  {
  constructor(
    private Service: PathService,
    private titleService: Title,
    private snackBar: MatSnackBar,
    fb: FormBuilder
  ) {
    this.Service.updatePath('Admin');
    this.titleService.setTitle('Dokumenty');

    this.formModel = fb.group({
      file: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  formModel: FormGroup;
  uploader: FileUploader = new FileUploader({url: '', itemAlias: 'list'});

  @HostListener('change')
  onChange(): void {
    const type = this.fileInput.nativeElement.files[0] ? this.fileInput.nativeElement.files[0].type : null;
    const size = this.fileInput.nativeElement.files[0] ? this.fileInput.nativeElement.files[0].size : null

    this.formModel.controls['file'].setValidators([typeValidator.bind(this, type), sizeValidator.bind(this, size)]);

    this.formModel.controls['file'].updateValueAndValidity();
  }

  @ViewChild('fileInput', {read: ElementRef}) fileInput: ElementRef<HTMLInputElement>;

  onSubmit(e) {
    if (this.formModel.valid) {
      try {
        this.uploader.uploadAll();
      } catch (err) {
        this.snackBar.open('Błąd!', 'Nie udało sie wysłać pliku', {
          duration: 5000
        });
      }
    } else {
      if (this.formModel.controls['file'].errors['size']) {
        this.snackBar.open('Błąd!', 'Plik nie posiada odpowiedniego rozmiaru', {
          duration: 5000
        });
      } else {
        this.snackBar.open('Błąd!', 'Plik nie posiada odpowiedniego formatu', {
          duration: 5000
        });
      }
    }
  }

  fileEvent($event: Event) {
    const file = (<HTMLInputElement>$event.target).files[0];

    if (file) {
    //  $('.custom-file-label').text(file.name);
    }
   // this.valid.checkInputs($event.target, this.formModel.controls.file.errors);
  }
}


