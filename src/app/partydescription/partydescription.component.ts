import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-partydescription',
  templateUrl: './partydescription.component.html',
  styleUrls: ['./partydescription.component.scss']
})
export class PartydescriptionComponent implements OnInit {

  @Input() public description: string;

  constructor() {
    this.description = 'No Description Given';
  }

  ngOnInit() {
  }

}
