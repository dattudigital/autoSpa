import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  newUser = true;
  carUser = true;
  bikeUser = false;
  commercialUser = false;


  constructor() { }

  ngOnInit() {
  }

  newUserClick() {
    this.newUser = true;
  }

  existingUserClick(){
    this.newUser = false;
    this.carUser = false;
    this.bikeUser = false;
    this.commercialUser = false;
  }

  carUserClick() {
    this.carUser = true;
    this.bikeUser = false;
    this.commercialUser = false;
  }

  bikeUserClick() {
    this.carUser = false;
    this.bikeUser = true;
    this.commercialUser = false;
  }

  commercialUserClick() {
    this.carUser = false;
    this.bikeUser = false;
    this.commercialUser = true;
  }

}
