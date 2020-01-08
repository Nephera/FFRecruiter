import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { partyIcons } from '../ref/img/partyIcons';
import { PartyPurpose } from '../../backend/models/partypurpose';
import { apiref } from '../ref/str/apiref';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ConfirmDialog } from '../dialog/confirm-dialog';
import { ErrorDialog } from '../dialog/error-dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface DescriptionDialogData {
  instance: string;
  owner: string;
  ownerServer: string;
  description: string;
}

export interface UpdateDialogData {
  party: any;
  characters: any;
  purposes: any;
  jobs: any;
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
  @Input() public purposes: any;
  @Input() public jobs: any;

  private authListenerSub: Subscription;
  isAuth = false;
  
  hidden: boolean = false;

  id: string;
  shortID: string;
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
  isPrivate: boolean = false;
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

  hasPassword(): boolean {
    return this.isPrivate;
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

  isOwner(){
    return this.owner == localStorage.username;
  }

  isDescription(str: string): boolean {
    if(str != "")
      return true;
    return false;
  }
  
  updatePartyOptions(){
    const dialogRef = this.dialog.open(PartycardUpdateDialog,
      {
        autoFocus: false,
        width: '90vw',
        maxWidth: '700px',
        maxHeight: '100vh',
        data: {
          party: this.partyDetails,
          characters: this.characters,
          purposes: this.purposes,
          jobs: this.jobs
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.partyDetails = result.party;
        this.refresh();
        this.sb.open("Party Updated", "", {duration: 3000});
      }
    })
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

  toggleHidden(): void {
    this.hidden = !this.hidden;
  }

  refresh(){
    this.id = this.partyDetails._id;
    this.shortID = this.partyDetails.shortID;
    this.instance = this.partyDetails.instance;
    this.instanceName = this.partyDetails.instanceName;
    this.instanceimg = this.partyDetails.instanceimg;
    this.owner = this.partyDetails.ownerName;
    this.ownerCharName = this.partyDetails.ownerCharName;
    this.ownerServer = this.partyDetails.ownerServer;
    this.ownerDC = this.partyDetails.ownerDC;
    this.description = this.partyDetails.description;
    this.isPrivate = this.partyDetails.private;
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

  copyID(inputElement) {
    var dummy = document.createElement('input'),
    text = "https://www.ffrecruiter.com/partydirectory/" + this.shortID;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    this.sb.open("Copied Party Link to Clipboard", "", {duration: 3000});
  }


  constructor(public dialog: MatDialog, private icons: partyIcons, private http: HttpClient, private apiurl: apiref, private as: AuthService, private sb: MatSnackBar) {
  }

  ngOnInit() {
    this.isAuth = this.as.getIsAuth();
    this.authListenerSub = this.as.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
    });

    this.refresh();
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
  selector: 'partycard-update-dialog',
  templateUrl: 'partycard-update-dialog.html'
})
export class PartycardUpdateDialog {
  form: FormGroup;

  selectedCharacter: any;
  submitted: boolean = false;

  defaultCharacter: any;
  defaultPurpose: any;
  defaultSync: any;
  defaultComposition: any;
  defaultJob: any;
  defaultAJobs: any;
  defaultVerf: any;
  defaultPW: any;
  defaultPWCB: any;
  defaultDescription: any;

  constructor(
    public dialogRef: MatDialogRef<PartycardUpdateDialog>,
    private fb: FormBuilder,
    private http: HttpClient,
    private apiurl: apiref,
    public dialog: MatDialog,
    private sb: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: UpdateDialogData) {

    this.form = fb.group({
      character: [Object, Validators.required],
      purpose: ["", Validators.required],
      sync: ["", Validators.required],
      prefj: ["", Validators.required],
      altj: [""],
      verf: false,
      pwcb: false,
      pw: [""],
      description: [""],
      slot0: [""],
      slot1: [""],
      slot2: [""],
      slot3: [""],
      slot4: [""],
      slot5: [""],
      slot6: [""],
      slot7: [""],
      slot8: [""],
      slot9: [""],
      slot10: [""],
      slot11: [""],
      slot12: [""],
      slot13: [""],
      slot14: [""],
      slot15: [""],
      slot16: [""],
      slot17: [""],
      slot18: [""],
      slot19: [""],
      slot20: [""],
      slot21: [""],
      slot22: [""],
      slot23: [""],
      slot24: [""],
      slot25: [""],
      slot26: [""],
      slot27: [""],
      slot28: [""],
      slot29: [""],
      slot30: [""],
      slot31: [""],
      slot32: [""],
      slot33: [""],
      slot34: [""],
      slot35: [""],
      slot36: [""],
      slot37: [""],
      slot38: [""],
      slot39: [""],
      slot40: [""],
      slot41: [""],
      slot42: [""],
      slot43: [""],
      slot44: [""],
      slot45: [""],
      slot46: [""],
      slot47: [""],
      slot48: [""],
      slot49: [""],
      slot50: [""],
      slot51: [""],
      slot52: [""],
      slot53: [""],
      slot54: [""],
      slot55: [""]});
  }

  isUnsynced(){
    return this.data.party.sync == "Unsynced";
  }

  isSynced(){
    return this.data.party.sync == "Synced";
  }

  pwcb(){
    (this.form.get('pwcb').value == true) ? this.form.get('pw').enable() : this.form.get('pw').disable();
  }

  ngOnInit(){
    // Prefill form with previously used values (on party creation / last change)
    // Give time for form to validate before changing 
    setTimeout(() => {

      for(var i = 0; i < this.data.characters.length; i++){
        if(this.data.characters[i].name == this.data.party.ownerCharName && this.data.characters[i].server == this.data.party.ownerServer){
          this.defaultCharacter = this.data.characters[i];
        }
      }
      this.defaultPurpose = this.data.party.purpose;
      // Set Sync taken care of in html and isUnsynced()/isSynced(); special case due to radio group
      this.defaultSync = this.data.party.sync;

      // Set Composition Slots, Preferred Job and Alternate Jobs
      this.defaultComposition = [];
      for(var i = 0; i < this.data.party.composition.length; i++){
        // If this slot is the leader (you)
        if(this.data.party.composition[i].userOccupying.cName == this.data.party.ownerCharName && 
          this.data.party.composition[i].userOccupying.cServer == this.data.party.ownerServer){
            this.defaultJob = this.data.party.composition[i].userOccupying.cJob;
            this.defaultAJobs = this.data.party.composition[i].userOccupying.cBUJobs;
          } 
        this.defaultComposition.push(this.data.party.composition[i].slotJobs[0]);
        if(this.data.party.composition[i].slotOccupied == true){
          this.form.get('slot' + i).disable(); 
        }
      }

      this.defaultVerf = this.data.party.verf
      this.defaultPWCB = false;
      this.defaultPW = "";
      this.defaultDescription = this.data.party.description;

      this.onReset();
    }, 100)
  }

  onCancel(){
    this.dialogRef.close();
  }

  onReset(){
    this.form.get('character').setValue(this.defaultCharacter);
    this.form.get('purpose').setValue(this.defaultPurpose);
    this.form.get('sync').setValue(this.defaultSync);
    this.form.get('prefj').setValue(this.defaultJob);
    this.form.get('altj').setValue(this.defaultAJobs);
    this.defaultComposition.forEach((slot, index) => {this.form.get('slot' + index).setValue(this.defaultComposition[index])});
    this.form.get('verf').setValue(this.defaultVerf);
    this.form.get('pwcb').setValue(this.defaultPWCB);
    this.form.get('pw').setValue(this.defaultPW);
    this.form.get('pw').disable();
    this.form.get('description').setValue(this.defaultDescription);
  }

  onUpdate(){
    var composition = [];
    for(var i = 0; i < this.data.party.composition.length; i++){
      composition.push(this.form.get('slot' + i).value);
    }

    const postData = {
      party: this.data.party,
      username: localStorage.username,
      form: this.form.value,
      composition: composition
    }
    
    this.http.post<{ message: string, error: string, party: any }>(this.apiurl.hostname() + "/api/parties/updateOptions", postData)
    .subscribe(response => {
      if(response.error != null){
        const dialogRef = this.dialog.open(ErrorDialog,
          {
            autoFocus: false,
            width: '90vw',
            maxWidth: '600px',
            maxHeight: '85%',
            data: {
              title: "Unable to Update Party",
              text: response.error
            }
          });
      }
      else{
        this.dialogRef.close({party: response.party}); 
      }      
    });    
  }
}
