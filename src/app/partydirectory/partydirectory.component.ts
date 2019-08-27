import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiref } from '../ref/str/apiref';

@Component({
  selector: 'app-partydirectory',
  templateUrl: './partydirectory.component.html',
  styleUrls: ['./partydirectory.component.scss']
})
export class PartydirectoryComponent implements OnInit {

  constructor(private http: HttpClient, private apiurl: apiref) { }

  isHidden: boolean = false;
  isLoading: boolean = false;

  timeLeft: number = 10;
  interval: any;

  parties = [];

  totalPartyCount: 10;
  partiesPerPage: 5;
  pageSizes: [1, 2, 5, 10, 20, 50]

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      }
    },1000)
  }

  retryFetchData() {
    this.timeLeft = 10;
    this.getParties();
  }

  getParties(): any {
    this.isLoading = true;
<<<<<<< Updated upstream
    // TODO: Filtering should be done here
    this.http.get<{ message: string, parties: any[] }>("http://" + this.apiurl.hostname() + "/api/parties/all").subscribe((partyData) => {
=======

    const queryParams = `?pagesize=${partiesPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, parties: any[], totalParties: number }>("http://" + this.apiurl.hostname() + "/api/parties/all" + queryParams).subscribe((partyData) => {
>>>>>>> Stashed changes
      this.parties = partyData.parties;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.startTimer();
    this.parties = this.getParties();
  }
}
