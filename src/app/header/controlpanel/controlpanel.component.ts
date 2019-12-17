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
  avatar = "../../../assets/icons/icon_default_avatar.png";
  authUserListenerSub: Subscription;
  authListenerSub: Subscription;
  authAvatarListenerSub: Subscription;
  userIsAuthenticated = false;

  constructor(private cps: ControlpanelService, private as: AuthService) {}

  ngOnInit() {
    this.as.autoAuthUser();
    this.userIsAuthenticated = this.as.getIsAuth();
    this.authListenerSub = this.as.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    const n = localStorage.getItem('username');
    var a = localStorage.getItem('avatar');

    if(n && this.userIsAuthenticated){
      this.name = n;
    }
    else{
      this.name = "Login";
    }

    if(a && this.userIsAuthenticated){
      if(a == null || a == ""){
        a = "../../../assets/icons/icon_default_avatar.png";
      }
      this.avatar = a;
    }
    else{
      this.avatar = "";
    }

    this.authUserListenerSub = this.as.getAuthUserListener().subscribe(username => {
      this.name = username; });

    this.authAvatarListenerSub = this.as.getAuthAvatarListener().subscribe(avatar => {
      this.avatar = avatar;
    })
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
