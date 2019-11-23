import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class apiref {
  hostname() {
      /* DEVELOPMENT */
      return "http://localhost:3000";
      /* PRODUCTION */
      //return "https://www.ffrecruiter.com"; 
  }
}