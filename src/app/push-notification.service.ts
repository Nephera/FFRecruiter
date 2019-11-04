import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { apiref } from './ref/str/apiref';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private http: HttpClient, private apiurl: apiref) {}

  public sendSubToServer(subscription: PushSubscription ) {
    return this.http.post(this.apiurl.hostname() + "/api/parties/pushsubscription", subscription);
  }

  public sendNotification() {
    const postbody = {partyID: "123456"};
    return this.http.post(this.apiurl.hostname() + "/api/parties/pushnotification", postbody).subscribe(res => {});
  }
}
