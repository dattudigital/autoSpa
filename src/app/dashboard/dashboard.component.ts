import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Http } from '@angular/http';
import { VehicleDetailsService } from '../services/vehicle-details.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleServicesPipe } from './../pipe/vehicle-services.pipe'
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  //for validation
  salesForm: FormGroup;
  vehicleForm: FormGroup;
  submitted = false;
  noResult = false;
  //for design enable and disable
  newUser = true;
  vehInfo = true;
  vehservice = true;
  existingInfo = false;
  carUser = true;
  bikeUser = false;
  commercialUser = false;

  // for typeahead
  selectedValue: string;
  selectedOption: any = '';

  //multiselect
  // carssss: SelectItem[];
  serviceTableValue: any = [];
  selectedServices: string[] = [];
  //personalinfo
  firstName: '';
  emailId: '';
  mobileNo: '';
  profession: '';
  address: '';
  sourceOfCust: '';
  serviceType: '';
  sourceCustomer: '';
  businessType: '';

  // vechile info
  selectedVechile: any = 0;
  selectedVechileNo: string;
  selectedVechileMake: any;
  selectedVechileSize: any;
  selectedVechileAge: any;
  selectedVechileType: any;

  vehicleAge: any = [];
  vehicleType: any = [];
  vehicleMake: any = [];
  vehicleServices: any = [];

  existingDetail: string;
  serviceId: string;

  userInfo: any=[];

  constructor(private http: Http, private vehicledetails: VehicleDetailsService, private formBuilder: FormBuilder, private servicePipe: VehicleServicesPipe, private router: Router) { }

  ngOnInit() {
    this.salesForm = this.formBuilder.group({
      Name: ['', Validators.required],
      phone: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Profession: ['', Validators.required],
      Address: ['', Validators.required],
      Source: ['', Validators.required],
      Service: ['', Validators.required],
      Business: ['', Validators.required]
    });

    this.vehicleForm = this.formBuilder.group({
      Number: ['', Validators.required],
      Make: ['', Validators.required],
      Size: ['', Validators.required],
      Type: ['', Validators.required],
      Age: ['', Validators.required]
    })

    this.vehicledetails.getVehicleAge().subscribe(res => {
      if (res.json().status == true) {
        this.vehicleAge = res.json().result;
      } else {
        this.vehicleAge = [];
      }
    });

    this.vehicledetails.getVehicleTypes().subscribe(res => {
      if (res.json().status == true) {
        this.vehicleType = res.json().result;
      } else {
        this.vehicleType = [];
      }
    });

    this.vehicledetails.getVehicleMake().subscribe(res => {
      if (res.json().status == true) {
        this.vehicleMake = res.json().result;
      } else {
        this.vehicleMake = [];
      }
    });

    this.vehicledetails.getVehicleServices().subscribe(res => {
      if (res.json().status == true) {
        this.vehicleServices = this.servicePipe.transform(res.json().result);
      } else {
        this.vehicleServices = [];
      }
    });
  }

  onChangeServices(val) {
    // this.serviceTableValue = val;
    this.getServiceId(this.selectedServices);
  }
  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.firstName =this.selectedOption.firstname
    this.emailId =this.selectedOption.email_id
    this.mobileNo =this.selectedOption.mobile
    this.profession =this.selectedOption.profession
    this.address =this.selectedOption.address
    this.sourceCustomer =this.selectedOption.source_customer
    this.serviceType =this.selectedOption.service_type
    this.businessType =this.selectedOption.business_type

  }

  userSearch(val) {
    if (val.length > 2) {
      this.vehicledetails.searchMobileOrEmailid(val).subscribe(res => {
        let temp = [];
        temp.push(res.json().result);
        if (res.json().status == false) {
          this.userInfo = [];
          this.noResult = true;
        } else {
          this.noResult = false;
          this.userInfo = temp.pop();
        }
      })
    } else {
      this.noResult = false;
      this.userInfo = [];
    }
  }

  searchUser() {

  }

  deleteService(index) {
    this.selectedServices.splice(index, 1);
    this.getServiceId(this.selectedServices);
  }

  getServiceId(val) {
    this.serviceId = '';
    console.log(val);
    for (let i = 0; i < val.length; i++) {
      this.serviceId = this.serviceId + val[i].service_id + " , ";
    }
    this.serviceId = this.serviceId.substring(0, this.serviceId.length - 2);
    console.log(this.serviceId);
  }

  newUserClick() {
    this.newUser = true;
    this.vehInfo = true;
    this.carUser = true;
    this.vehservice = true;
    this.existingInfo = false;
    this.bikeUser = false;
    this.commercialUser = false;
  }

  existingUserClick() {
    this.existingInfo = true;
  }

  carUserClick() {
    this.selectedVechile = 0;
    this.vehInfo = true;
    this.carUser = true;
    this.vehservice = true;
    this.bikeUser = false;
    this.commercialUser = false;
  }

  bikeUserClick() {
    this.selectedVechile = 1;
    this.selectedVechileSize = null;
    this.vehInfo = true;
    this.carUser = false;
    this.bikeUser = true;
    this.vehservice = true;
    this.commercialUser = false;
  }

  commercialUserClick() {
    this.selectedVechile = 2;
    this.selectedVechileType = null;
    this.selectedVechileAge = null;
    this.vehInfo = true;
    this.carUser = false;
    this.bikeUser = false;
    this.commercialUser = true;
    this.vehservice = true;
  }

  redirectToSalesList() {
    this.router.navigate(['list-sales']);
  }

  get f() { return this.salesForm.controls; }
  get v() { return this.vehicleForm.controls; }

  addUserInfoAndVehicle() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.salesForm.invalid) {
      return;
    }
    if (this.vehicleForm.invalid) {
      return;
    }
    var data = {
      user: {
        firstname: this.firstName,
        email_id: this.emailId,
        mobile: this.mobileNo,
        profession: this.profession,
        address: this.address,
        source_customer: this.sourceCustomer,
        service_type: this.serviceType,
        business_type: this.businessType,
        vehicle_type: this.selectedVechile
      },
      vechileInfo: {
        vehicle_no: this.selectedVechileNo,
        vehicle_make_id: this.selectedVechileMake,
        vehicle_size: this.selectedVechileSize,
        vehicle_type_id: this.selectedVechileType,
        vehicle_age_id: this.selectedVechileAge
      },
      vechileServices: {
        services: this.serviceId
      }
    }
    console.log("******************")
    console.log(data)
    this.vehicledetails.userVehicleService(data).subscribe(res => {
      if (res.json().status == true) {
        console.log("came to here ");
      } else {
        console.log("*****************");
      }
    });
  }
}
