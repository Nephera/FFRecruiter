import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { apiref } from 'src/app/ref/str/apiref';
import { HttpClient } from '@angular/common/http';
import { PartyfilterService } from './partyfilter.service';

@Component({
  selector: 'app-partyfilter',
  templateUrl: './partyfilter.component.html',
  styleUrls: ['./partyfilter.component.scss']
})
export class PartyfilterComponent implements OnInit {

  form: FormGroup;

  owned: any[];
  verf: any[];
  servers: any[];
  users: any[];
  syncs: any[];
  shortIDs: any[];
  datacenters: any[];
  instances: any[];
  purposes: any[];
  jobs: any[];
  difficulties: any[];
  itypes: any[];

  selectedServers = [];
  selectedSyncs = [];
  selectedShortIDs = [];
  selectedUsers = [];
  selectedDatacenters = [];
  selectedInstances = [];
  selectedPurposes = [];
  selectedJobs = [];
  selectedDifficulties = [];
  selectedITypes = [];

  fetchedServers = false;
  fetchedSyncs = false;
  fetchedDatacenters = false;
  fetchedInstances = false;
  fetchedPurposes = false;
  fetchedJobs = false;
  fetchedDifficulties = false;
  fetchedITypes = false;
  
  getSelectedServers(){
    return this.selectedServers;
  }

  getSelectedSyncs(){
    return this.selectedSyncs;
  }

  getSelectedShortIDs(){
    return this.form.get('shortID').value;
  }

  getSelectedUsers(){
    return this.form.get('user').value;
  }

  getSelectedDatacenters(){
    return this.selectedDatacenters;
  }

  getSelectedInstances(){
    return this.selectedInstances;
  }

  getSelectedPurposes(){
    return this.selectedPurposes;
  }

  getSelectedJobs(){
    return this.selectedJobs;
  }

  getSelectedDifficulties(){
    return this.selectedDifficulties;
  }

  getSelectedITypes(){
    return this.selectedITypes;
  }

  setDatacenter(){
    // Give time for form validation, or value will not be ready
    setTimeout(() => {
      this.selectedDatacenters = [];
      for(var i = 0; i < this.form.get('datacenter').value.length; i++){
        this.selectedDatacenters.push((this.form.get('datacenter').value[i]));
      }
    }, 100)
  }

  setServer(){
    // Give time for form validation, or value will not be ready
    setTimeout(() => {
      this.selectedServers = [];
      for(var i = 0; i < this.form.get('server').value.length; i++){
        this.selectedServers.push((this.form.get('server').value[i]));
      }
    }, 100)
  }

  setInstance(){
    // Give time for form validation, or value will not be ready
    setTimeout(() => {
      this.selectedInstances = [];
      for(var i = 0; i < this.form.get('instance').value.length; i++){
        this.selectedInstances.push((this.form.get('instance').value[i]).name);
      }
    }, 100)
  }

  setPurpose(){
    // Give time for form validation, or value will not be ready
    setTimeout(() => {
      this.selectedPurposes = [];
      for(var i = 0; i < this.form.get('purpose').value.length; i++){
        this.selectedPurposes.push((this.form.get('purpose').value[i]));
      }
    }, 100)
  }

  setJob(){
    // Give time for form validation, or value will not be ready
    setTimeout(() => {
      this.selectedJobs = [];
      for(var i = 0; i < this.form.get('job').value.length; i++){
        this.selectedJobs.push((this.form.get('job').value[i]));
      }
    }, 100)
  }
  
  setDifficulty(){
    // Give time for form validation, or value will not be ready
    setTimeout(() => {
      this.selectedDifficulties = [];
      for(var i = 0; i < this.form.get('difficulty').value.length; i++){
        this.selectedDifficulties.push((this.form.get('difficulty').value[i]));
      }
    }, 100)
  }

  setIType(){
    // Give time for form validation, or value will not be ready
    setTimeout(() => {
      this.selectedITypes = [];
      for(var i = 0; i < this.form.get('itype').value.length; i++){
        this.selectedITypes.push((this.form.get('itype').value[i]));
      }
    }, 100)
  }

  filterSearch() {
    this.pfs.update(this.form);
  }

  onChanges() {
    this.form.get('shortID').valueChanges
    .subscribe(IDs => {
      if (IDs.length > 0) {
        this.form.get('user').setValue("");
        this.form.get('user').disable();

        this.form.get('datacenter').setValue("");
        this.form.get('datacenter').disable();

        this.form.get('server').setValue("");
        this.form.get('server').disable();

        this.form.get('instance').setValue("");
        this.form.get('instance').disable();

        this.form.get('purpose').setValue("");
        this.form.get('purpose').disable();

        this.form.get('job').setValue("");
        this.form.get('job').disable();

        this.form.get('difficulty').setValue("");
        this.form.get('difficulty').disable();

        this.form.get('itype').setValue("");
        this.form.get('itype').disable();

        this.form.get('sync').setValue("");
        this.form.get('sync').disable();

        this.form.get('owned').setValue("");
        this.form.get('owned').disable();

        this.form.get('verf').setValue("");
        this.form.get('verf').disable();
      }
      else {
        this.form.get('user').enable();
        this.form.get('datacenter').enable();
        this.form.get('server').enable();
        this.form.get('instance').enable();
        this.form.get('purpose').enable();
        this.form.get('job').enable();
        this.form.get('difficulty').enable();
        this.form.get('itype').enable();
        this.form.get('sync').enable();
        this.form.get('owned').enable();
        this.form.get('verf').enable();
      }
    });
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private apiurl: apiref, private pfs: PartyfilterService) { 
    this.form = fb.group({
      server: [String],
      shortID: ['', {validators: [Validators.pattern('^([a-zA-Z0-9]{3,5})(,\\s?([a-zA-Z0-9]){3,5})*$')], updateOn: 'change'}],
      // Usernames: ^(,?\\s?([a-zA-Z0-9]){3,25})*$
      // Characters: ^(,?\\s?[a-zA-Z\'\-]{3,15}\\s[a-zA-Z\'\-]{3,15}\\s[a-zA-Z]{4,12})*$
      user: ['', {validators: [Validators.pattern('^((\,?\\s?([a-zA-Z0-9]){3,25})?|(\,?\\s?[a-zA-Z\'\-]{3,15}\\s[a-zA-Z\'\-]{3,15}\\s[a-zA-Z]{4,12})?)*$')], updateOn: 'change'}],
      datacenter: [String],
      difficulty: [String],
      instance: [String],
      itype: [String],
      ilvl: [Number],
      lvl: [Number],
      job: [String],
      purpose: [String],
      verf: [Boolean],
      owned: [Boolean],
      sync: [String],
      parse: [Number],
      parsem: [Number]
    });
  }

  ngOnInit() {
    this.onChanges();

    this.datacenters = this.pfs.getDatacenters();
    this.servers = this.pfs.getServers();
    this.instances = this.pfs.getInstances();
    this.purposes = this.pfs.getPurposes();
    this.jobs = this.pfs.getJobs();
    this.difficulties = this.pfs.getDifficulties();
    this.itypes = this.pfs.getITypes();
    this.syncs = this.pfs.getSyncs();

    // The following prevents function String() from being propagated to backend
    this.form.get('server').setValue("");
    this.form.get('sync').setValue("");
    this.form.get('user').setValue("");
    this.form.get('shortID').setValue("");
    this.form.get('datacenter').setValue("");
    this.form.get('instance').setValue("");
    this.form.get('purpose').setValue("");
    this.form.get('job').setValue("");
    this.form.get('difficulty').setValue("");
    this.form.get('itype').setValue("");
  }
}
