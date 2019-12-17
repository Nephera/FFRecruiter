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

  jobLevels = [];
  parses = [];

  isRefreshing = false;

  timeLeft: string = "";
  nextRefresh: Date;

  refreshCharacter() { 
    console.log(this.characterDetails);
    this.isRefreshing = true;
    this.http.patch<{message: string, characters: any[]}>(this.apiurl.hostname() + "/api/characters/refresh/", {id: this.characterDetails.lodestoneID})
      .subscribe((refreshData) => {
        if(refreshData.characters != null){
          this.jobLevels = refreshData.characters[0].jobs;
          this.parses = refreshData.characters[0].parses;
          this.nextRefresh = refreshData.characters[0].nextRefresh;
          this.timeLeft = ""; 
        }
        this.isRefreshing = false;
      });
  }

  canRefresh(){
    return this.timeLeft == "Refresh Available";
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

    for(var i = 0; i < this.characterDetails.jobs.length; i++)
      this.jobLevels.push(this.characterDetails.jobs[i]);
    
    for(var i = 0; i < this.characterDetails.parses.length; i++)
      this.parses.push(this.characterDetails.parses[i]);

    // Set the date we're counting down to
    this.nextRefresh = this.characterDetails.nextRefresh;
    var countDownDate = new Date(this.nextRefresh).getTime();

    // Update the count down every 1 second
    var x = setInterval(() => {

      // Get today's date and time
      var now = new Date().getTime();
        
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
        
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      var fHours = ("0" + hours).slice(-2);
      var fMinutes = ("0" + minutes).slice(-2);
      var fSeconds = ("0" + seconds).slice(-2);
        
      // Output the result in an element with id="demo"
      //document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        this.timeLeft = "Refresh Available";
        console.log("Refresh Available");
      }
      else {
        this.timeLeft = "Next Refresh: " + days + ":" + fHours + ":" + fMinutes + ":" + fSeconds;
      }
    }, 1000);
  }

}
