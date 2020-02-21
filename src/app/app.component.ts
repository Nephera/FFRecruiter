import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ControlpanelService } from './header/controlpanel/controlpanel.service';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from './dialog/confirm-dialog';
import { HttpClient } from '@angular/common/http';
import { apiref } from './ref/str/apiref';
import { Meta } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ReferralService } from './referral.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  LoginOpen: boolean = false;
  RegisterOpen: boolean = false;
  RecoveryOpen: boolean = false;
  SNO: boolean = false;
  title = 'FF Recruiter';

  private authListenerSub: Subscription;
  private verfListenerSub: Subscription;
  userIsAuthenticated = false;
  userIsVerified = false;
  verfSent = false;

  // Initialize Service Providers
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cps: ControlpanelService, 
    private as: AuthService,
    private matIconRegistry: MatIconRegistry,
    private dialog: MatDialog,
    private http: HttpClient,
    private apiurl: apiref,
    private domSanitizer: DomSanitizer,
    private meta: Meta,
    private rs: ReferralService){
      // Must use absolute path for Angular Universal (Server Side Rendering)
      const svgStaticURL = "assets/icons/Icon_NavStatic.svg";
      const svgPartyURL = "assets/icons/Icon_NavParty.svg";
      //const domain = (isPlatformBrowser(platformId)) ? '' : ''; 
      const domain = (isPlatformServer(platformId)) ? 'http://localhost:4000/' : ''; 
      this.matIconRegistry.addSvgIcon("nav_static", this.domSanitizer.bypassSecurityTrustResourceUrl(domain + svgStaticURL));
      this.matIconRegistry.addSvgIcon("nav_party", this.domSanitizer.bypassSecurityTrustResourceUrl(domain + svgPartyURL));

    }

  ngOnInit()
  {
    this.userIsAuthenticated = this.as.getIsAuth();
    this.authListenerSub = this.as.getAuthStatusListener().subscribe(isAuthenticated => {this.userIsAuthenticated = isAuthenticated;});
    this.verfListenerSub = this.as.getVerfStatusListener().subscribe(isVerified => {this.userIsVerified = isVerified;});
    
    this.as.autoAuthUser();
    this.rs.getParams();

    this.meta.addTags([
      {property: 'og:site_name', content: 'FFR'},
      {property: 'og:title', content: 'FFRecruiter: Final Fantasy XIV Recruiting Tool'},
      {property: 'og:description', content: "FFRecruiter is a mobile-friendly web application designed for FFXIV adventurers looking for a group to play with.  Whether you're just learning the basics or you're tackling ultimates, FFR has something for you.  Join today and take advantage of our superior features and reach."},
      {property: 'og:image', content: 'https://imagizer.imageshack.com/img924/3685/sQUzot.png'},
      {property: 'og:image:width', content: '400'},
      {property: 'og:image:height', content: '400'},
      {name: 'theme-color', content: '#0485f8'}
    ]);
  }

  patreonLogin(){
    window.open("https://www.patreon.com/oauth2/authorize?response_type=code&client_id=l6ASeI3NV2onZUYrLp1sqw4-qshbKwn6FkMy3poWUypQAStMCZhsgLPp2CMKXqpD&redirect_uri=https://www.ffrecruiter.com/patreon");
  }

  sendVerfEmail(){
    // Disable Verify Button
    this.verfSent = true;

    this.http.post<{message: string}>(this.apiurl.hostname() + "/api/user/register/verf-retry", {username: this.as.getUsername()})
    .subscribe((verfData) => {
      console.log(verfData);
    });

    const dialogRef = this.dialog.open(ConfirmDialog, 
      { 
        autoFocus: false,
        width: '90vw',
        maxWidth: '700px',
        maxHeight: '100vh',
        data: { title: "Activation Email Sent", text: "Please check the email account that you have on file with us for further details." } 
      }
    )
  }

  ngOnDestroy()
  {
    this.authListenerSub.unsubscribe();
    this.verfListenerSub.unsubscribe();
  }

  OnDestroy(){}

  SNOpen() {    
    return this.cps.getSNO();
  }

  SNClose() {
    this.cps.setSNO(false);
  }

  toggleLogin() {
    this.LoginOpen = !this.LoginOpen;
    this.RegisterOpen = false;
    this.RecoveryOpen = false;
  }
  toggleRegister() {
    this.RegisterOpen = !this.RegisterOpen;
    this.LoginOpen = false;
    this.RecoveryOpen = false;
  }
  toggleRecovery() {
    this.RecoveryOpen = !this.RecoveryOpen;
    this.LoginOpen = false;
    this.RegisterOpen = false;
  }

  toggleLogout() {
    this.as.logout();
  }
}
