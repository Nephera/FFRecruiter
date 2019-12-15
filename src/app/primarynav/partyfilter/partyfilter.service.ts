import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiref } from 'src/app/ref/str/apiref';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PartyfilterService {

  private filter = {
    shortID: [],
    user: [],
    instance: [],
    purpose: [],
    job: [],
    difficulty: [],
    itype: []
  }

  private filterListener = new Subject<any>();

  instanceList = []; 
  purposeList = []; 
  jobList = [];
  difficultyList = [];
  itypeList = [];

  // TODO: is there a way to iterate over all properties and check if they're null?
  isFiltering(){
    return (this.filter.shortID.length > 0 || 
      this.filter.user.length > 0 ||
      this.filter.instance.length > 0 ||
      this.filter.purpose.length > 0 || 
      this.filter.job.length > 0 ||
      this.filter.difficulty.length > 0 ||
      this.filter.itype.length > 0);
  }

  getShortID(){ return this.filter.shortID; }
  getUser(){ return this.filter.user; }

  getInstances(){ return this.instanceList; }
  getInstance(){ return this.filter.instance; }
  setInstance(i: string[]){
  }

  getPurposes(){ return this.purposeList; }
  getPurpose(){ return this.filter.purpose; }
  setPurpose(p: string){
  }

  getJobs(){ return this.jobList; }
  getJob(){ return this.filter.job; }
  setJob(j: string){
  }

  getDifficulties(){ return this.difficultyList; }
  getDifficulty(){ return this.filter.difficulty; }
  setDifficulty(d: string){
  }

  getITypes(){ return this.itypeList; }
  getIType(){ return this.filter.itype; }
  setIType(t: string){
  }

  getFilter(){ return this.filter;   }

  update(f: FormGroup){
    this.filter.shortID = f.get('shortID').value.split(',').map(ID => { return ID.trim(); });
    this.filter.user = f.get('user').value.split(',').map(name => { return name.trim(); });

    let instanceNames = [];
    for(var i = 0; i < f.get('instance').value.length; i++){
      instanceNames.push(f.get('instance').value[i].name);
    }
    this.filter.instance = instanceNames;
    this.filter.purpose = f.get('purpose').value;
    this.filter.job = f.get('job').value;
    this.filter.difficulty = f.get('difficulty').value;
    this.filter.itype = f.get('itype').value;

    this.filterListener.next(this.filter);
  }

  getFilterListener(){
    return this.filterListener.asObservable();
  }

  constructor(private http: HttpClient, private apiurl: apiref) {
    this.http.get<{message: string, instances: any}>(this.apiurl.hostname() + "/api/instances/names")
    .subscribe((instanceData) => {
      this.instanceList = instanceData.instances;
    });

    this.purposeList = ["2 Chest", "0-1 Chest", "Clear", "Progression", "Farm", "Speed Run", "Parse", "Other"];
    this.jobList = ["PLD", "WAR", "DRK", "GNB", "WHM", "SCH", "AST", "MNK", "DRG", "NIN", "SAM", "BRD", "MCH", "DNC", "BLM", "SMN", "RDM", "BLU"];
    this.difficultyList = ["Normal", "Hard", "Extreme", "Savage", "Ultimate"];
    this.itypeList = ["Raid", "Trial", "Eureka", "Dungeon", "Alliance"]; 
  }
  ngOnInit(){}
}
