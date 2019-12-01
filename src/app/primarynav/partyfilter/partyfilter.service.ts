import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiref } from 'src/app/ref/str/apiref';

@Injectable({
  providedIn: 'root'
})
export class PartyfilterService {

  private filter = {
    instance: null,
    purpose: null,
    job: null,
    difficulty: null,
    itype: null
  }

  private filterListener = new Subject<any>();

  instanceList = []; 
  purposeList = []; 
  jobList = [];
  difficultyList = [];
  itypeList = [];

  // TODO: is there a way to iterate over all properties and check if they're null?
  isFiltering(){
    return (this.filter.instance != null ||
      this.filter.purpose != null || 
      this.filter.job != null ||
      this.filter.difficulty != null ||
      this.filter.itype != null);
  }

  getInstances(){ return this.instanceList; }
  getInstance(){ return this.filter.instance; }
  setInstance(i: string){
    if(i === "No Filter")
      this.filter.instance = null;
    else
      this.filter.instance = i;
  }

  getPurposes(){ return this.purposeList; }
  getPurpose(){ return this.filter.purpose; }
  setPurpose(p: string){
    if(p === "No Filter")
      this.filter.purpose = null;
    else
      this.filter.purpose = p;
  }

  getJobs(){ return this.jobList; }
  getJob(){ return this.filter.job; }
  setJob(j: string){
    if(j === "No Filter")
      this.filter.job = null;
    else
      this.filter.job = j;
  }

  getDifficulties(){ return this.difficultyList; }
  getDifficulty(){ return this.filter.difficulty; }
  setDifficulty(d: string){
    if(d === "No Filter")
      this.filter.difficulty = null;
    else
      this.filter.difficulty = d;
  }

  getITypes(){ return this.itypeList; }
  getIType(){ return this.filter.itype; }
  setIType(t: string){
    if(t === "No Filter")
      this.filter.itype = null;
    else
      this.filter.itype = t; 
  }

  update(){
    this.filterListener.next(this.filter);
  }

  getFilterListener(){
    return this.filterListener.asObservable();
  }

  constructor(private http: HttpClient, private apiurl: apiref) {
    this.http.get<{message: string, instances: any}>(this.apiurl.hostname() + "/api/instances/names")
    .subscribe((instanceData) => {
      this.instanceList.push("No Filter");
      for(var i = 0; i < instanceData.instances.length; i++){
        this.instanceList.push(instanceData.instances[i].name);
      }
    });

    this.purposeList = ["No Filter", "2 Chest", "0-1 Chest", "Clear", "Progression", "Farm", "Speed Run", "Parse", "Other"];
    this.jobList = ["No Filter", "PLD", "GLA", "WAR", "MRD", "DRK", "GNB", "WHM", "CNJ", "SCH", "ACN", "AST", "MNK", "PGL", "DRG", "LNC",
    "NIN", "ROG", "SAM", "BRD", "ARC", "MCH", "DNC", "BLM", "THM", "SMN", "ACN", "RDM", "BLU"];
    this.difficultyList = ["No Filter", "Normal", "Hard", "Extreme", "Savage", "Ultimate"];
    this.itypeList = ["No Filter", "Raid", "Trial", "Eureka", "Dungeon", "Alliance"]; 
  }
  ngOnInit(){

  }
}
