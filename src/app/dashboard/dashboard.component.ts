import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Http } from '@angular/http';
import { VehicleDetailsService } from '../services/vehicle-details.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  //for design enable and disable
  newUser = true;
  vehInfo = true;
  vehservice = true;
  existingInfo = false;
  carUser = true;
  bikeUser = false;
  commercialUser = false;
  //multiselect
  cars: SelectItem[];
  selectedCars1: string[] = [];
  //personalinfo
  firstName: '';
  emailId: '';
  mobileNo: '';
  profession: '';
  address: '';
  sourceOfCust: '';
  serviceType: '';
  businessType: '';

  vehicleAge: any = [];
  vehicleType: any = [];
  vehicleMake: any = [];

  constructor(private http: Http, private vehicledetails: VehicleDetailsService, private formBuilder: FormBuilder) { }

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

    this.cars = [
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Ford', value: 'Ford' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' },
    ];

    this.vehicledetails.getVehicleAge().subscribe(res => {
      if (res.json().status == true) {
        this.vehicleAge = res.json().result;
      } else  {
        this.vehicleAge = [];
      }
    });

    this.vehicledetails.getVehicleTypes().subscribe(res => {
      if (res.json().status == true) {
        this.vehicleType = res.json().result;
      } else  {
        this.vehicleType = [];
      }
    });

    this.vehicledetails.getVehicleMake().subscribe(res => {
      if (res.json().status == true) {
        this.vehicleMake = res.json().result;
      } else  {
        this.vehicleMake = [];
      }
    });
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
    this.vehInfo = true;
    this.carUser = true;
    this.vehservice = true;
    this.bikeUser = false;
    this.commercialUser = false;
  }

  bikeUserClick() {
    this.vehInfo = true;
    this.carUser = false;
    this.bikeUser = true;
    this.vehservice = true;
    this.commercialUser = false;
  }

  commercialUserClick() {
    this.vehInfo = true;
    this.carUser = false;
    this.bikeUser = false;
    this.commercialUser = true;
    this.vehservice = true;
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
    var user = {
      
    }

  }

}
