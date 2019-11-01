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

  private notificationListener = new Subject<any>();

  getNotificationListener(){
    return this.notificationListener.asObservable();
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
    this.http.put<{message: string}>("http://" + this.apiurl.hostname() + "/api/user/settings/", putData).subscribe((settingsData) =>{})
  }

  constructor(private as: AuthService, private http: HttpClient, private apiurl: apiref) {
    http.get<{message: string, settings: any}>("http://" + apiurl.hostname() + "/api/user/settings/" + localStorage.getItem('username')).subscribe((settingsData) => {
      if(settingsData.settings){
        this.notifications.partyFill = settingsData.settings.notifications.partyFill;
        this.notifications.partyJoin = settingsData.settings.notifications.partyJoin;
        this.notifications.partyLeave = settingsData.settings.notifications.partyLeave;
        this.notifications.partyKick = settingsData.settings.notifications.partyKick;
        this.notifications.partyReady = settingsData.settings.notifications.partyReady;
        this.notifications.partyOptions = settingsData.settings.notifications.partyOptions;
        this.notifications.partyReminder = settingsData.settings.notifications.partyReminder;
        this.updateNotifications();
      }
      else {
      }
    });
  }
}
