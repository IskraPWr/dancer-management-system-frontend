import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IConfirmationType } from 'src/app/typings/typings';


const text = {
  deleteSemester: 'wybrane semestry?',
  deleteGroup: 'wybrane grupy?',
  deleteInstallment: 'wybrane progi składkowe?',
  deleteUser: 'wybranych użytkowników?',
  deleteApplicationAdmin: 'wybranch administratorów aplikacji?',
  deleteSiteAdmin: 'wybranych administratorów strony?',
};

@Component({
  selector: 'app-modal',
  templateUrl: 'confirmation-modal.component.html'
})
export class ConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public modalData: IConfirmationType
  ) {
    switch (modalData.confirmationType) {
      case 'semester-delete':
        this.textToShow = text.deleteSemester;
      break;
      case 'group-delete':
      this.textToShow = text.deleteGroup;
      break;
      case 'intallment-delete':
      this.textToShow = text.deleteInstallment;
      break;
      case 'user-delete':
      this.textToShow = text.deleteUser;
      break;
      case 'page-admin-delete':
      this.textToShow = text.deleteSiteAdmin;
      break;
      case 'application-admin-delete':
      this.textToShow = text.deleteApplicationAdmin;
      break;
      default:
    }
  }

  textToShow: string;

  confirmation() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
