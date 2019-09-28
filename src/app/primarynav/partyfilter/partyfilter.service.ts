import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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

  getInstance(){
    return this.filter.instance;
  }

  setInstance(i: string){
    if(i === "No Filter")
      this.filter.instance = null;
    else
      this.filter.instance = i;
  }

  getPurpose(){
    return this.filter.purpose;
  }

  setPurpose(p: string){
    if(p === "No Filter")
      this.filter.purpose = null;
    else
      this.filter.purpose = p;
  }

  getJob(){
    return this.filter.job;
  }

  setJob(j: string){
    if(j === "No Filter")
      this.filter.job = null;
    else
      this.filter.job = j;
  }

  getDifficulty(){
    return this.filter.difficulty;
  }

  setDifficulty(d: string){
    if(d === "No Filter")
      this.filter.difficulty = null;
    else
      this.filter.difficulty = d;
  }

  getIType(){
    return this.filter.itype;
  }

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

  constructor() { }
}
