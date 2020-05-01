import { Component, OnInit, Input, ViewEncapsulation, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ErrorDialogData {
  title: string,
  text: string
}

@Component({
  selector: 'error-dialog',
  templateUrl: 'error-dialog.html',
  encapsulation: ViewEncapsulation.None
})
export class ErrorDialog {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData) { }

  onOk() {
    this.dialogRef.close();
  }
}