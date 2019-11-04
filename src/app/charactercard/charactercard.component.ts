import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiref } from '../ref/str/apiref';

@Component({
  selector: 'app-charactercard',
  templateUrl: './charactercard.component.html',
  styleUrls: ['./charactercard.component.scss']
})
export class CharactercardComponent implements OnInit {

  @Input() public characterDetails: any;

  avatar: string;
  name: string;
  firstname: string;
  lastname: string;
  server: string;

  pldSpec = false;
  warSpec = false;
  whmSpec = false;
  schSpec = false;
  mnkSpec = false;
  drgSpec = false;
  ninSpec = false;
  brdSpec = false;
  blmSpec = false;
  smnSpec = false;
  jobLevels = [];
  parses = [];

  refreshCharacter() { 
    this.http.patch<{Results: [any]}>(this.apiurl.hostname() + "/api/characters/refresh/", {id: this.characterDetails.lodestoneID})
      .subscribe((refreshData) => {});
  }

  // Helper functions for dynamic styling w/ ngClass
  isGold(num: number)
  {
    if(num == 100)
      return true;
    return false;
  }
  
  isOrange(num: number)
  {
    if(num >= 95 && num < 100)
      return true;
    return false;
  }

  isPurple(num: number)
  {
    if(num >= 75 && num < 95)
      return true;
    return false;
  }

  isBlue(num: number)
  {
    if(num >= 50 && num < 75)
      return true;
    return false;
  }

  isGreen(num: number)
  {
    if(num >= 25 && num < 50)
      return true;
    return false;
  }

  isGray(num: number)
  {
    if(num >= 0 && num < 25)
      return true;
    return false;
  }

  constructor(private http: HttpClient, private apiurl: apiref) { }

  ngOnInit() {
    this.avatar = this.characterDetails.avatar;
    this.name = this.characterDetails.name;
    this.server = this.characterDetails.server;

    // Temporary, should be generated dynamically
    this.pldSpec = true;
    this.warSpec = true;
    this.whmSpec = true;
    this.schSpec = true;
    this.mnkSpec = true;
    this.drgSpec = true;
    this.ninSpec = true;
    this.brdSpec = true;
    this.blmSpec = true;
    this.smnSpec = true;

    for(var i = 0; i < this.characterDetails.jobs.length; i++)
      this.jobLevels.push(this.characterDetails.jobs[i]);
    
    for(var i = 0; i < this.characterDetails.parses.length; i++)
      this.parses.push(this.characterDetails.parses[i]);
  }

}
