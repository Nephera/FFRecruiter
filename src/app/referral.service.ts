import { Injectable, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReferralService implements OnInit {

  constructor(private ar: ActivatedRoute) { }

  private referral = {
    username: null,
    source: null
  }

  // Query parameters found in the URL: /partydirectory/firstParam/secondParam?query1=one&query2=two
  private queryParams: Params;

  // Store parameter values on URL changes
  getParams() {
    // URL query parameters
    this.ar.queryParams.subscribe( params => {
      this.queryParams = params;

      if(this.queryParams.refu && this.queryParams.refs && this.referral.username == null){
        this.referral.username = this.queryParams.refu;
        this.referral.source = this.queryParams.refs;
      }        

    });
  }

  getReferral() {
    return this.referral;
  }

  ngOnInit(){
    this.getParams();
  }
}