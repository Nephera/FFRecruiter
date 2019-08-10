import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { apiref } from '../ref/str/apiref';

export interface CreateDialogData {
  slotCount: number; // can change depending on instance, should fetch from slots
  slots: [number]; // should be object array
  jobs: [string]; // should be object array
  instances: [any]; // should be object array
  purposes: [string];
  characters: [string]; // should be object array
}

@Component({
  selector: 'app-myparties',
  templateUrl: './myparties.component.html',
  styleUrls: ['./myparties.component.scss']
})
export class MypartiesComponent implements OnInit {

  isLoading: boolean = false;
  hasFetchedCharacters: boolean = false;
  hasFetchedInstances: boolean = false;
  hasFetchedPurposes: boolean = false;
  hasFetchedJobs: boolean = false;  
  hasFetchedParties: boolean = false;

  parties = [];
  instances: any[];
  characters: any[];
  jobs: any[];
  purposes: any[];

  timeLeft: number = 10;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      }
    },1000)
  }

  retryFetchData() {
    this.timeLeft = 10;
    this.getMyParties();
    this.getCharacterList();
    this.getInstanceList();
    this.getJobList();
    this.getPurposeList();
  }

  getMyParties(): any {
    this.isLoading = true;
    this.http.get<{ message: string, parties: any[] }>("http://" + this.apiurl.hostname() + "/api/parties/hosted").subscribe((partyData) => {
      this.parties = partyData.parties;
      this.isLoading = false;
      this.hasFetchedParties = true;
    });

    this.http.get<{ message: string, parties: any[] }>("http://" + this.apiurl.hostname() + "/api/parties/joined").subscribe((partyData) => {
    });
  }

  getInstanceList() {
    this.isLoading = true;
    this.http.get<{ message: string, instances: any }>("http://" + this.apiurl.hostname() + "/api/instances").subscribe((instanceData) => {
      this.instances = instanceData.instances;
      this.isLoading = false;
      this.hasFetchedInstances = true;
    });
  }

  getCharacterList() {
    this.isLoading = true;
    this.http.get<{ message: string, characters: any }>("http://" + this.apiurl.hostname() + "/api/characters/get/" + localStorage.getItem("username")).subscribe((characterData) => {
      this.characters = characterData.characters;
      this.isLoading = false;
      this.hasFetchedCharacters = true;
    });
  }

  getJobList() {
    this.jobs = ['TANK', 'DRK', 'PLD', 'WAR', 'GLA', 'MRD', 'GNB', 'DPS',
  'MDPS', 'ROG', 'NIN', 'SAM', 'PGL', 'MNK', 'LNC', 'DRG',
  'CDPS', 'ACN', 'SMN', 'THM', 'BLM', 'RDM',
  'RDPS', 'ARC', 'BRD', 'MCH', 'DNC', 
  'HEAL', 'WHM', 'CNJ', 'SCH', 'AST'];

    this.hasFetchedJobs = true;
  }

  getPurposeList() {
    this.purposes = ['Other', 'Progression', 'Clear', '0-1 Chest',
  '2 Chest', 'Farm', 'Parse', 'Speed Run']

    this.hasFetchedPurposes = true;
  }

  confirmCreate() {
    const dialogRef = this.dialog.open(MypartiesCreatepartyDialog,
      {
        autoFocus: false,
        width: '90vw',
        maxWidth: '700px',
        maxHeight: '100vh',
        data: {
          currentPartyCount: 1,
          maximumPartyCount: 10,
          slotCount: 8,
          slots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
          28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
          purposes: this.purposes,
          instances: this.instances,
          characters: this.characters,
          jobs: this.jobs
        }
      });

    dialogRef.afterClosed().subscribe(data => {});
  }

  constructor(public dialog: MatDialog, private http: HttpClient, private apiurl: apiref) {
  }

  ngOnInit() {
    this.startTimer();
    this.getJobList();
    this.getPurposeList();
    this.getMyParties();
    this.getCharacterList();
    this.getInstanceList();
  }
}

@Component({
  selector: 'myparties-createparty-dialog',
  templateUrl: 'myparties-createparty-dialog.html'
})
export class MypartiesCreatepartyDialog implements OnInit {

  form: FormGroup;
  description: string;
  submitted = false;

  selectedCharacter: any;
  selectedInstance: any;

  selectInstance(){
    this.setInstanceSlots(this.selectedInstance.playerCount);

    var jobs: string[];
    jobs = this.getJobsBySlotCount(this.selectedInstance.playerCount);
    
    // Add values of slots to composition
    for(var i = 0; i < this.selectedInstance.playerCount; i++)
      this.form.get('slot' + i).setValue(jobs[i]);
  }

  getJobsBySlotCount(num: number)
  {
    switch(num)
    {
      case 4:
        return [ "TANK", "HEAL", "DPS", "DPS" ];
      case 8:
        return [ "TANK", "TANK", "HEAL", "HEAL", "MDPS", "MDPS", "RDPS", "CDPS" ];
      case 24:
        return [ "TANK", "HEAL", "HEAL", "DPS", "DPS", "DPS", "DPS", "DPS",
        "TANK", "HEAL", "HEAL", "DPS", "DPS", "DPS", "DPS", "DPS",
        "TANK", "HEAL", "HEAL", "DPS", "DPS", "DPS", "DPS", "DPS" ];
      case 48:
        return [ "TANK", "HEAL", "HEAL", "DPS", "DPS", "DPS", "DPS", "DPS",
        "TANK", "HEAL", "HEAL", "DPS", "DPS", "DPS", "DPS", "DPS",
        "TANK", "HEAL", "HEAL", "DPS", "DPS", "DPS", "DPS", "DPS",
        "TANK", "HEAL", "HEAL", "DPS", "DPS", "DPS", "DPS", "DPS",
        "TANK", "HEAL", "HEAL", "DPS", "DPS", "DPS", "DPS", "DPS",
        "TANK", "HEAL", "HEAL", "DPS", "DPS", "DPS", "DPS", "DPS",
        "TANK", "HEAL", "HEAL", "DPS", "DPS", "DPS", "DPS", "DPS" ];
      default: 
        return [ "TANK", "TANK", "HEAL", "HEAL", "MDPS", "MDPS", "RDPS", "CDPS" ];
    }
  }

  get f() { return this.form.controls; }

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private apiurl: apiref,
    public dialogRef: MatDialogRef<MypartiesCreatepartyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CreateDialogData) {    
      this.form = fb.group({
      character: [Object, Validators.required],
      instance: [Object, Validators.required],
      purpose: ["", Validators.required],
      sync: ["", Validators.required],
      slots: [["", Validators.required]],
      // Temp, the following should be condensed into above array
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
      slot55: [""],
      prefj: ["", Validators.required],
      altj: [],
      verf: false,
      pw: "",
      description: "",
      maximumPartyCount: 8
    }); }

  ngOnInit(){
    var jobs: string[];
    jobs = this.getJobsBySlotCount(this.data.slots.length);

    for(var i = 0; i < this.data.slots.length; i++) {
      this.form.get('slot' + i).setValue(jobs[i]);
    }
  }

  setInstanceSlots(count: number) {
    var newSlots = [];

    for(var i = 0; i < count; i++)
      newSlots.push(i);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onCreate() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // Maybe delay close until request is successful? TODO
    this.dialogRef.close(this.form.value);

    var composition = [];
    for(var i = 0; i < this.selectedInstance.playerCount; i++)
      composition.push(this.form.get('slot' + i).value);

    this.form.addControl('composition', new FormControl(composition));
    this.form.addControl('ownerName', new FormControl(this.selectedCharacter.owner));
    this.form.addControl('ownerCharName', new FormControl(this.selectedCharacter.name));
    this.form.addControl('ownerServer', new FormControl(this.selectedCharacter.server));
    this.form.addControl('ownerDC', new FormControl(this.selectedCharacter.datacenter));
    this.form.addControl('instanceID', new FormControl(this.selectedInstance.id));
    this.form.addControl('instanceimg', new FormControl(this.selectedInstance.img));
    this.form.addControl('instanceName', new FormControl(this.selectedInstance.name));

    // TODO: Needs backend protection
    this.http.post<{message: string, parties: any}>("http://" + this.apiurl.hostname() + "/api/parties/add", this.form.value)
      .subscribe((partyData) => { });
  }
}