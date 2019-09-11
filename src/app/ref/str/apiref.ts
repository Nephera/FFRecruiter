import { Injectable } from '@angular/core';

@Injectable()
export class apiref {
  hostURL = "localhost:3000";

  hostname() {
    return this.hostURL;
  }
}