import {Injectable, Inject, Optional, PLATFORM_ID} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Request} from 'express';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import { TransferState, StateKey, makeStateKey } from '@angular/platform-browser';
import { of } from 'rxjs';
import { isPlatformServer } from '@angular/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(
    private transferState: TransferState, 
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(REQUEST) protected request?: Request){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let serverReq: HttpRequest<any> = req;
    if (this.request) {
      let newUrl = `${this.request.protocol}://${this.request.get('host')}`;
      if (!req.url.startsWith('/')) {
        newUrl += '/';
      }
      newUrl += req.url;      
      serverReq = req.clone({url: newUrl});
    }

    // EXPERIMENT START

    if (req.method !== 'GET') {
      return next.handle(req);
    }
 
    const key: StateKey<string> = makeStateKey<string>(req.url);
 
    if (isPlatformServer(this.platformId)) {
      return next.handle(req).pipe(tap((event) => {
        this.transferState.set(key, (<HttpResponse<any>> event).body);
      }));
    } else {
      const storedResponse = this.transferState.get<any>(key, null);
      if (storedResponse) {
        const response = new HttpResponse({body: storedResponse, status: 200});
        this.transferState.remove(key);
        return of(response);
      } else {
        return next.handle(req);
      }
    }

    // EXPERIMENT END

    return next.handle(serverReq);
  }
}