import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  instances: any[];
  purposes: any[];
  jobs: any[];
  difficulties: any[];
  itypes: any[];

  selectedInstances = [];
  selectedPurposes = [];
  selectedJobs = [];
  selectedDifficulties = [];
  selectedITypes = [];

  fetchedInstances = false;
  fetchedPurposes = false;
  fetchedJobs = false;
  fetchedDifficulties = false;
  fetchedITypes = false;

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

  constructor(private fb: FormBuilder, private http: HttpClient, private apiurl: apiref, private pfs: PartyfilterService) { 
    this.form = fb.group({
      difficulty: [String],
      instance: [String],
      itype: [String],
      ilvl: [Number],
      lvl: [Number],
      job: [String],
      purpose: [String],
      verf: [Boolean],
      parse: [Number],
      parsem: [Number]
    });
  }

  ngOnInit() {
    this.instances = this.pfs.getInstances();
    this.purposes = this.pfs.getPurposes();
    this.jobs = this.pfs.getJobs();
    this.difficulties = this.pfs.getDifficulties();
    this.itypes = this.pfs.getITypes();

    // The following prevents function String() from being propagated to backend
    this.form.get('instance').setValue("");
    this.form.get('purpose').setValue("");
    this.form.get('job').setValue("");
    this.form.get('difficulty').setValue("");
    this.form.get('itype').setValue("");
  }
}
