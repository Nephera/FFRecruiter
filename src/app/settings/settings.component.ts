import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from './settings.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ConfirmDialog } from '../dialog/confirm-dialog';
import { apiref } from '../ref/str/apiref';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
  constructor(
    private ss: SettingsService, 
    private fb: FormBuilder, 
    private as: AuthService, 
    private http: HttpClient, 
    private apiurl: apiref, 
    private dialog: MatDialog) {}

  dataIsDirty = false;
  isLoading;
  userTier = "Unverified";
  topSortCount = 0;
  topSortMax = 0;
  highlightCount = 0;
  highlightMax = 0;
  maxPartyCount = 3;
  unlimitedSortHighlight = false;
  refillDate = "None";
  isVerified = false;
  isRefreshed = false;
  isPatreonOAuth = false;

  notificationForm: FormGroup;
  securityForm: FormGroup;
  socialMediaForm: FormGroup;
  connectionForm: FormGroup;
  referralsForm: FormGroup;

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
  rewardsListenerSub: Subscription;
  verfListenerSub: Subscription;
  patreonAuthListenerSub: Subscription;

  securityOpen = false;
  notificationsOpen = false;
  patreonOpen = false;
  socialMediaOpen = false;
  connectionsOpen = false;
  referralsOpen = false;

  toggleSecurity(){this.securityOpen = !this.securityOpen;}
  toggleNotifications(){this.notificationsOpen = !this.notificationsOpen;}
  togglePatreon(){this.patreonOpen = !this.patreonOpen;}
  toggleSocialMedia(){this.socialMediaOpen = !this.socialMediaOpen;}
  toggleConnections(){this.connectionsOpen = !this.connectionsOpen;}
  toggleReferrals(){this.referralsOpen = !this.referralsOpen;}

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

  refreshRewards(){
    this.ss.refreshRewards();
    this.isRefreshed = true;
  }

  refreshed(){
    return this.isRefreshed;
  }

  notRefreshed(){
    return !this.isRefreshed;
  }

  patreonLogin(){
    window.open("https://www.patreon.com/oauth2/authorize?response_type=code&client_id=l6ASeI3NV2onZUYrLp1sqw4-qshbKwn6FkMy3poWUypQAStMCZhsgLPp2CMKXqpD&redirect_uri=https://www.ffrecruiter.com/patreon");
  }

  patreonLink(s: string){
    if(s == "adventurer"){
      window.open("https://www.patreon.com/join/ffrecruiter/checkout?rid=4436942");
    }
    else if(s == "raider"){
      window.open("https://www.patreon.com/join/ffrecruiter/checkout?rid=4436972");
    }
    else if(s == "legend"){
      window.open("https://www.patreon.com/join/ffrecruiter/checkout?rid=4436997");
    }
  }

  saveSettings(){
    this.ss.saveNotifications();
    this.dataIsDirty = false;
  }

  verifyLink(){
    this.http.post<{message: string}>(this.apiurl.hostname() + "/api/user/register/verf-retry", {username: this.as.getUsername()})
    .subscribe((verfData) => {
      console.log(verfData);
    });

    const dialogRef = this.dialog.open(ConfirmDialog, 
      { 
        autoFocus: false,
        width: '90vw',
        maxWidth: '700px',
        maxHeight: '100vh',
        data: { title: "Activation Email Sent", text: "Please check the email account that you have on file with us for further details." } 
      }
    )
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

    var notifications = this.ss.getNotifications();
    this.notificationFormGroup.get('fullPartyNotification').setValue(notifications.partyFill);
    this.notificationFormGroup.get('playerJoinedNotification').setValue(notifications.partyJoin);
    this.notificationFormGroup.get('playerLeftNotification').setValue(notifications.partyLeave);
    this.notificationFormGroup.get('playerKickedNotification').setValue(notifications.partyKick);
    this.notificationFormGroup.get('readyCheckNotification').setValue(notifications.partyReady);
    this.notificationFormGroup.get('optionsChangedNotification').setValue(notifications.partyOptions);
    this.notificationFormGroup.get('reminderNotification').setValue(notifications.partyReminder); 

    this.notificationListenerSub = this.ss.getNotificationListener().subscribe(notificationsData => {
      this.notificationFormGroup.get('fullPartyNotification').setValue(notificationsData.partyFill);
      this.notificationFormGroup.get('playerJoinedNotification').setValue(notificationsData.partyJoin);
      this.notificationFormGroup.get('playerLeftNotification').setValue(notificationsData.partyLeave);
      this.notificationFormGroup.get('playerKickedNotification').setValue(notificationsData.partyKick);
      this.notificationFormGroup.get('readyCheckNotification').setValue(notificationsData.partyReady);
      this.notificationFormGroup.get('optionsChangedNotification').setValue(notificationsData.partyOptions);
      this.notificationFormGroup.get('reminderNotification').setValue(notificationsData.partyReminder); 
    });

    this.rewardsListenerSub = this.ss.getRewardsListener().subscribe(rewardsData => {
      this.userTier = rewardsData.tier;
      this.topSortCount = rewardsData.topSortCount;
      this.topSortMax = rewardsData.topSortMax;
      this.highlightCount = rewardsData.highlightCount;
      this.highlightMax = rewardsData.highlightMax;
      this.maxPartyCount = rewardsData.maxPartyCount;
      if(rewardsData.refillDate != null){
        this.refillDate = rewardsData.refillDate;
      }
      this.unlimitedSortHighlight = rewardsData.unlimitedSortHighlight;
    })

    this.isVerified = this.as.getIsVerf();
    this.verfListenerSub = this.as.getVerfStatusListener().subscribe(verf => {
      this.isVerified = verf;
    })

    this.isPatreonOAuth = this.as.getIsPatreonAuth();
    this.patreonAuthListenerSub = this.as.getPatreonAuthListener().subscribe(auth => {
      this.isPatreonOAuth = auth;
    })
  }

  ngOnDestroy() {
    this.notificationListenerSub.unsubscribe();
    this.rewardsListenerSub.unsubscribe();
    this.verfListenerSub.unsubscribe();
    this.patreonAuthListenerSub.unsubscribe();
  }
}
