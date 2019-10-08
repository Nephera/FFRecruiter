import { Injectable } from '@angular/core';
import { ControlpanelComponent } from './controlpanel.component';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ControlpanelService {

  private SNOpen = false;
  SNOUpdated = new Subject();

  getSNO(): boolean {
    return this.SNOpen;
  }

  setSNO(open: boolean) {
    this.SNOpen = open;
    this.SNOUpdated.next();
  }

  constructor() {}
}