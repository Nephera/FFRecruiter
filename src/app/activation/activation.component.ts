import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiref } from '../ref/str/apiref';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {

  state: string;

  timeLeft: number = 10;
  interval: any;
  message: string;
  error: string;

  // Dynamic parameters for this component's route: /partydirectory/:first/:second
  routeParams: Params;
  // Query parameters found in the URL: /partydirectory/firstParam/secondParam?query1=one&query2=two
  queryParams: Params;

  email = "";
  token = "";

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      }
    },1000)
  }

  verify(){
    if(this.email == null || this.token == null){
      this.router.navigate(['welcome']);
    }

    const postData = {
      email: this.email,
      token: this.token
    }

    this.http.post<{message: string, error: string}>(this.apiurl.hostname() + "/api/user/register/verify", postData).subscribe((verfData) => {
      if(verfData.error == null){
        this.state = 'verified';
        this.as.setVerf(true);
        setTimeout(() => {this.router.navigate(['mycharacters'])}, 3000);
      }
      else{
        this.state = 'error';
        this.message = verfData.message;
        this.error = verfData.error;
      }

    })
  }

  retryVerf() {
    this.timeLeft = 10;
    this.verify();
  }

  constructor(private ar: ActivatedRoute, private http: HttpClient, private apiurl: apiref, private router: Router, private as: AuthService) { }

  ngOnInit() {
    // Route parameters
    this.ar.params.subscribe( params => {
      this.routeParams = params;
    });

    // URL query parameters
    this.ar.queryParams.subscribe( params => {
        this.queryParams = params;
    });

    this.email = this.queryParams.email;
    this.token = this.queryParams.token;

    this.state = "verifying";
    this.retryVerf();
  }
}
