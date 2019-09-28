import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { apiref } from 'src/app/ref/str/apiref';
import { HttpClient } from '@angular/common/http';
import { PartyfilterService } from './partyfilter.service';
import { Subscription} from 'rxjs';

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

  setInstance(){
    this.pfs.setInstance(this.form.get('instance').value);
  }

  setPurpose(){
    this.pfs.setPurpose(this.form.get('purpose').value);
  }

  setJob(){
    this.pfs.setJob(this.form.get('job').value);
  }
  
  setDifficulty(){
    this.pfs.setDifficulty(this.form.get('difficulty').value);
  }

  setIType(){
    this.pfs.setIType(this.form.get('itype').value);
  }

  filterSearch() {
    this.pfs.update();
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

    this.instances = ["No Filter", "Unending Coil of Bahamut", "The Void Ark"]; // TODO
    this.purposes = ["No Filter", "Speed Run", "Parse"]; // TODO
    this.jobs = ["No Filter", "RDM", "DRG"]; // TODO
    this.difficulties = ["No Filter", "Normal", "Hard"]; // TODO
    this.itypes = ["No Filter", "Raid", "Alliance"]; // TODO
  }

  ngOnInit() {
  }
}
