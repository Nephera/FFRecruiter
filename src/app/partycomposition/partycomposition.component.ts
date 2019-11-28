import { Component, OnInit, Input, ViewEncapsulation, Inject, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { partyIcons } from '../ref/img/partyIcons';
import { HttpClient } from '@angular/common/http';
import { apiref } from '../ref/str/apiref';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ErrorDialog } from '../dialog/error-dialog';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from '../push-notification.service';
import { NotificationsDialog } from '../dialog/notifications-dialog';

export interface JoinDialogData {
  instance: string,
  owner: string,
  ownerServer: string,
  slotNum: number,
  partyID: string,
  characters: any[],
  isAuth: boolean,
  jobsWanted: string[],
  levelReq: number
}

export interface DetailsDialogData {
  id: string,
  instance: string,
  ownerUN: string,
  owner: string,
  ownerServer: string,
  slotAvatar: string,
  slotFFLogs: string,
  slotLodestone: string,
  slotProfile: string,
  slotUsername: string,
  slotCharacterName: string,
  slotServerName: string,
  slotDatacenterName: string,
  slotJob: string,
  slotAltJobs: string[],
  slotNum: number
}

export interface BlankDialogData {}

@Component({
  selector: 'app-partycomposition',
  templateUrl: './partycomposition.component.html',
  styleUrls: ['./partycomposition.component.scss'],
  providers: [partyIcons]
})
export class PartycompositionComponent implements OnInit {

  @Input() public partyDetails: any;
  slots: any[] = [];
  slotFilled: any;
  characters = [];
  isLoading = false;
  hasFetchedCharacters = false;
  private authListenerSub: Subscription;
  isAuth = false;
  rendered = true;

  isAuthenticated(){
    return this.isAuth;
  }

  getCharacterList() {
    if(!this.isAuth)
      return;

    this.isLoading = true;
    this.http.get<{ message: string, characters: any }>(this.apiurl.hostname() + "/api/characters/get/" + localStorage.getItem("username")).subscribe((characterData) => {
      this.characters = characterData.characters;
      this.isLoading = false;
      this.hasFetchedCharacters = true;
    });
  }

  getTableHeight(){
    return (34*(Math.ceil(this.slots.length/8)) + 12);
  }

  isPopulated(index: number){
    if(this.slots[index].slotOccupied)
      return true;
    return false;
  }

  constructor(public dialog: MatDialog,
    private icons: partyIcons,
    private http: HttpClient,
    private apiurl: apiref,
    private as: AuthService,
    private CDR: ChangeDetectorRef) { }

  ngOnInit() {
    this.as.autoAuthUser();
    this.isAuth = this.as.getIsAuth();
    this.authListenerSub = this.as.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
    });

    this.slotFilled = this.icons.get("SlotFilled").icon;
    
    for(var i = 0; i < this.partyDetails.composition.length; i++)
      this.slots.push(this.partyDetails.composition[i])

    this.getCharacterList();
  }

  onClick(index: number){
    if(this.isPopulated(index)) {
      // Get Details for Player using Name/Server
      // Issue is that this.slots isn't being used, so updates aren't being caught
      this.http.get<{ message: string, character: any}>(this.apiurl.hostname() + 
        "/api/characters/get/" + 
        this.slots[index].userOccupying.cServer + "/" + 
        this.slots[index].userOccupying.cName).subscribe((characterData) => {

          // Display Details
          const dialogRef = this.dialog.open(PartycompositionPlayerDetailsDialog,
            {
              autoFocus: false,
              width: '90vw',
              maxWidth: '600px',
              maxHeight: '85%',
              data: {
                id: this.partyDetails._id,
                instance: this.partyDetails.instanceName,
                owner: this.partyDetails.ownerCharName,
                ownerUN: this.partyDetails.ownerName,
                ownerServer: this.partyDetails.ownerServer,
                slotAvatar: characterData.character.avatar,
                slotFFLogs: "https://www.fflogs.com/character/na/" + characterData.character.server + "/" + characterData.character.name,
                slotLodestone: "https://na.finalfantasyxiv.com/lodestone/character/" + characterData.character.lodestoneID,
                slotProfile: "Profile",
                slotUsername: this.slots[index].userOccupying.name,
                slotCharacterName: this.slots[index].userOccupying.cName,
                slotServerName: this.slots[index].userOccupying.cServer,
                slotDatacenterName: this.slots[index].userOccupying.cDC,
                slotJob: this.slots[index].userOccupying.cJob,
                slotAltJobs: this.slots[index].userOccupying.cBUJobs,
                slotNum: index,
              }
            });
          dialogRef.afterClosed().subscribe(result => {
            if(result && result.data){
              if(result.data.error){
                const dialogRef = this.dialog.open(ErrorDialog,
                  {
                    autoFocus: false,
                    width: '90vw',
                    maxWidth: '600px',
                    maxHeight: '85%',
                    data: {
                      title: result.data.title,
                      text: result.data.message
                    }
                  })

                return;
              }

              if(result.data.party){
                // TODO: Unhackify this. Issue #31. To force an update on the position of the
                // component after modification, we open a modal and immediately close it.
                this.slots[index] = result.data.party.composition[index];
                const dialogRef2 = this.dialog.open(PartyCompositionBlankDialog, {})
                dialogRef2.close();
              }
            }
          })
      });
    }
    else {
      if(!this.isAuth) {
        const dialogRef = this.dialog.open(ErrorDialog,
          {
            autoFocus: false,
            width: '90vw',
            maxWidth: '600px',
            maxHeight: '85%',
            data: {
              title: "Unable to Join: Authenticate",
              text: "You must first log into FF Recruiter"
            }
          })
      }
      else { // User is logged in
        // Make sure not already part of this party
        this.http.get<{ message: string, parties: any}>(this.apiurl.hostname() + 
        "/api/user/get/parties/" + 
        localStorage.getItem("username")).subscribe((partiesData) => {
          // If the ID is contained in the parties already joined, throw error
          if(partiesData.parties.indexOf(this.partyDetails._id) > -1)
          {
            const dialogRef = this.dialog.open(ErrorDialog,
              {
                autoFocus: false,
                width: '90vw',
                maxWidth: '600px',
                maxHeight: '85%',
                data: {
                  title: "Unable to Join: Already Joined",
                  text: "You are already part of this party, you cannot fill more than one slot."
                }
              })
          }
          else { // Otherwise pull up dialog for user to enter character info to join
            const dialogRef = this.dialog.open(PartycompositionJoinDialog,
              {
                autoFocus: false,
                width: '90vw',
                maxWidth: '600px',
                maxHeight: '85%',
                data: {
                  partyID: this.partyDetails._id,
                  instance: this.partyDetails.instanceName,
                  owner: this.partyDetails.ownerCharName,
                  ownerServer: this.partyDetails.ownerServer,
                  slotNum: index,
                  characters: this.characters,
                  isAuth: this.isAuth,
                  jobsWanted: [this.getSlotTitle(index)]
                  //levelReq: 1 // TODO: Should get levelReq from partyDetails.instanceLevel
                }
              })
            dialogRef.afterClosed().subscribe(result => {
              if(result && result.data.party.composition){
                // TODO: Unhackify this. Issue #31. To force an update on the position of the
                // component after modification, we open a modal and immediately close it.
                this.slots[index] = result.data.party.composition[index];
                const dialogRef2 = this.dialog.open(PartyCompositionBlankDialog, {})
                dialogRef2.close();              
              }
            })
          }
        })
      }
    }
  }

  
  slotFillOverlay(index: number){
    if(this.isPopulated(index)) { return this.icons.get("Slot Filled").icon; }
    else{ return this.icons.get("empty").icon; }
  }

  slotLeaderOverlay(index: number){
    if(this.isLeader(index)) { return this.icons.get("Party Leader").icon; }
    else{ return this.icons.get("empty").icon; }
  }

  isLeader(index: number){
    return (this.slots[index].userOccupying.name == this.partyDetails.ownerName);
  }

  getSlotHighlight(index: number){
    if(this.slots[index].userOccupying.name == localStorage.getItem("username")){return this.icons.get("Slot Highlight").icon}
    else{return this.icons.get("empty").icon;}
  }

  getSlotImage(index: number){
    // If the slot is occupied, display class of player in slot
    if(this.isPopulated(index)) {
      var icon = this.icons.get(this.slots[index].userOccupying.cJob);
      if(icon){ return icon; }
      else{ return this.icons.get("empty"); }
    }
    // Else, display the default slot image
    else {
      var icon = this.icons.get(this.slots[index].slotJobs[0]);
      if(icon){ return icon; }
      else{ return this.icons.get("empty"); }
    }
  }

  getSlotTitle(index: number) {
    if(this.isPopulated(index)){
      return this.slots[index].userOccupying.cName
    }
    else{
      var i: number;
      var str: string = "";
      for(i = 0; this.slots[index].slotJobs != null && i < this.slots[index].slotJobs.length; i++)
        str = str.concat(this.slots[index].slotJobs);  

      return str;
    }
  }

  ngOnDestroy()
  {
    this.authListenerSub.unsubscribe();
  }
}

@Component({
  selector: 'partycomposition-blank-dialog',
  templateUrl: 'partycomposition-blank-dialog.html',
  encapsulation: ViewEncapsulation.None
})
export class PartyCompositionBlankDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: BlankDialogData){}
  ngOnInit(){}
}

@Component({
  selector: 'partycomposition-join-dialog',
  templateUrl: 'partycomposition-join-dialog.html',
  encapsulation: ViewEncapsulation.None
})
export class PartycompositionJoinDialog {

  form: FormGroup;

  characterIsSelected = false;
  jobIsSelected = false;

  selectedCharacter: any;

  jobList = [];
  
  constructor(
    private swp: SwPush, private pns: PushNotificationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PartycompositionJoinDialog>,
    @Inject(MAT_DIALOG_DATA) public data: JoinDialogData,
    private fb: FormBuilder,
    private http: HttpClient,
    private apiurl: apiref) {
      this.form = fb.group({
        charSelected: [Object, Validators.required],
        jobSelected: [String, Validators.required],
        altJobs: [[String]]
      });
    };

  selectCharacter(){
    this.characterIsSelected = true;

    this.jobList = this.filterJobs(this.form.get("charSelected").value.jobs, this.data.jobsWanted, this.data.levelReq);

    if(this.jobList.length > 0) {
      this.form.get("jobSelected").setValue(this.jobList[0]);
      this.form.get("jobSelected").reset();
    }
  }

  selectJob(){
    this.jobIsSelected = true;
  }

  filterJobs(jobs: number[], filterJobs?: string[], filterLevel?: number, specializedOnly?: boolean){

    let fullJobList = ['PLD', 'GLA', 'WAR', 'MRD', 'DRK', 'GNB', 'WHM', 'CNJ', 'SCH', 'ACN', 'AST', 'MNK', 'PGL', 'DRG', 'LNC',
      'NIN', 'ROG', 'SAM', 'BRD', 'ARC', 'MCH', 'DNC', 'BLM', 'THM', 'SMN', 'ACN', 'RDM', 'BLU'];

    let filteredJobs = [];

    // Tanks: PLD 0, GLA 1, WAR 2, MRD 3, DRK 4, GNB 5
    filteredJobs.push({name: "PLD", lvl: jobs[0]}, {name: "GLA", lvl: jobs[0]}, {name: "WAR", lvl: jobs[1]}, 
      {name: "MRD", lvl: jobs[1]}, {name: "DRK", lvl: jobs[2]}, {name: "GNB", lvl: jobs[3]});  

    // Healers: WHM 6, CNJ 7, SCH 8, ACN 9, AST 10
    filteredJobs.push({name: "WHM", lvl: jobs[4]}, {name: "CNJ", lvl: jobs[4]}, {name: "SCH", lvl: jobs[5]}, 
      {name: "ACN", lvl: jobs[5]}, {name: "AST", lvl: jobs[6]});

    // DPS
    // MDPS: MNK 11, PGL 12, DRG 13, LNC 14, NIN 15, ROG 16, SAM 17
    filteredJobs.push({name: "MNK", lvl: jobs[7]}, {name: "PGL", lvl: jobs[7]}, {name: "DRG", lvl: jobs[8]}, 
      {name: "LNC", lvl: jobs[8]}, {name: "NIN", lvl: jobs[9]}, {name: "ROG", lvl: jobs[9]}, 
      {name: "SAM", lvl: jobs[10]});

    // RDPS: BRD 18, ARC 19, MCH 20, DNC 21
    filteredJobs.push({name: "BRD", lvl: jobs[11]}, {name: "ARC", lvl: jobs[11]}, {name: "MCH", lvl: jobs[12]}, 
      {name: "DNC", lvl: jobs[13]});

    // CDPS: BLM 22, THM 23, SMN 24, ACN 25, RDM 26, BLU 27
    filteredJobs.push({name: "BLM", lvl: jobs[14]}, {name: "THM", lvl: jobs[14]}, {name: "SMN", lvl: jobs[15]}, 
      {name: "ACN", lvl: jobs[15]}, {name: "RDM", lvl: jobs[16]}, {name: "BLU", lvl: jobs[17]});

    if(filterLevel){
      for(var i = 0; i < filteredJobs.length; i++){
        if(filteredJobs[i].lvl < filterLevel){
          filteredJobs[i].lvl = 0;
        }
      }
    }

    if(filterJobs) {
      for(var i = 0; i < filteredJobs.length; i++) {
        if(i <= 5) { // Tanks, 0-5
          if(!filterJobs.includes("TANK")) { // If superset tank isn't in filter
            if(!filterJobs.includes(fullJobList[i])) { // Nor the job class explicitly
              filteredJobs[i].lvl = 0;
            }
          }
        } 
        else if(i > 5 && i <= 10) { // Healers, 6-10
          if(!filterJobs.includes("HEAL")) { // If superset heal isn't in filter
            if(!filterJobs.includes(fullJobList[i])) { // Nor the job class explicitly
              filteredJobs[i].lvl = 0;
            }
          }
        } 
        else if(i > 10 && i <= 27) { // DPS, 11-27
          if(!filterJobs.includes("DPS")) { // If superset dps isn't in filter
            if(i > 10 && i <= 17) { // Melee, 11-17
              if(!filterJobs.includes("MDPS")) {  // Nor subset mdps
                if(!filterJobs.includes(fullJobList[i])) { // Nor the job class explicitly
                  filteredJobs[i].lvl = 0;
                }
              }
            }
            else if(i > 17 && i <= 22) { // Ranged, 18-22
              if(!filterJobs.includes("RDPS")) {  // Nor subset cdps
                if(!filterJobs.includes(fullJobList[i])) { // Nor the job class explicitly
                  filteredJobs[i].lvl = 0;
                }
              }
            } 
            else if(i > 22 && i <= 27) { // Casters, 23-27
              if(!filterJobs.includes("CDPS")) {  // Nor subset rdps
                if(!filterJobs.includes(fullJobList[i])) { // Nor the job class explicitly
                  filteredJobs[i].lvl = 0;
                }
              }
            } 
          }
        } 
        
      }
    }

    let ret = [];
    for(var i = 0; i < filteredJobs.length; i++){
      if(filteredJobs[i].lvl > 0){
        ret.push(filteredJobs[i].name); 
      }
    }

    return ret;
  }

  get f() { return this.form.controls; }

  joinHeaderPartyString(index: number)
  {
    return "Party: " + (Math.floor(index/8)+1) + ", Slot: " + ((index%8)+1);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onJoin() {
    this.form.addControl('party', new FormControl(this.data.partyID));
    this.form.addControl('slotNum', new FormControl(this.data.slotNum));

    // Handle Notification Dialog
    if(!this.swp.isEnabled || Notification.permission == "denied"){
      var postData = {
        form: this.form.value,
        sub: null
      }

      this.http.post<{message: string, party: any}>(this.apiurl.hostname() + "/api/parties/join", postData)
      .subscribe((responseData) => {
        this.dialogRef.close({data: responseData});
      });
    }

    else if(this.swp.isEnabled && Notification.permission == "granted"){
      this.swp.requestSubscription({
        serverPublicKey: this.pns.key()
      }) // Returns unique subscription for user
      .then(pnsub => {

        var postData = {
          form: this.form.value,
          sub: pnsub
        }

        this.http.post<{message: string, party: any}>(this.apiurl.hostname() + "/api/parties/join", postData)
        .subscribe((responseData) => {
          this.dialogRef.close({data: responseData});
        });
      })
    }

    else if(this.swp.isEnabled && Notification.permission == "default"){
      if(localStorage.getItem("disableNotificationDialogReminder") != "true"){ // If not explicitly denied a reminder
        const dialogRef = this.dialog.open(NotificationsDialog,
        {
          autoFocus: false,
          width: '90vw',
          maxWidth: '600px',
          maxHeight: '85%'
        })
        .afterClosed().subscribe(result => {
          if(!result.data.cancelled){ // Assume player wants notifications
            Notification.requestPermission()
            .then(async permission => {
              if(Notification.permission == "granted"){
                this.swp.requestSubscription({
                  serverPublicKey: this.pns.key()
                }) // Returns unique subscription for user
                .then(pnsub => {
                  var postData = {
                    form: this.form.value,
                    sub: pnsub
                  }
          
                  this.http.post<{message: string, party: any}>(this.apiurl.hostname() + "/api/parties/join", postData)
                  .subscribe((responseData) => {
                    this.dialogRef.close({data: responseData});
                  });
                })
                .catch(err => {
                  console.log(err.err.message);
                })
              }
              else{ // Notification.permission == denied/default
                var postData = {
                  form: this.form.value,
                  sub: null
                }
          
                this.http.post<{message: string, party: any}>(this.apiurl.hostname() + "/api/parties/join", postData)
                .subscribe((responseData) => {
                  this.dialogRef.close({data: responseData});
                });
              }
            });
          }
          else{ // User doesn't want notifications
            var postData = {
              form: this.form.value,
              sub: null
            }
      
            this.http.post<{message: string, party: any}>(this.apiurl.hostname() + "/api/parties/join", postData)
            .subscribe((responseData) => {
              this.dialogRef.close({data: responseData});
            });
          }
        })
      }
      else{ // Explicitly denied reminders
        var postData = {
          form: this.form.value,
          sub: null
        }
  
        this.http.post<{message: string, party: any}>(this.apiurl.hostname() + "/api/parties/join", postData)
        .subscribe((responseData) => {
          this.dialogRef.close({data: responseData});
        });
      }
    }
  }
}

@Component({
  selector: 'partycomposition-player-details-dialog',
  templateUrl: 'partycomposition-player-details-dialog.html',
  encapsulation: ViewEncapsulation.None
})
export class PartycompositionPlayerDetailsDialog {
  constructor(
    private http: HttpClient, private apiurl: apiref, private dialog: MatDialog,
    public dialogRef: MatDialogRef<PartycompositionPlayerDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DetailsDialogData) { }

  userOwns(n: string){
    return (localStorage.getItem("username") == n);
  }

  userIsPartyOwner(){
    return (localStorage.getItem("username") == this.data.ownerUN);
  }

  onDisband(){
    var postData = {
      username: localStorage.getItem("username"),
      partyID: this.data.id
    };

    this.http.post<{message: string, party: any}>(this.apiurl.hostname() + "/api/parties/disband", postData)
      .subscribe((responseData) => {
        this.dialogRef.close({data: responseData});
    });
  }

  onLeave(){
    var postData = {
      id: this.data.id,
      username: this.data.slotUsername
    }

    this.http.post<{message: string, party: any}>(this.apiurl.hostname() + "/api/user/parties/leave", postData)
      .subscribe((responseData) => {
        this.dialogRef.close({data: responseData});
    });
  }

  descriptionHeaderPartyString(index: number)
  {
    return "Party: " + (Math.floor(index/8)+1) + ", Slot: " + ((index%8)+1);
  }

  onOk() {
    this.dialogRef.close({data: null});
  }
}
