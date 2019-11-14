import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MycharactersService {
  private verfMsgListener = new Subject<{pass: boolean, msg: string}>();

  getVerfMsgListener(){
    return this.verfMsgListener.asObservable();
  }

  updateVerfMsg(pass: boolean, msg: string){
    this.verfMsgListener.next({pass, msg});
  }
  
  constructor() { }
}
