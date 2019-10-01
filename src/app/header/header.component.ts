import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface HelpDialogData {
  instance: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  toggleHelp(): void {
    const dialogRef = this.dialog.open(HeaderHelpDialog,
      {
        autoFocus: false,
        width: '90vw',
        maxWidth: '700px',
        maxHeight: '100vh',
      });
  }

  ngOnInit() { }
}

@Component({
  selector: 'header-help-dialog',
  templateUrl: 'header-help-dialog.html',
})
export class HeaderHelpDialog {
  constructor(
    public dialogRef: MatDialogRef<HeaderHelpDialog>,
    @Inject(MAT_DIALOG_DATA) public data: HelpDialogData) { }

  onOk() {
    this.dialogRef.close();
  }
}