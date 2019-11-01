import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from './settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
  constructor(private ss: SettingsService, private fb: FormBuilder) {}

  dataIsDirty = false;
  isLoading;

  notificationForm: FormGroup;

  notificationFormGroup = new FormGroup({
    fullPartyNotification: new FormControl(),
    playerJoinedNotification: new FormControl(),
    playerLeftNotification: new FormControl(),
    playerKickedNotification: new FormControl(),
    readyCheckNotification: new FormControl(),
    optionsChangedNotification: new FormControl(),
    reminderNotification: new FormControl()
  });

  notificationListenerSub: Subscription;
  notificationsOpen = false;

  toggleNotifications(){this.notificationsOpen = !this.notificationsOpen;}

  notificationsSectionOpen() {return this.notificationsOpen;}
  notificationsSectionClosed() {return !this.notificationsOpen;}

  getFullPartyNotification(){return this.notificationFormGroup.get('fullPartyNotification').value;}
  getPlayerJoinedNotification(){return this.notificationFormGroup.get('playerJoinedNotification').value;}
  getPlayerLeftNotification(){return this.notificationFormGroup.get('playerLeftNotification').value;}
  getPlayerKickedNotification(){return this.notificationFormGroup.get('playerKickedNotification').value;}
  getReadyCheckNotification(){return this.notificationFormGroup.get('readyCheckNotification').value;}
  getOptionsChangedNotification(){return this.notificationFormGroup.get('optionsChangedNotification').value;}
  getReminderNotification(){return this.notificationFormGroup.get('reminderNotification').value;}

  toggleFullPartyNotification(){
    this.ss.setFullPartyNotifications(!this.notificationFormGroup.get('fullPartyNotification').value);
    this.dataIsDirty = true;
  }
  togglePlayerJoinedNotification(){
    this.ss.setPlayerJoinedNotifications(!this.notificationFormGroup.get('playerJoinedNotification').value);
    this.dataIsDirty = true;
  }
  togglePlayerLeftNotification(){
    this.ss.setPlayerLeftNotifications(!this.notificationFormGroup.get('playerLeftNotification').value);
    this.dataIsDirty = true;
  }
  togglePlayerKickedNotification(){
    this.ss.setPlayerKickedNotifications(!this.notificationFormGroup.get('playerKickedNotification').value);
    this.dataIsDirty = true;
  }
  toggleReadyCheckNotification(){
    this.ss.setReadyCheckNotifications(!this.notificationFormGroup.get('readyCheckNotification').value);
    this.dataIsDirty = true;
  }
  toggleOptionsChangedNotification(){
    this.ss.setOptionsChangedNotifications(!this.notificationFormGroup.get('optionsChangedNotification').value);
    this.dataIsDirty = true;
  }
  toggleReminderNotification(){
    this.ss.setReminderNotifications(!this.notificationFormGroup.get('reminderNotification').value);
    this.dataIsDirty = true;
  }

  saveSettings(){
    this.ss.saveNotifications();
    this.dataIsDirty = false;
  }

  ngOnInit() {
    this.notificationForm = this.fb.group({
      fullPartyNotification: ['', Validators.required],
      playerJoinedNotification: ['', Validators.required],
      playerLeftNotification: ['', Validators.required],
      playerKickedNotification: ['', Validators.required],
      readyCheckNotification: ['', Validators.required],
      optionsChangedNotification: ['', Validators.required],
      reminderNotification: ['', Validators.required]
    })

    this.notificationListenerSub = this.ss.getNotificationListener().subscribe(notificationsData => {
      this.notificationFormGroup.get('fullPartyNotification').setValue(notificationsData.partyFill);
      this.notificationFormGroup.get('playerJoinedNotification').setValue(notificationsData.partyJoin);
      this.notificationFormGroup.get('playerLeftNotification').setValue(notificationsData.partyLeave);
      this.notificationFormGroup.get('playerKickedNotification').setValue(notificationsData.partyKick);
      this.notificationFormGroup.get('readyCheckNotification').setValue(notificationsData.partyReady);
      this.notificationFormGroup.get('optionsChangedNotification').setValue(notificationsData.partyOptions);
      this.notificationFormGroup.get('reminderNotification').setValue(notificationsData.partyReminder); 
    });
  }

  ngOnDestroy() {
    this.notificationListenerSub.unsubscribe();
  }
}
