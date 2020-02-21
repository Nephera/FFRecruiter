import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { apiref } from '../ref/str/apiref';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-patreon',
  templateUrl: './patreon.component.html',
  styleUrls: ['./patreon.component.scss']
})
export class PatreonComponent implements OnInit {

    // Dynamic parameters for this component's route: /partydirectory/:first/:second
    routeParams: Params;
    // Query parameters found in the URL: /partydirectory/firstParam/secondParam?query1=one&query2=two
    queryParams: Params;

  constructor(
    private ar: ActivatedRoute,
    private http: HttpClient,
    private apiurl: apiref,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) { 
    this.getRouteParams();
  }

  // Store parameter values on URL changes
  getRouteParams() {
    // Route parameters
    this.ar.params.subscribe( params => {
        this.routeParams = params;
    });

    // URL query parameters
    this.ar.queryParams.subscribe( params => {
        this.queryParams = params;
    });
  }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId) && this.queryParams.code != undefined){
      const postData = {
        username: localStorage.getItem("username"),
        code: this.queryParams.code,
        state: this.queryParams.state,
      }

      this.http.post<{message: string, error: string}>(this.apiurl.hostname() + "/api/patreon/oauth", postData)
      .subscribe((responseData) => {
        console.log(responseData);
        if(responseData.error){
          console.log("**Invalid Information** username: " + postData.username + " code: " + postData.code)
          this.router.navigate(['/welcome']);
        }
        else{
          console.log("OAuth successful.");
          this.router.navigate(['/settings']);
        }
      })
    } 
  }
}
