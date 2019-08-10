import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit, OnDestroy {

  private authListenerSub: Subscription;
  private authMsgListenerSub: Subscription;
  userIsAuthenticated = false;
  errorMsg = "";
  
  constructor(public authService: AuthService) { }

  isLogging(){
    this.authService.isLogging();
  }
  
  onLogin(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.authService.login(form.value.email, form.value.email, form.value.password);
  }

  ngOnInit()
  {
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.authMsgListenerSub = this.authService.getAuthMsgListener().subscribe(error => {
      this.errorMsg = error;
    })
  }

  ngOnDestroy()
  {
    this.authListenerSub.unsubscribe();
    this.authMsgListenerSub.unsubscribe();
  }
}
