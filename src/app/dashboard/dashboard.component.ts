import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // cars: SelectItem[];
  // selectedCars1: string[] = [];

  newUser = true;
  vehInfo = true;
  existingInfo = true;
  carUser = false;
  bikeUser = false;
  commercialUser = false;


  constructor() { }

  ngOnInit() {
  }

  newUserClick() {
    this.newUser = true;
    this.vehInfo = true;

  }

  existingUserClick(){
    this.existingInfo = true;
    this.newUser = false;
    this.vehInfo = false;
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
