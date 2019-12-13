import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class apiref {
  hostname() {
    if(environment.production == true)
      return "";
    else
      return "http://localhost:3000";
  }
}