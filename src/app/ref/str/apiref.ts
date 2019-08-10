import { Injectable } from '@angular/core';

@Injectable()
export class apiref {
  // 45.23.123.139:3000
  hostURL = "localhost:3000";

  hostname() {
    return this.hostURL;
  }
}