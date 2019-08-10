import { Component, OnInit } from '@angular/core';
import { ControlpanelService } from './controlpanel.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.scss']
})

export class ControlpanelComponent implements OnInit {

  name = 'Login';
  authUserListenerSub: Subscription;
  authListenerSub: Subscription;
  userIsAuthenticated = false;

  constructor(private cps: ControlpanelService, private as: AuthService) {}

  ngOnInit() {
    this.as.autoAuthUser();
    this.userIsAuthenticated = this.as.getIsAuth();
    this.authListenerSub = this.as.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    const n = localStorage.getItem('username');

    if(n && this.userIsAuthenticated){
      this.name = n;
    }
    else{
      this.name = "Login";
    }

    this.authUserListenerSub = this.as.getAuthUserListener().subscribe(username => {
      this.name = username; });
  }

  ngOnDestroy()
  {
    this.authUserListenerSub.unsubscribe();
    this.authListenerSub.unsubscribe();
  }
  
  toggleSN() {
    this.cps.setSNO(!this.cps.getSNO());
  }
}
