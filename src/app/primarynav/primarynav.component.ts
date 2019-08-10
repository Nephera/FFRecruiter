import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface MessagesDialogData {
  //instance: string;

}

@Component({
  selector: 'app-primarynav',
  templateUrl: './primarynav.component.html',
  styleUrls: ['./primarynav.component.scss']
})
export class PrimarynavComponent implements OnInit {

  private authListenerSub: Subscription;
  userIsAuthenticated = false;

  isAuthenticated(){
    return this.userIsAuthenticated;
  }

  showMessages() {
    const dialogRef = this.dialog.open(PrimarynavMessagesDialog,
      {
        autoFocus: false,
        width: '90vw',
        maxWidth: '600px',
        maxHeight: '90%',
        data: {
        }
      });
  }

  constructor(public dialog: MatDialog, private as: AuthService) { }

  ngOnInit()
  {
    this.userIsAuthenticated = this.as.getIsAuth();
    this.authListenerSub = this.as.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy()
  {
    this.authListenerSub.unsubscribe();
  }

}

@Component({
  selector: 'primarynav-messages-dialog',
  templateUrl: 'primarynav-messages-dialog.html',
})
export class PrimarynavMessagesDialog {
  constructor(
    public dialogRef: MatDialogRef<PrimarynavMessagesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MessagesDialogData) { }

  onOk() {
    this.dialogRef.close();
  }
}