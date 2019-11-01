import {Injectable} from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {AuthData} from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ControlpanelService } from '../header/controlpanel/controlpanel.service';
import { apiref } from '../ref/str/apiref';

@Injectable({ providedIn: "root"})
export class AuthService {
  private token: string;
  private username: string;
  private avatar: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private authUserListener = new Subject<string>();
  private authMsgListener = new Subject<string>();
  private authAvatarListener = new Subject<string>();
  private isAuthenticated = false;
  private logging = false;

  constructor(private http: HttpClient, private router: Router, private cps: ControlpanelService, private apiurl: apiref){}

  isLogging() {
    return this.logging;
  }

  getToken() {
    return this.token;
  }

  getUsername() {
    return this.username;
  }

  getAvatar() {
    return this.avatar;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener()
  {
    return this.authStatusListener.asObservable();
  }

  getAuthUserListener()
  {
    return this.authUserListener.asObservable();
  }

  getAuthMsgListener()
  {
    return this.authMsgListener.asObservable();
  }

  getAuthAvatarListener()
  {
    return this.authAvatarListener.asObservable();
  }

  createUser(username: string, email: string, password: string) {
    const authData: AuthData = {username: username, email: email, password: password};
    this.http.post<{message: string, result: any}>("http://" + this.apiurl.hostname() + "/api/user/register", authData)
      .subscribe(response => {
        this.login(username, email, password);
      }, error => {
        this.authMsgListener.next(error.error.message);
      });
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();

    if(!authInfo) {
      localStorage.removeItem("username");
      return;
    }

    const now = new Date();
    const expiresIn = authInfo.expiration.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInfo.token;
      this.username = authInfo.username;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.authUserListener.next(authInfo.username);
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  login(username: string, email: string, password: string) {
    const authData: AuthData = {username: username, email: email, password: password};
    this.logging = true;
    this.http.post<{token: string, expiresIn: number, username: string}>("http://" + this.apiurl.hostname() + "/api/user/login", authData)
      .subscribe(responseA => {
        const token = responseA.token;
        this.token = token;
        if(token){
          const expiresInDuration = responseA.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.authStatusListener.next(true);
          this.authUserListener.next(responseA.username);
          this.username = responseA.username;
          this.isAuthenticated = true;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.cps.setSNO(false);
          this.logging = false;
          this.http.get<{characters: any}>("http://" + this.apiurl.hostname() + "/api/characters/get/" + this.username)
          .subscribe(responseB => {
            if(responseB.characters.length > 0){
              this.avatar = responseB.characters[0].avatar;
              this.authAvatarListener.next(this.avatar)
            }else{
              this.avatar = "https://img2.finalfantasyxiv.com/f/b093cbb13882f8f1f638f9d751ec084e_96ab1df8877c1f8ba6a89a39cccfd437fc0_96x96.jpg?1567043077"; // TODO
              this.authAvatarListener.next(this.avatar);
            }
            this.saveAuthData(responseA.token, expirationDate, responseA.username, this.avatar);
            this.router.navigate(['/partydirectory']);
          })
        }
      }, error => {
        this.authMsgListener.next(error.error.message);
      });
  }

  logout() {
    this.token = null;
    this.authStatusListener.next(false);
    this.authUserListener.next("Login");
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
    this.cps.setSNO(false);
  }
  
  private saveAuthData(token: string, expirationDate: Date, username: string, avatar: string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('username', username);
    localStorage.setItem('avatar', avatar)
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
  }

  private getAuthData(){
    const authToken = localStorage.getItem('token');
    const authExpiration = localStorage.getItem('expiration');
    const authUsername = localStorage.getItem('username');
    const authAvatar = localStorage.getItem('avatar');
    if(!authToken || !authExpiration || !authUsername || !authAvatar){
      return;
    }
    return {
      token: authToken,
      username: authUsername,
      expiration: new Date(authExpiration),
      avatar: authAvatar
    }
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);

  }
}
