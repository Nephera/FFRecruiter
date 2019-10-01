import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiref } from '../ref/str/apiref';
import { PageEvent } from '@angular/material';

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

  // MatPaginator Inputs
  length: number;
  pageSize: number;
  pageSizeOptions: number[] = [1, 2, 5, 10, 20];
  currentPage: number;

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
  }

  getParties(partiesPerPage: number, currentPage: number): any {
    this.isLoading = true;

    const queryParams = `?pagesize=${partiesPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, parties: any[], totalParties: number }>("http://" + this.apiurl.hostname() + "/api/parties/all" + queryParams).subscribe((partyData) => {
      this.parties = partyData.parties;
      this.length = partyData.totalParties;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.length = 100;
    this.pageSize = 1;
    this.currentPage = 1;
    this.startTimer();
    this.parties = this.getParties(this.pageSize, this.currentPage);
  }
}
