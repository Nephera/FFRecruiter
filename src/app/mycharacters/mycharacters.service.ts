import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiref } from '../ref/str/apiref';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MycharactersService {
  private verfMsgListener = new Subject<{pass: boolean, msg: string}>();
  private charactersListener = new Subject<any>();

  private characters = [ ];

  constructor(private http: HttpClient, private apiurl: apiref, @Inject(PLATFORM_ID) private platformId: Object) { }

  getCharactersListener(){ return this.charactersListener.asObservable(); }
  getCharacters(){ return this.characters; }
  getVerfMsgListener(){ return this.verfMsgListener.asObservable(); }
  updateVerfMsg(pass: boolean, msg: string){ this.verfMsgListener.next({pass, msg}); }
  
  refreshCharacterList(){
    if (isPlatformBrowser(this.platformId)) {
      if(localStorage.username != undefined){
        this.http.get<{ message: string, characters: any }>(this.apiurl.hostname() + "/api/characters/get/all/" + localStorage.username)
        .subscribe((characterData) => {
          this.characters = characterData.characters;
          this.charactersListener.next(this.characters);
        });
      }
    }
  }

  ngOnInit(){
    console.log("init");
    console.log(this.characters);
    if(this.characters.length == 0){
      this.refreshCharacterList();
    }
  }
  
  
}
