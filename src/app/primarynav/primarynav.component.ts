import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NotificationsDialog } from '../dialog/notifications-dialog';
import { HttpClient } from '@angular/common/http';
import { apiref } from '../ref/str/apiref';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from '../push-notification.service';

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
        .subscribe((responseData) => { console.log(responseData.message); })

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
    const dialogRef = this.dialog.open(NotificationsDialog,
      {
        autoFocus: false,
        width: '90vw',
        maxWidth: '600px',
        maxHeight: '85%'
      });
  }

  constructor(public dialog: MatDialog, private as: AuthService, private http: HttpClient, private apiurl: apiref, private swp: SwPush, private pns: PushNotificationService) {}

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