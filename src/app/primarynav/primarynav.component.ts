import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NotificationsDialog } from '../dialog/notifications-dialog';
import { HttpClient } from '@angular/common/http';
import { apiref } from '../ref/str/apiref';

export interface MessagesDialogData {}

@Component({
  selector: 'app-primarynav',
  templateUrl: './primarynav.component.html',
  styleUrls: ['./primarynav.component.scss']
})
export class PrimarynavComponent implements OnInit {

  private authListenerSub: Subscription;
  userIsAuthenticated = false;
  canNotify = true; // TODO: Should get from db

  timeLeft: number = 0;
  interval: any;

  isAuthenticated(){
    return this.userIsAuthenticated;
  }

  notificationsStatus(){
    return Notification.permission;
  }

  notificationsEnabled(){
    return this.canNotify;
  }

  setNotifications(v: boolean){
    if(this.canUpdate()){
      // Send information to backend
      const putData = {
        username: localStorage.getItem("username"),
        allowNotifications: v
      }

      this.http.put<{message: string}>(this.apiurl.hostname() + "/api/user/settings/set/notifications", putData)
        .subscribe((responseData) => {
          console.log(responseData.message);
        })

      // Toggle button functionality
      this.canNotify = v;

      // Disable for short time
      this.timeLeft = 3;
    }
  }

  canUpdate(){
    return (this.timeLeft <= 0);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      }
    },1000)
  }

  showEnableNotificationsDialog(){
    var SWC: ServiceWorkerContainer;
    var SWS: ServiceWorkerState;
    var SW: ServiceWorker;
    var SWR: ServiceWorkerRegistration;

    console.log("SW State:");
    console.log(SWS);
    console.log("SW.state");
    console.log(SW.state);
    SWR.update();

    const dialogRef = this.dialog.open(NotificationsDialog,
      {
        autoFocus: false,
        width: '90vw',
        maxWidth: '600px',
        maxHeight: '90%'
      });
    dialogRef.afterClosed().subscribe(result => { 
    })
  }

  showMessages() {
    const dialogRef = this.dialog.open(PrimarynavMessagesDialog,
      {
        autoFocus: false,
        width: '90vw',
        maxWidth: '600px',
        maxHeight: '90%'
      });
  }

  constructor(public dialog: MatDialog, private as: AuthService, private http: HttpClient, private apiurl: apiref) {}

  ngOnInit()
  {
    this.startTimer();

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