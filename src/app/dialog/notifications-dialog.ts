import { Component, OnInit, Input, ViewEncapsulation, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SwPush } from '@angular/service-worker';
import { apiref } from '../ref/str/apiref';
import { PushNotificationService } from '../push-notification.service';

export interface NotificationsDialogData {
  title: string,
  text: string
}

@Component({
  selector: 'notifications-dialog',
  templateUrl: 'notifications-dialog.html',
})
export class NotificationsDialog {

  constructor(
    private api: apiref,
    private swp: SwPush,
    private pns: PushNotificationService,
    public dialogRef: MatDialogRef<NotificationsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NotificationsDialogData) {}

  onCancel() {
    this.dialogRef.close();
  }

  onSubscribe() {
    console.log(navigator.serviceWorker.controller);
    this.swp.requestSubscription({
      serverPublicKey: this.api.vapid()
    })
    .then(sub => {
      this.pns.sendSubToServer(sub).subscribe();
      this.dialogRef.close();
    })
    .catch(err => {
      console.error('Could not subscribe to notifications', err);
      this.dialogRef.close();
    })
  }
}