import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})

export class PackagesComponent implements OnInit {
  packageForm: FormGroup;
  submitted = false;
  packageData: any[];
  cols: any[];
  package: any = {
    'packageId': '',
    'packageType': '',
    'packageName': '',
    'packagePrice': '',
    'packagePriceSmall': '',
    'packagePriceMedium': '',
    'packagePriceLarge': '',
    'packagePriceXlarge': '',
    'packageDescription': '',
    'packageValidity': '',
    'packageServices': '',
    'packageVisibility': '',
    'status': ''
  }
  temp: any;
  temp1: any;

  constructor(private router: Router, private managerservice: ManagerService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.managerservice.getPackages().subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.packageData = res.json().result;
      } else {
        this.packageData = [];
      }
    })

    this.packageForm = this.formBuilder.group({
      packageName: ['', Validators.required],
      packageDescription: ['', Validators.required],
      packagePrice: ['', Validators.required],
      smallPrice: ['', Validators.required],
      mediumPrice: ['', Validators.required],
      largePrice: ['', Validators.required],
      extraLargePrice: ['', Validators.required],
      packageValidity: ['', Validators.required],
      packageServices: ['', Validators.required],
      packageVisibility: ['', Validators.required]
    });

    this.cols = [
      { field: 'package_name', header: 'Package Name' },
      { field: 'package_description', header: 'Description' },
      { field: 'package_price_small', header: 'Small Price' },
      { field: 'package_price_medium', header: 'Medium Price' },
      { field: 'package_price_large', header: 'Large Price' },
      { field: 'package_price_xlarge', header: 'Extra Large Price' },
    ];
  }

  backToManager() {
    this.router.navigate(['manager'])
  }

  removeFields() {
    this.submitted = false;
    this.package.packageId = '';
    this.package.packageType = '';
    this.package.packageName = '';
    this.package.packageDescription = '';
    this.package.packagePrice = '';
    this.package.packagePriceSmall = '';
    this.package.packagePriceMedium = '';
    this.package.packagePriceLarge = '';
    this.package.packagePriceXlarge = '';
    this.package.packageValidity = '';
    this.package.packageServices = '';
    this.package.packageVisibility = '';
  }

  get f() { return this.packageForm.controls; }

  addPackage() {
    this.submitted = true;
    if (this.packageForm.invalid) {
      return;
    }
    var data = {
      package_name: this.package.packageName,
      package_description: this.package.packageDescription,
      package_price: this.package.packagePrice,
      package_price_small: this.package.packagePriceSmall,
      package_price_medium: this.package.packagePriceMedium,
      package_price_large: this.package.packagePriceLarge,
      package_price_xlarge: this.package.packagePriceXlarge,
      package_validity_days: this.package.packageValidity,
      package_services: this.package.packageServices,
      package_visibility: this.package.packageVisibility,
      rec_status: 1
    }
    this.managerservice.savePackages(data).subscribe(res => {
      this.packageData.push(res.json().result);
      $('#addPackage').modal('hide');
    });
  }

  editPackage(data, index) {
    this.temp = index;
    this.package.packageId = data[index].package_id,
      this.package.packageType = data[index].package_type,
      this.package.packageName = data[index].package_name,
      this.package.packageDescription = data[index].package_description,
      this.package.packagePrice = data[index].package_price,
      this.package.packagePriceSmall = data[index].package_price_small,
      this.package.packagePriceMedium = data[index].package_price_medium,
      this.package.packagePriceLarge = data[index].package_price_large,
      this.package.packagePriceXlarge = data[index].package_price_xlarge,
      this.package.packageValidity = data[index].package_validity_days,
      this.package.packageServices = data[index].package_services,
      this.package.packageVisibility = data[index].package_visibility,
      this.package.status = data[index].rec_status
  }

  updatePackage() {
    var data = {
      package_id: this.package.packageId,
      package_type: this.package.packageType,
      package_name: this.package.packageName,
      package_description: this.package.packageDescription,
      package_price: this.package.packagePrice,
      package_price_small: this.package.packagePriceSmall,
      package_price_medium: this.package.packagePriceMedium,
      package_price_large: this.package.packagePriceLarge,
      package_price_xlarge: this.package.packagePriceXlarge,
      package_validity_days: this.package.packageValidity,
      package_services: this.package.packageServices,
      package_visibility: this.package.packageVisibility,
      rec_status: this.package.status
    }
    this.managerservice.savePackages(data).subscribe(res => {
      this.packageData[this.temp].package_id = data.package_id,
        this.packageData[this.temp].package_type = data.package_type,
        this.packageData[this.temp].package_name = data.package_name,
        this.packageData[this.temp].package_description = data.package_description,
        this.packageData[this.temp].package_price = data.package_price,
        this.packageData[this.temp].package_price_small = data.package_price_small,
        this.packageData[this.temp].package_price_medium = data.package_price_medium,
        this.packageData[this.temp].package_price_large = data.package_price_large,
        this.packageData[this.temp].package_price_xlarge = data.package_price_xlarge,
        this.packageData[this.temp].package_validity_days = data.package_validity_days,
        this.packageData[this.temp].package_services = data.package_services,
        this.packageData[this.temp].package_visibility = data.package_visibility,
        this.packageData[this.temp].rec_status = data.rec_status;
      if (data.rec_status == '0') {
        this.packageData.splice(this.temp, 1);
        this.packageData = this.packageData.slice();
      }
      this.temp = " "
    });
    $('#addPackage').modal('hide')
  }

  deletePackage(val, index) {
    this.temp1 = index;
    this.package.packageId = val[index].package_id
  }
  yesPackageDelete() {
    this.packageData.splice(this.temp1, 1)
    var data = {
      package_id: this.package.packageId,
      rec_status: "0"
    }
    this.managerservice.savePackages(data).subscribe(res => {
    })
  }

  omit_special_char(event) {
    var k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 0 || k == 32);
  }

  //This Method  allow Numbers
  only_allow_number(event) {
    var n = event.charCode
    return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
  }

  //this method allow both numbers and alphabets
  allow_numbers_alphabets(event) {
    var a = event.charCode
    return ((a > 64 && a < 91) || (a > 96 && a < 123) || a == 8 || a == 0 || (a >= 48 && a <= 57));
  }


}
