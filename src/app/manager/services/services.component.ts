import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
declare var $: any;
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  servicesForm: FormGroup;
  subCategoryDetails: any = []
  serviceDetails: any = [];
  submitted = false;
  services: any = {
    'serviceId': '',
    'subcategory': '',
    'serviceName': '',
    'serviceImg': '',
    'serviceDesc': '',
    'servicePrice': '',
    'serviceMediumPrice': '',
    'servicelargePrice': '',
    'serviceSmallPrice': '',
    'serviceExtraLargePrice': '',
    'serviceDuration': '',
    'serviceTax': '',
    'serviceVisibility': ''
  }
  cols: any[];
  constructor(private router: Router, private formBuilder: FormBuilder, private managerservice: ManagerService) { }

  ngOnInit() {
    this.managerservice.getSubCategory().subscribe(res => {
      if (res.json().status == true) {
        this.subCategoryDetails = res.json().result;
      } else {
        this.subCategoryDetails = [];
      }
    })
    this.managerservice.getServiceDetails().subscribe(res => {
      if (res.json().status == true) {
        this.serviceDetails = res.json().result;
      } else {
        this.serviceDetails = [];
      }
    })

    this.servicesForm = this.formBuilder.group({
      subCategory: ['', Validators.required],
      serviceName: ['', Validators.required],
      //serviceImage: ['', Validators.required],
      serviceDescription: ['', Validators.required],
      servicePrice: ['', Validators.required],
      mediumPrice: ['', Validators.required],
      largePrice: ['', Validators.required],
      smallPrice: ['', Validators.required],
      extraLargePrice: ['', Validators.required],
      serviceDuration: ['', Validators.required],
      serviceTax: ['', Validators.required],
      srviceVisibility: ['', Validators.required]
    });

    this.cols = [
      { field: 'service_name', header: 'Service Name' },
      { field: 'service_description', header: 'Description' },
      { field: 'service_price', header: 'Service Price' },
      { field: 'service_price_medium', header: 'Medium Price' },
      { field: 'service_price_large', header: 'Large Price' },
      { field: 'service_price_small', header: 'Small Price' },
      { field: 'service_price_xl', header: 'Extra Large Price' },
    ];
  }
  backToManager() {
    this.router.navigate(['manager']);
  }
  removeFields() {
    this.submitted = false;
    this.services.subcategory = '';
    this.services.serviceName = '';
    this.services.serviceDescription = '';
    this.services.servicePrice = '';
    this.services.serviceMediumPrice = '';
    this.services.serviceSmallPrice = '';
    this.services.servicelargePrice = '';
    this.services.serviceExtraLargePrice = '';
    this.services.serviceDuration = '';
    this.services.serviceTax = '';
    this.services.serviceVisibility = '';
  }
  addService() {
    var data = {
      sub_cat_id: this.services.subcategory,
      service_name: this.services.serviceName,
      service_description: this.services.serviceDescription,
      service_price: this.services.servicePrice,
      service_price_medium: this.services.serviceMediumPrice,
      service_price_large: this.services.servicelargePrice,
      service_price_small: this.services.serviceSmallPrice,
      service_price_xl: this.services.serviceExtraLargePrice,
      service_duration: this.services.serviceDuration,
      service_tax: this.services.serviceTax,
      service_visibility: this.services.serviceVisibility,
      rec_status: 1
    }
    this.managerservice.saveServices(data).subscribe(res => {
      console.log(res.json());
      this.serviceDetails.push(res.json().result);
      console.log(this.serviceDetails);
      $('#addServices').modal('hide');
    });
  }
  // editData:any =[];
  // temp:'';
  //   editService(data, index) {
  //     this.addEnableorDisable = 'hidden';
  //     this.updateEnableorDisable = 'visible'
  //     this.editData = data;
  //     data.index = index;
  //     this.temp = index;
  //     this.services.serviceId = this.editData[index].service_id,
  //     this.services.subcategory = this.editData[index].sub_cat_id,
  //     this.services.serviceName = this.editData[index].service_name,
  //       this.employee.branch = this.editData[index].employee_branch_id,
  //       this.employee.address = this.editData[index].employee_address,
  //       this.employee.pincode = this.editData[index].employee_pincode,
  //       this.employee.emailId = this.editData[index].email_id,
  //       this.employee.phoneNumber = this.editData[index].phone,
  //       this.employee.employeeType = this.editData[index].emp_type_id,
  //       this.employee.password = this.editData[index].password
  //     this.employee.status = this.editData[index].rec_status
  //   }

  omit_special_char(event) {
    var k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 0 || k == 32);
  }

  //This Method  allow Numbers
  only_allow_number(event) {
    var n;
    n = event.charCode
    return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
  }

  //this method allow both numbers and alphabets
  allow_numbers_alphabets(event) {
    var a;
    a = event.charCode
    return ((a > 64 && a < 91) || (a > 96 && a < 123) || a == 8 || a == 0 || (a >= 48 && a <= 57));
  }
}
