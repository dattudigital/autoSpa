import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToBranch() {
    this.router.navigate(['branch']);
  }

  redirectToVehicleColor(){
    
  }

  redirectToVehicleModel(){
    
  }

  redirectToVehicleMake(){
    
  }

  redirectToPriceList(){
    
  }
}
