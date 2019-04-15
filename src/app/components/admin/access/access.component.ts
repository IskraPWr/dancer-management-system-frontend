import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Dostępy'); }

  ngOnInit() {
  }

}

@Component({
  template: '<div></div>',
})
export class ChangesModalComponent {

  constructor(
  public dialogRef: MatDialogRef<ChangesModalComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
