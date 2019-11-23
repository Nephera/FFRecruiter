import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { partyIcons } from '../ref/img/partyIcons';
import { PartyPurpose } from '../../backend/models/partypurpose';
import { apiref } from '../ref/str/apiref';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ConfirmDialog } from '../dialog/confirm-dialog';
import { ErrorDialog } from '../dialog/error-dialog';

export interface DescriptionDialogData {
  instance: string;
  owner: string;
  ownerServer: string;
  description: string;
}

export interface ScheduleDialogData {
  instance: string;
  owner: string;
  ownerServer: string;
  schedule: string;
}

export interface JoinDialogData {
  characters: [string];
  jobs: [string];
}

export interface MessageDialogData {
}

export interface DismissDialogData {
}

@Component({
  selector: 'app-partycard',
  templateUrl: './partycard.component.html',
  styleUrls: ['./partycard.component.scss'],
  providers: [partyIcons]
})
export class PartycardComponent implements OnInit {

  @Input() public partyDetails: any;
  @Input() public characters: any;

  private authListenerSub: Subscription;
  isAuth = false;
  
  hidden: boolean = false;

  id: string;
  instance: string;
  instanceName: string;
  instanceimg: string;
  owner: string;
  ownerCharName: string;
  ownerServer: string;
  ownerDC: string;
  purpose: string;
  description: string;
  schedule: string;
  pw: string;
  slots: any[];

  privatePartyIcon: string;
  purposeIcon: string;
  syncIcon: string;
  syncTitle: string;
  verifiedIcon: string;
  verifiedTitle: string;
  purposeTitle: string;
  purposeIconObj: PartyPurpose;
  instanceIconGradient: string;

  // TODO: Temp, should be pulling from database, never seen by user
  hasPassword(): boolean {
    if(this.pw == "")
      return false;
    return true;
  }

  toggleDescription(): void {
    const dialogRef = this.dialog.open(PartycardDescriptionDialog,
      {
        autoFocus: false,
        width: '90vw',
        maxWidth: '600px',
        maxHeight: '85%',
        data: {
          instance: this.instanceName,
          owner: this.owner,
          ownerServer: this.ownerServer,
          description: this.description
        }
      });
  }

  isDescription(str: string): boolean {
    if(str != "")
      return true;
    return false;
  }

  toggleSchedule(): void {
    const dialogRef = this.dialog.open(PartycardScheduleDialog,
      {
        autoFocus: false,
        width: '90vw',
        maxWidth: '600px',
        maxHeight: '85%',
        data: {
          instance: this.instanceName,
          owner: this.owner,
          ownerServer: this.ownerServer,
          schedule: this.schedule
        }
      });
  }

  confirmLeave() {
    this.http.post<{ message: string }>(this.apiurl.hostname() + "/api/user/parties/leave", { id: this.id, username: localStorage.getItem("username") })
    .subscribe(response => {
      const dialogRef = this.dialog.open(ConfirmDialog,
        {
          autoFocus: false,
          width: '90vw',
          maxWidth: '600px',
          maxHeight: '85%',
          data: {
            title: "Left Party",
            text: response.message
          }
        });
    }, error => {
      const dialogRef = this.dialog.open(ErrorDialog,
        {
          autoFocus: false,
          width: '90vw',
          maxWidth: '600px',
          maxHeight: '85%',
          data: {
            title: error.error.title,
            text: error.error.message
          }
        });
    });
  }

  confirmLink(): void {
    return; // TODO: Temporary, need to implement functionality.
  }

  toggleHidden(): void {
    this.hidden = !this.hidden;
  }

  confirmMessage(): void {
    return; // TODO: Temporary, need to implement functionality.

    // const dialogRef = this.dialog.open(PartycardMessageDialog,
    //   {
    //     autoFocus: false,
    //     width: '250px',
    //   });
  }

  confirmDismiss(): void {
    return; // TODO: Temporary, need to implement functionality.

    // const dialogRef = this.dialog.open(PartycardDismissDialog,
    //   {
    //     autoFocus: false,
    //     width: '250px',
    //   });
  }

  constructor(public dialog: MatDialog, private icons: partyIcons, private http: HttpClient, private apiurl: apiref, private as: AuthService) {
  }

  ngOnInit() {
    this.as.autoAuthUser();
    this.isAuth = this.as.getIsAuth();
    this.authListenerSub = this.as.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
    });

    this.id = this.partyDetails._id;
    this.instance = this.partyDetails.instance;
    this.instanceName = this.partyDetails.instanceName;
    this.instanceimg = this.partyDetails.instanceimg;
    this.owner = this.partyDetails.owner;
    this.ownerCharName = this.partyDetails.ownerCharName;
    this.ownerServer = this.partyDetails.ownerServer;
    this.ownerDC = this.partyDetails.ownerDC;
    this.description = this.partyDetails.description;
    this.pw = this.partyDetails.pw;
    this.purpose = this.partyDetails.purpose;
    this.slots = [];

    this.privatePartyIcon = this.icons.privateParty.icon;
    this.purposeIconObj = this.icons.get(this.purpose);
    this.purposeIcon = this.purposeIconObj.icon;
    this.purposeTitle = this.purposeIconObj.title;

    var sync = this.icons.get(this.partyDetails.sync);
    this.syncTitle = this.partyDetails.sync;
    this.syncIcon = sync.icon;

    var verf = this.icons.get(this.partyDetails.verf);
    if(this.partyDetails.verf){
      this.verifiedTitle = "Verified Users Only";
      this.verifiedIcon = this.icons.get(this.verifiedTitle).icon;
    }
    else{
      this.verifiedTitle = "Open to All Users";
      this.verifiedIcon = this.icons.get(this.verifiedTitle).icon;
    }

    this.instanceIconGradient = this.icons.get("instanceIconGradient").icon;
  }
}

@Component({
  selector: 'partycard-description-dialog',
  templateUrl: 'partycard-description-dialog.html',
})
export class PartycardDescriptionDialog {
  constructor(
    public dialogRef: MatDialogRef<PartycardDescriptionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DescriptionDialogData) { }

  onOk() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'partycard-schedule-dialog',
  templateUrl: 'partycard-schedule-dialog.html',
})
export class PartycardScheduleDialog {
  constructor(
    public dialogRef: MatDialogRef<PartycardScheduleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ScheduleDialogData) { }

  onOk() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'partycard-join-dialog',
  templateUrl: 'partycard-join-dialog.html',
  encapsulation: ViewEncapsulation.None
})
export class PartycardJoinDialog {
  constructor(
    public dialogRef: MatDialogRef<PartycardJoinDialog>,
    @Inject(MAT_DIALOG_DATA) public data: JoinDialogData) { }

  onCancel() {
    this.dialogRef.close();
  }

  onJoin() {
  }
}

@Component({
  selector: 'partycard-message-dialog',
  templateUrl: 'partycard-message-dialog.html',
})
export class PartycardMessageDialog {
  constructor(
    public dialogRef: MatDialogRef<PartycardMessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData) { }

  onCancel() {
    this.dialogRef.close();
  }

  onSend() {
  }

}

@Component({
  selector: 'partycard-dismiss-dialog',
  templateUrl: 'partycard-dismiss-dialog.html',
})
export class PartycardDismissDialog {
  constructor(
    public dialogRef: MatDialogRef<PartycardDismissDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DismissDialogData) { }

  onCancel() {
    this.dialogRef.close();
  }

  onDismiss() {
  }

}
