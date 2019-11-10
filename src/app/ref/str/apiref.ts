import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class apiref {
  hostname() {
      /* DEVELOPMENT */
      return "http://localhost:3000";
      /* PRODUCTION */
      // return "https://www.ffrecruiter.com"; 
  }

  vapid() {
    return "BIc7wlKYVm4HvUxlfeaqRSJ6LlaR9s1Pz-_zI5HaWoPVfc2aC1uhVt-A2hH1cKS82J4vYNh-5fNKAhRM4ZeYsgM";
  }
}