import { Component, OnInit, Input, ViewEncapsulation, Inject, PLATFORM_ID} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwPush } from '@angular/service-worker';
import { apiref } from '../ref/str/apiref';
import { PushNotificationService } from '../push-notification.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

export interface NotificationsDialogData {
  title: string,
  text: string
}

@Component({
  selector: 'notifications-dialog',
  templateUrl: 'notifications-dialog.html',
})
export class NotificationsDialog {

  reminderIsDisabled = false;

  constructor(
    private api: apiref,
    private swp: SwPush,
    private pns: PushNotificationService,
    public dialogRef: MatDialogRef<NotificationsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NotificationsDialogData,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) {
      this.reminderIsDisabled = Boolean(localStorage.getItem("disableNotificationDialogReminder"));
    }
  }

  onCancel() {
    this.dialogRef.close({data: {
      cancelled: true
    }});
  }
  
  onSubscribe() {
    this.pns.sub();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('disableNotificationDialogReminder', "false");
    }
    this.dialogRef.close({data: {
      cancelled: false
    }});
  }

  disableReminder(){
    this.reminderIsDisabled = !this.reminderIsDisabled;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("disableNotificationDialogReminder", String(this.reminderIsDisabled));
    }
  }
}