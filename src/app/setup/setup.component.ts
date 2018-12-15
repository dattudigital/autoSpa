import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  setupStyle = 'hidden'

  constructor(private router: Router) { }

  ngOnInit() {
    this.setupStyle = "visible";
  }

  redirectToBranch() {
    this.router.navigate(['setup/branch']);
  }

  redirectToVehicleColor() {

  }

  redirectToVehicleModel() {

  }

  redirectToVehicleMake() {

  }

  redirectToPriceList() {

  }
}
