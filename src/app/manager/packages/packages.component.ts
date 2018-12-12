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
  addEnableorDisable = 'visible';
  updateEnableorDisable = 'visible'
  editData: any = [];
  deleteData: any = [];
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

  backToManager(){
    this.router.navigate(['manager'])
  }

  removeFields() {
    this.updateEnableorDisable = 'hidden';
    this.addEnableorDisable = 'visible';
    this.submitted = false;
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
      // sub_cat_id: this.package.subcategory,
      package_name: this.package.serviceName,
      package_description: this.package.serviceDescription,
      package_price: this.package.servicePrice,
      service_price_medium: this.package.serviceMediumPrice,
      service_price_large: this.package.servicelargePrice,
      service_price_small: this.package.serviceSmallPrice,
      service_price_xl: this.package.serviceExtraLargePrice,
      service_duration: this.package.serviceDuration,
      service_tax: this.package.serviceTax,
      service_visibility: this.package.serviceVisibility,
      rec_status: 1
    }
    this.managerservice.saveServices(data).subscribe(res => {
      console.log(res.json());
      this.packageData.push(res.json().result);
      console.log(this.packageData);
      $('#addServices').modal('hide');
    });
  }


}
