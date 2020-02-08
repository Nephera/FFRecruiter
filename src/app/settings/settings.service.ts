import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { apiref } from '../ref/str/apiref';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  notifications = {
    partyFill: false,
    partyJoin: false,
    partyLeave: false,
    partyKick: false,
    partyReady: false,
    partyOptions: false,
    partyReminder: false
  }

  rewards = {};

  private notificationListener = new Subject<any>();

  getNotificationListener(){
    return this.notificationListener.asObservable();
  }

  getNotifications(){
    return this.notifications;
  }

  updateNotifications(){
    this.notificationListener.next(this.notifications);
  }

  setFullPartyNotifications(v: boolean){
    this.notifications.partyFill = v;
    this.updateNotifications();
  }

  setPlayerJoinedNotifications(v: boolean) {
    this.notifications.partyJoin = v;
    this.updateNotifications();
  }

  setPlayerLeftNotifications(v: boolean) {
    this.notifications.partyLeave = v;
    this.updateNotifications();
  }

  setPlayerKickedNotifications(v: boolean) {
    this.notifications.partyKick = v;
    this.updateNotifications();
  }

  setReadyCheckNotifications(v: boolean){
    this.notifications.partyReady = v;
    this.updateNotifications();
  }

  setOptionsChangedNotifications(v: boolean){
    this.notifications.partyOptions = v;
    this.updateNotifications();
  }

  setReminderNotifications(v: boolean){
    this.notifications.partyReminder = v;
    this.updateNotifications();
  }

  saveNotifications(){
    var config = {
      notifications: this.notifications
    }
    var putData = {
      username: localStorage.getItem('username'),
      config: config
    } 
    this.http.put<{message: string}>(this.apiurl.hostname() + "/api/user/settings/", putData).subscribe((settingsData) =>{})
  }

  

  private rewardsListener = new Subject<any>();

  getRewardsListener(){
    return this.rewardsListener.asObservable();
  }

  updateRewards(){
    this.rewardsListener.next(this.rewards);
  }

  getRewards(){
    return this.rewards;
  }

  refreshRewards(){
    const postData = {user: localStorage.getItem('username')};
    this.http.post<{rewards: any}>(this.apiurl.hostname() + "/api/patreon/rewards/refresh", postData).subscribe(refreshData => {
      this.rewards = refreshData.rewards;
      this.updateRewards();
    })
  }

  constructor(private as: AuthService, private http: HttpClient, private apiurl: apiref) {
    this.http.get<{message: string, settings: any}>(this.apiurl.hostname() + "/api/user/settings/" + localStorage.getItem('username')).subscribe((settingsData) => {
      if(settingsData.settings){
        this.notifications = settingsData.settings.notifications;
        this.updateNotifications();
      }
      else {
      }
    });

    this.http.get<{result: any}>(this.apiurl.hostname() + "/api/user/rewards/get/" + localStorage.getItem('username')).subscribe( rewardsData => {
      if(rewardsData.result.rewards){
        this.rewards = rewardsData.result.rewards;
        this.updateRewards();
      }
      else {
      }
    });
  }
}
