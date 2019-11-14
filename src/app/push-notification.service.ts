import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { apiref } from './ref/str/apiref';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private http: HttpClient, private apiurl: apiref, private swp: SwPush) {
    this.http.get<{publicKey: string}>(this.apiurl.hostname() + "/api/vapid/").subscribe(res => {
      this.publickey = res.publicKey;
    })
  }

  private publickey: string;

  public async sub(): Promise<PushSubscription> {
    try{
      if(this.key()){
        await this.swp.requestSubscription({
          serverPublicKey: this.key()
        }).then(result => {
          return result;
        })
      }
    }
    catch (err) {
      console.error('Could not subscribe due to:', err);
      return null;
    }
  }

  public key(){
    return this.publickey;
  }

  public sendSubToServer(subscription: PushSubscription) {
    return this.http.post(this.apiurl.hostname() + "/api/parties/pushsubscription", subscription);
  }

  public sendNotification() {
    const postbody = {partyID: "123456"};
    return this.http.post(this.apiurl.hostname() + "/api/parties/pushnotification", postbody).subscribe(res => {});
  }
}
