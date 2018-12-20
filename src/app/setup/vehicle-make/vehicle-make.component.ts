import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleDetailsService } from '../../services/vehicle-details.service';
import { SaleUserDetailsPipe } from '../../pipe/sale-user-details.pipe';
@Component({
  selector: 'app-vehicle-make',
  templateUrl: './vehicle-make.component.html',
  styleUrls: ['./vehicle-make.component.css']
})
export class VehicleMakeComponent implements OnInit {
  vehicleMake: any = [];
  cols: any[];
  constructor(private router: Router, private saleUserPipe: SaleUserDetailsPipe, private vehicleDetails: VehicleDetailsService) { }

  ngOnInit() {
    this.cols = [
      { field: 'make_name', header: 'Make' }
    ];
    this.vehicleDetails.getVehicleMake().subscribe(res => {
      if (res.json().status == true) {
        this.vehicleMake = this.saleUserPipe.transform(res.json().result);
        console.log(this.vehicleMake)
      } else {
        this.vehicleMake = [];
      }
    })
  }

  backToSetup() {
    this.router.navigate(['setup'])
  }

}
