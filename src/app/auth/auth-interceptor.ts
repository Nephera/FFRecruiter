import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler){
    if(req.url.startsWith("https://xivapi.com/", 0))
      return next.handle(req);

    const authToken = this.authService.getToken();
    
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', "Bearer " + authToken)
    });

    return next.handle(authRequest);
   }
}