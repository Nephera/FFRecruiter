import { Component, OnInit, OnDestroy } from '@angular/core';
import { ControlpanelService } from './header/controlpanel/controlpanel.service';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
  userIsAuthenticated = false;

  // Initialize Service Providers
  constructor(
    private cps: ControlpanelService, 
    private as: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer){
      this.matIconRegistry.addSvgIcon("nav_static", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/Icon_NavStatic.svg"));
      this.matIconRegistry.addSvgIcon("nav_party", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/Icon_NavParty.svg"));
    }

  ngOnInit()
  {     
    this.as.autoAuthUser();
    this.userIsAuthenticated = this.as.getIsAuth();
    this.authListenerSub = this.as.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy()
  {
    this.authListenerSub.unsubscribe();
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
