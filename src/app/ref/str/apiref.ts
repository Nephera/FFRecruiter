import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class apiref {
  hostname() {
    if(environment.production){
      return "https://54.187.212.214:3000";
    }
    else{
      return "http://localhost:3000";
    }
  }
}