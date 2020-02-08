import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ControlpanelService } from '../header/controlpanel/controlpanel.service';
import { apiref } from '../ref/str/apiref';
import { MatDialog } from '@angular/material';
import { ConfirmDialog } from '../dialog/confirm-dialog';
import { MycharactersService } from '../mycharacters/mycharacters.service';

@Injectable({ providedIn: "root"})
export class AuthService {
  private token: string;
  private username: string;
  private avatar: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private verfStatusListener = new Subject<boolean>();
  private authUserListener = new Subject<string>();
  private authMsgListener = new Subject<string>();
  private authAvatarListener = new Subject<string>();
  private patreonAuthListener = new Subject<boolean>();
  private isAuthenticated = false;
  private logging = false;
  private registering = false;
  private isVerified = false;
  private isPatreonAuth = false;

  constructor(
    private http: HttpClient,
    private apiurl: apiref, 
    private router: Router, 
    private cps: ControlpanelService, 
    private mcs: MycharactersService,
    private dialog: MatDialog){}

  isLogging() { return this.logging; }
  isRegistering() { return this.registering; }

  getToken() { return this.token; }
  getUsername() { return this.username; }
  getAvatar() { return this.avatar; }
  getIsAuth() { return this.isAuthenticated; }

  getAuthStatusListener() { return this.authStatusListener.asObservable(); }
  getVerfStatusListener() { return this.verfStatusListener.asObservable(); }
  getAuthUserListener() { return this.authUserListener.asObservable(); }
  getAuthMsgListener() { return this.authMsgListener.asObservable(); }
  getAuthAvatarListener() { return this.authAvatarListener.asObservable(); }
  getPatreonAuthListener() { return this.patreonAuthListener.asObservable(); }
  
  getIsVerf(){ return this.isVerified; }
  setVerf(v: boolean){ this.verfStatusListener.next(v); }

  getIsPatreonAuth(){ return this.isPatreonAuth; }

  createUser(username: string, email: string, password: string) {
    const authData: AuthData = {username: username, email: email, password: password};
    this.registering = true;
    this.http.post<{message: string, result: any}>(this.apiurl.hostname() + "/api/user/register", authData)
    .subscribe(() => {
      this.registering = false;
      this.dialog.open(ConfirmDialog, 
        { 
          autoFocus: false,
          width: '90vw',
          maxWidth: '700px',
          maxHeight: '100vh',
          data: { title: "Verify Your Account", text: "Welcome to FFR, the next step is to verify that you own this email address.  Please check your email for a link to verify your account with us.  Verification is required to take full advantage of the features that we offer." } 
        }
      )
      .afterClosed().subscribe(() => {this.login(username, email, password);});        
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

      this.http.get<{verf: boolean}>(this.apiurl.hostname() + "/api/user/register/verify/get/" + this.username)
      .subscribe(verfResponse => {
        this.isVerified = verfResponse.verf;
        this.verfStatusListener.next(verfResponse.verf);
      })

      this.http.get<{auth: boolean}>(this.apiurl.hostname() + "/api/user/patreon/checkAuth/" + this.username)
      .subscribe(authResponse => {
        this.isPatreonAuth = authResponse.auth;
        this.patreonAuthListener.next(authResponse.auth);
      })
    }
  }

  login(username: string, email: string, password: string) {
    const authData: AuthData = {username: username, email: email, password: password};
    this.logging = true;
    this.http.post<{token: string, expiresIn: number, username: string, verf: boolean}>(this.apiurl.hostname() + "/api/user/login", authData)
      .subscribe(loginData => {
        const token = loginData.token;
        this.token = token;
        if(token){
          const expiresInDuration = loginData.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.authStatusListener.next(true);
          this.authUserListener.next(loginData.username);
          this.username = loginData.username;
          this.isAuthenticated = true;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.cps.setSNO(false);
          this.logging = false;
          this.saveAuthData(loginData.token, expirationDate, loginData.username);
          this.verfStatusListener.next(loginData.verf);
          this.mcs.getCharactersListener().subscribe(characterData => {
            (characterData.length > 0) ? 
              this.avatar = characterData[0].avatar : 
              this.avatar = "../../../assets/icons/icon_default_avatar.png";
            
            this.authAvatarListener.next(this.avatar);
            localStorage.setItem('avatar', this.avatar);
          })

          this.mcs.refreshCharacterList();

          this.router.navigate(['/partydirectory']);
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
  
  private saveAuthData(token: string, expirationDate: Date, username: string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('username', username);
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
