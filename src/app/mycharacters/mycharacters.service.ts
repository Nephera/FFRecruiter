import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MycharactersService {
  private verfMsgListener = new Subject<string>();

  getVerfMsgListener(){
    return this.verfMsgListener.asObservable();
  }

  updateVerfMsg(msg: string){
    this.verfMsgListener.next(msg);
  }
  
  constructor() { }
}
