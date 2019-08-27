import { Component, OnInit, Input, ViewEncapsulation, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface ConfirmDialogData {
  title: string,
  text: string
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
  encapsulation: ViewEncapsulation.None
})
export class ConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

  onCancel() {
    this.dialogRef.close();
  }

  onOk() {
    // Send confirmation
  }
}