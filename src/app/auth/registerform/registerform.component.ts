import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiref } from 'src/app/ref/str/apiref';


@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.scss']
})
export class RegisterformComponent implements OnInit {

  private authMsgListenerSub: Subscription;
  errorMsg = "";
  isHidden = false;

  constructor(public authService: AuthService, private http: HttpClient, private apiurl: apiref) { }

  isRegistering(){
    return this.authService.isRegistering();
  }

  onRegister(form: NgForm) {
    if((form.value.email != form.value.emailv)) {
      this.errorMsg = "Emails do not match, try again.";
      return;
    }

    if((form.value.password != form.value.passwordv)) {
      this.errorMsg = "Passwords do not match, try again.";
      return;
    }

    this.errorMsg = "";

    this.authService.createUser(form.value.username, form.value.email, form.value.password);

    this.isHidden = true;
  }

  ngOnInit() {
    this.authMsgListenerSub = this.authService.getAuthMsgListener().subscribe(error => {
      this.errorMsg = error;
    })
  }

  ngOnDestroy() {
    this.authMsgListenerSub.unsubscribe();
  }

}
