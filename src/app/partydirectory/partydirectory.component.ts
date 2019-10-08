import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiref } from '../ref/str/apiref';
import { PageEvent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PartyfilterService } from '../primarynav/partyfilter/partyfilter.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

export interface CreateDialogData {
  slotCount: number; // can change depending on instance, should fetch from slots
  slots: [number]; // should be object array
  jobs: [string]; // should be object array
  instances: [any]; // should be object array
  purposes: [string];
  characters: [string]; // should be object array
  currentPartyCount: number;
  maximumPartyCount: number;
}

@Component({
  selector: 'app-partydirectory',
  templateUrl: './partydirectory.component.html',
  styleUrls: ['./partydirectory.component.scss']
})
export class PartydirectoryComponent implements OnInit {

  hasFetchedCharacters: boolean = false;
  hasFetchedInstances: boolean = false;
  hasFetchedPurposes: boolean = false;
  hasFetchedJobs: boolean = false;  
  hasFetchedParties: boolean = false;

  parties: any[];
  instances: any[];
  characters: any[];
  jobs: any[];
  purposes: any[];

  isHidden: boolean = false;
  isLoading: boolean = false;

  timeLeft: number = 10;
  interval: any;

  // MatPaginator Inputs
  length: number;
  pageSize: number;
  pageSizeOptions: number[] = [1, 2, 5, 10, 20];
  currentPage: number;

  partyFilterSub: Subscription;
  asSub: Subscription;

  isAuth: boolean = false;

  displayFilters: boolean = false;

  constructor(private http: HttpClient, private apiurl: apiref, private pfs: PartyfilterService, public dialog: MatDialog, private as: AuthService) { 
    this.partyFilterSub = pfs.getFilterListener().subscribe(filterData => {
      this.getParties(this.pageSize, this.currentPage);
    });
    this.asSub = as.getAuthStatusListener().subscribe(authData => {
      this.isAuth = authData;
    })
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onChangePage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.getParties(this.pageSize, this.currentPage);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      }
    },1000)
  }

  retryFetchData() {
    this.timeLeft = 10;

    this.getParties(this.pageSize, this.currentPage);
    this.getCharacterList();
    this.getInstanceList();
    this.getJobList();
    this.getPurposeList();
  }

  toggleFilters(){
    this.displayFilters = !this.displayFilters;
  }

  getParties(partiesPerPage: number, currentPage: number): any {
    this.isLoading = true;

    const instance = this.pfs.getInstance();
    const difficulty = this.pfs.getDifficulty();
    const job = this.pfs.getJob();
    const itype = this.pfs.getIType();
    const purpose = this.pfs.getPurpose();

    const queryParams = `?pagesize=${partiesPerPage}&page=${currentPage}&instance=${instance}&difficulty=${difficulty}&job=${job}&itype=${itype}&purpose=${purpose}`;
    this.http.get<{ message: string, parties: any[], totalParties: number }>("http://" + this.apiurl.hostname() + "/api/parties/" + queryParams).subscribe((partyData) => {
      this.parties = partyData.parties;
      this.length = partyData.totalParties;
      this.isLoading = false;
      this.hasFetchedParties = true;
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

    if(this.isAuth) {
      this.http.get<{ message: string, characters: any }>("http://" + this.apiurl.hostname() + "/api/characters/get/" + localStorage.getItem("username")).subscribe((characterData) => {
        this.characters = characterData.characters;
        this.isLoading = false;
        this.hasFetchedCharacters = true;
      });
    }else{
      this.hasFetchedCharacters = true;
    }
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
    const dialogRef = this.dialog.open(PartyDirectoryCreatepartyDialog,
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

  ngOnInit() {
    this.length = 100;
    this.pageSize = 5;
    this.currentPage = 1;
    this.startTimer();
    this.parties = this.getParties(this.pageSize, this.currentPage);

    this.getJobList();
    this.getPurposeList();
    this.getCharacterList();
    this.getInstanceList();
  }

  ngOnDestroy(){
    this.partyFilterSub.unsubscribe();
    this.asSub.unsubscribe();
  }
}

@Component({
  selector: 'partydirectory-createparty-dialog',
  templateUrl: 'partydirectory-createparty-dialog.html'
})
export class PartyDirectoryCreatepartyDialog implements OnInit {

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
    public dialogRef: MatDialogRef<PartyDirectoryCreatepartyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CreateDialogData) {    
      this.form = fb.group({
      character: [Object, Validators.required],
      instance: [Object, Validators.required],
      purpose: ["", Validators.required],
      sync: ["", Validators.required],
      slots: [[""]],
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
      currentPartyCount: 0,
      maximumPartyCount: 5
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

    this.http.post<{message: string, parties: any}>("http://" + this.apiurl.hostname() + "/api/parties/add", this.form.value)
      .subscribe((partyData) => { });
  }
}