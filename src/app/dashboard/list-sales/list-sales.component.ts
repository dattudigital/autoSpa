import { Component, OnInit } from '@angular/core';
import { VehicleDetailsService } from './../../services/vehicle-details.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.css']
})

export class ListSalesComponent implements OnInit {

  userDetailsDatas: any = [];
  constructor(private userListService: VehicleDetailsService,private router:Router) { }

  ngOnInit() {
    this.userListService.getUserDetails().subscribe(res => {
      if (res.json().status == true) {
        this.userDetailsDatas = res.json().result;
      } else {
        this.userDetailsDatas = [];
      }
    })
  }

  redirectToAddSale(){
    this.router.navigate(['dashboard']);
  }

}
