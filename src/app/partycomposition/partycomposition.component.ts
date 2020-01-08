import { Component, OnInit, Input, ViewEncapsulation, Inject, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
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
import { MycharactersService } from '../mycharacters/mycharacters.service';

export interface JoinDialogData {
  instance: string,
  owner: string,
  ownerServer: string,
  slotNum: number,
  partyID: string,
  characters: any[],
  isAuth: boolean,
  jobsWanted: string[],
  levelReq: number,
  private: boolean
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
  slotNum: number,
  discordID: number,
  discordTag: string
}

export interface BlankDialogData {}

@Component({
  selector: 'app-partycomposition',
  templateUrl: './partycomposition.component.html',
  styleUrls: ['./partycomposition.component.scss'],
  providers: [partyIcons]
})
export class PartycompositionComponent implements OnInit, OnChanges {

  @Input() public partyDetails: any;
  slots: any[] = [];
  slotFilled: any;
  characters = [];
  isLoading = false;
  hasFetchedCharacters = false;
  private authListenerSub: Subscription;
  isAuth = false;

  isAuthenticated(){
    return this.isAuth;
  }

  getCharacterList() {
    if(!this.isAuth)
      return;

    this.characters = this.mcs.getCharacters().filter(character => (character.datacenter == this.partyDetails.ownerDC));

    this.mcs.getCharactersListener().subscribe(characterData => {
      this.characters = characterData.filter(character => (character.datacenter == this.partyDetails.ownerDC));
    })


    this.hasFetchedCharacters = true;
    this.isLoading = true;
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
    private CDR: ChangeDetectorRef,
    private mcs: MycharactersService) { }

  ngOnInit() {
    this.isAuth = this.as.getIsAuth();
    this.authListenerSub = this.as.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
    });

    this.slotFilled = this.icons.get("SlotFilled").icon;
    
    this.slots = [];
    for(var i = 0; i < this.partyDetails.composition.length; i++)
      this.slots.push(this.partyDetails.composition[i])

    this.getCharacterList();
  }

  ngOnChanges(changes: SimpleChanges){
    for(let property in changes){
      if(property === "partyDetails"){
        this.partyDetails = changes[property].currentValue;

        // Timeout is to prevent ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.slots = [];
          for(var i = 0; i < this.partyDetails.composition.length; i++){
            this.slots.push(this.partyDetails.composition[i]);
          }

          // TODO: Unhackify this. Issue #31. To force an update on the position of the
          // component after modification, we open a modal and immediately close it.
          const dialogRef2 = this.dialog.open(PartyCompositionBlankDialog, {hasBackdrop: false})
          dialogRef2.close();
        })
      }
    }

  }

  onClick(index: number){
    if(this.isPopulated(index)) {
      // Get Details for Player using Name/Server
      this.http.get<{ message: string, character: any}>(this.apiurl.hostname() + 
        "/api/characters/get/name/" + 
        this.slots[index].userOccupying.cServer + "/" + 
        this.slots[index].userOccupying.cName + "/" +
        this.slots[index].userOccupying.name).subscribe((characterData) => {

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
                slotNum: index//,
                //discordID: 147578085569593344, // TODO:
                //discordTag: "Neph#3398" // TODO:
              }
            });
          dialogRef.afterClosed().subscribe(result => {
            if(result != null && result.data != null){
              if(result.data.error != null){
                const dialogRef2 = this.dialog.open(ErrorDialog,
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

              if(result.data.party != null){
                this.slots[index] = result.data.party.composition[index];
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
          var partyIDs = partiesData.parties.map(party => { return party.id; })
          if(partyIDs.indexOf(this.partyDetails._id) > -1)
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
                  jobsWanted: [this.getSlotTitle(index)],
                  private: this.partyDetails.private
                }
              })
            dialogRef.afterClosed().subscribe(result => {
              if(result && result.data.party.composition){
                this.slots[index] = result.data.party.composition[index];             
              }
            })
          }
        })
      }
    }
  }

  rowStyle(i: number){
    return "position: absolute; top: 34px; left: -32px;";
  }

  getRow(i: number, j: number){
    return i == j;
  }

  slotOverlay(){
    return this.icons.get("empty").icon;
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
        pw: [String],
        charSelected: [Object, Validators.required],
        jobSelected: [String, Validators.required],
        altJobs: [[String]]
      });
    };

  ngOnInit(){
    this.form.get('pw').setValue("");
  }

  joinDisabled(){
    if(this.data.private){
      return !this.characterIsSelected || !this.jobIsSelected || (this.form.get('pw').value == "")
    } else {
      return !this.characterIsSelected || !this.jobIsSelected;
    }
    
  }

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

    let fullJobList = ['PLD', 'WAR', 'DRK', 'GNB', 'WHM', 'SCH', 'AST', 'MNK', 'DRG',
      'NIN', 'SAM', 'BRD', 'MCH', 'DNC', 'BLM', 'SMN', 'RDM', 'BLU'];

    let filteredJobs = [];

    // Tanks: PLD 0, WAR 1, DRK 2, GNB 3
    filteredJobs.push({name: "PLD", lvl: jobs[0]}, {name: "WAR", lvl: jobs[1]}, 
     {name: "DRK", lvl: jobs[2]}, {name: "GNB", lvl: jobs[3]});  

    // Healers: WHM 4, SCH 5, AST 6
    filteredJobs.push({name: "WHM", lvl: jobs[4]}, {name: "SCH", lvl: jobs[5]}, {name: "AST", lvl: jobs[6]});

    // DPS
    // MDPS: MNK 7, DRG 8, NIN 9, SAM 10
    filteredJobs.push({name: "MNK", lvl: jobs[7]}, {name: "DRG", lvl: jobs[8]}, 
      {name: "NIN", lvl: jobs[9]}, {name: "SAM", lvl: jobs[10]});

    // RDPS: BRD 11, MCH 12, DNC 13
    filteredJobs.push({name: "BRD", lvl: jobs[11]}, {name: "MCH", lvl: jobs[12]}, {name: "DNC", lvl: jobs[13]});

    // CDPS: BLM 14, SMN 15, RDM 16, 
    filteredJobs.push({name: "BLM", lvl: jobs[14]}, {name: "SMN", lvl: jobs[15]}, {name: "RDM", lvl: jobs[16]});

    // BLU 17
    filteredJobs.push({name: "BLU", lvl: jobs[17]});

    if(filterLevel){
      for(var i = 0; i < filteredJobs.length; i++){
        if(filteredJobs[i].lvl < filterLevel){
          filteredJobs[i].lvl = 0;
        }
      }
    }

    if(filterJobs) {
      for(var i = 0; i < filteredJobs.length; i++) {
        if(i <= 3) { // Tanks, 0-3
          if(!filterJobs.includes("TANK")) { // If superset tank isn't in filter
            if(!filterJobs.includes(fullJobList[i])) { // Nor the job class explicitly
              filteredJobs[i].lvl = 0;
            }
          }
        } 
        else if(i > 3 && i <= 6) { // Healers, 4-6
          if(!filterJobs.includes("HEAL")) { // If superset heal isn't in filter
            if(!filterJobs.includes(fullJobList[i])) { // Nor the job class explicitly
              filteredJobs[i].lvl = 0;
            }
          }
        } 
        else if(i > 6 && i <= 16) { // DPS, 7-17
          if(!filterJobs.includes("DPS")) { // If superset dps isn't in filter
            if(i > 6 && i <= 10) { // Melee, 7-10
              if(!filterJobs.includes("MDPS")) {  // Nor subset mdps
                if(!filterJobs.includes(fullJobList[i])) { // Nor the job class explicitly
                  filteredJobs[i].lvl = 0;
                }
              }
            }
            else if(i > 10 && i <= 13) { // Ranged, 11-13
              if(!filterJobs.includes("RDPS")) {  // Nor subset cdps
                if(!filterJobs.includes(fullJobList[i])) { // Nor the job class explicitly
                  filteredJobs[i].lvl = 0;
                }
              }
            } 
            else if(i > 13 && i <= 16) { // Casters, 14-16
              if(!filterJobs.includes("CDPS")) {  // Nor subset rdps
                if(!filterJobs.includes(fullJobList[i])) { // Nor the job class explicitly
                  filteredJobs[i].lvl = 0;
                }
              }
            } 
          }
        }
        else if(i == 17){ // BLU
          if(!filterJobs.includes("BLU")) {
            filteredJobs[i].lvl = 0;
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

  isPrivate(){
    return this.data.private; // TODO:
  }

  characterDisabled(){
    return true; // TODO:
  }

  jobDisabled(){
    return true; // TODO:
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

      this.http.post<{message: string, party: any, error: string}>(this.apiurl.hostname() + "/api/parties/join", postData)
      .subscribe((responseData) => {
        if(responseData.error){
          const dialogErrRef = this.dialog.open(ErrorDialog,
          {
            autoFocus: false,
            width: '90vw',
            maxWidth: '600px',
            maxHeight: '85%',
            data: {
              title: "Cannot Join Party", 
              text: responseData.error
            }
          })
        }
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
    @Inject(MAT_DIALOG_DATA) public data: DetailsDialogData, private sb: MatSnackBar) { }

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
        this.sb.open("Party Disbanded", "", {duration: 3000});
    });
  }

  onKick(){
    const postData = {
      username: localStorage.getItem("username"),
      partyID: this.data.id,
      kickUser: this.data.slotUsername,
      slotNum: this.data.slotNum
    }

    this.http.post<{message: string, party: any}>(this.apiurl.hostname() + "/api/parties/kickplayer", postData)
    .subscribe(responseData => {
      this.dialogRef.close({data: responseData});
    },
    error => {
      this.dialogRef.close();
    })
  }

  onLeave(){
    var postData = {
      id: this.data.id,
      username: this.data.slotUsername
    }

    this.http.post<{message: string, party: any}>(this.apiurl.hostname() + "/api/parties/leave", postData)
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
