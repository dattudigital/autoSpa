import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Http } from '@angular/http';
import { VehicleDetailsService } from '../services/vehicle-details.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleServicesPipe } from './../pipe/vehicle-services.pipe'
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';

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
  total: any = 0;
  selectedUserEditSession: any;
  //for get empid and branchic
  loginData: any;
  empId: '';
  branchId: '';

  userInfo: any = [];
  data: object;
  deleteServiceIndex: any;
  saleUserId: any;
  saleInfoId: any;
  saleServiceId: any;
  makeFor = '1';
  typeFor = '1'
  invoiceNo: any;
  // growl options
  public options = { position: ["top", "right"] }
  constructor(private http: Http, private notif: NotificationsService, private cdr: ChangeDetectorRef, private vehicledetails: VehicleDetailsService, private formBuilder: FormBuilder, private servicePipe: VehicleServicesPipe, private router: Router, private spinner: NgxSpinnerService) { }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.makeDetails(this.makeFor);
    this.typeDetails(this.typeFor);
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
      Make: ['', Validators.required]
      // Size: ['', Validators.required]
      // Type: ['', Validators.required],
      // Age: ['', Validators.required]
    });

    this.loginData = JSON.parse(sessionStorage.getItem('userSession'));
    this.empId = this.loginData._results.employee_id
    this.branchId = this.loginData._results.employee_branch_id

    this.vehicledetails.getVehicleAge().subscribe(res => {
      if (res.json().status == true) {
        this.vehicleAge = res.json().result;
      } else {
        this.vehicleAge = [];
      }
    });

    this.vehicledetails.getVehicleServices().subscribe(res => {
      if (res.json().status == true) {
        this.vehicleServices = this.servicePipe.transform(res.json().result);
        if (this.selectedUserEditSession) {
          var temp = [];
          var temp1 = [];
          //selectedServices
          temp1 = this.serviceId.split(",");
          this.vehicleServices.forEach(element => {
            temp1.forEach(ele => {
              if (element.value.service_id == ele.trim()) {
                temp.push(element);
                this.selectedServices.push(element.value);
              }
            })
          });
          this.spinner.hide();
          this.totalServicePrice()
        }
      } else {
        this.vehicleServices = [];
      }
    });

    this.checkUserEditSession();
  }

  checkUserEditSession() {
    this.selectedUserEditSession = JSON.parse(sessionStorage.getItem('selectedUserEdit'));
    if (this.selectedUserEditSession) {
      this.spinner.show();
      this.firstName = this.selectedUserEditSession.firstname;
      this.emailId = this.selectedUserEditSession.email_id;
      this.mobileNo = this.selectedUserEditSession.mobile;
      this.profession = this.selectedUserEditSession.profession;
      this.address = this.selectedUserEditSession.address;
      this.sourceCustomer = this.selectedUserEditSession.source_customer;
      this.serviceType = this.selectedUserEditSession.service_type;
      this.businessType = this.selectedUserEditSession.business_type;

      this.selectedVechile = this.selectedUserEditSession.vehicle_type;
      if (this.selectedVechile == '0') {
        this.carUserClick('1');
      } else if (this.selectedVechile == '1') {
        this.bikeUserClick('2');
      } else if (this.selectedVechile == '2') {
        this.commercialUserClick('3');
      }
      this.selectedVechileNo = this.selectedUserEditSession.vehicle_no;
      this.selectedVechileMake = this.selectedUserEditSession.vehicle_make_id;
      this.selectedVechileSize = this.selectedUserEditSession.vehicle_size;
      this.selectedVechileType = this.selectedUserEditSession.vehicle_type_id;
      this.selectedVechileAge = this.selectedUserEditSession.vehicle_age_id;
      this.serviceId = this.selectedUserEditSession.services;

      this.saleUserId = this.selectedUserEditSession.sale_user_id;
      this.saleInfoId = this.selectedUserEditSession.sale_vehicle_info_id;
      this.saleServiceId = this.selectedUserEditSession.sale_user_service_id;
      this.total = this.selectedUserEditSession.invoice_total;
    }
  }

  getServiceInvoiceCost(val) {
    let sum = 0;
    for (let i = 0; i < val.length; i++) {
      // this.serviceId = this.serviceId + val[i].service_id + " , ";      
    }
  }

  totalServicePrice() {

    this.total = 0;
    for (let i = 0; i < this.selectedServices.length; i++) {
      if (this.selectedVechileSize == 's') {
        this.total = 1 * this.total + 1 * this.selectedServices[i]["service_price_small"]
      }
      if (this.selectedVechileSize == 'l') {
        this.total = 1 * this.total + 1 * this.selectedServices[i]["service_price_large"]
      }
      if (this.selectedVechileSize == 'm') {
        this.total = 1 * this.total + 1 * this.selectedServices[i]["service_price_medium"]
      }
      if (this.selectedVechileSize == 'xl') {
        this.total = 1 * this.total + 1 * this.selectedServices[i]["service_price_xl"]
      }
    }
  }
  onChangeServices(val) {
    // this.serviceTableValue = val;
    this.getServiceInvoiceCost(this.selectedServices);
    this.getServiceId(this.selectedServices);
  }
  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.firstName = this.selectedOption.firstname
    this.emailId = this.selectedOption.email_id
    this.mobileNo = this.selectedOption.mobile
    this.profession = this.selectedOption.profession
    this.address = this.selectedOption.address
    this.sourceCustomer = this.selectedOption.source_customer
    this.serviceType = this.selectedOption.service_type
    this.businessType = this.selectedOption.business_type

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
    this.deleteServiceIndex = index;
  }

  yesDeleteService() {
    this.selectedServices.splice(this.deleteServiceIndex, 1);
    this.getServiceId(this.selectedServices);    
    this.deleteService = null;
    this.totalServicePrice()
  }

  getServiceId(val) {
    this.serviceId = '';
    for (let i = 0; i < val.length; i++) {
      this.serviceId = this.serviceId + val[i].service_id + " , ";
    }
    this.serviceId = this.serviceId.substring(0, this.serviceId.length - 2);
  }

  clearUserdata(val) {
    this.firstName = '';
    this.emailId = '';
    this.mobileNo = '';
    this.profession = '';
    this.address = '';
    this.total ='';
    this.sourceCustomer = undefined;
    this.serviceType = undefined;
    this.businessType = undefined;
    this.selectedVechile = undefined;

    if (val == 1) {
      this.saleUserId = null;
      this.selectedVechileNo = '';
      this.selectedVechileMake = undefined;
      this.selectedVechileSize = undefined;
      this.selectedVechileType = undefined;
      this.selectedVechileAge = undefined;
      this.saleServiceId = null;
      this.serviceId = '';
      this.saleInfoId = null;
      this.selectedServices = [];
    }
    this.submitted = false;
  }

  resetCompleteUserVechileInfo() {
    this.clearUserdata(1);
    this.total = 0;
  }

  newUserClick() {
    this.clearUserdata(0);
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
  makeDetails(val) {
    this.makeFor = val;
    if (this.makeFor) {
      var url = ''
      url = url + '?makefor=' + this.makeFor;
      this.vehicledetails.getMakeDetails(url).subscribe(res => {
        if (res.json().status == true) {
          this.vehicleMake = res.json().result;
        } else {
          this.vehicleMake = [];
        }
      });
    }
  }
  typeDetails(val) {
    this.typeFor = val;
    if (this.typeFor) {
      var url = ''
      url = url + '?typefor=' + this.typeFor;
      this.vehicledetails.getTypeDetails(url).subscribe(res => {
        if (res.json().status == true) {
          this.vehicleType = res.json().result;
        } else {
          this.vehicleType = [];
        }
      });
    }
  }
  carUserClick(val) {
    this.makeDetails(val);
    this.typeDetails(val);
    this.selectedVechile = 0;
    this.vehInfo = true;
    this.carUser = true;
    this.vehservice = true;
    this.bikeUser = false;
    this.commercialUser = false;
  }

  bikeUserClick(val) {
    this.selectedVechileSize = 's';
    this.makeDetails(val);
    this.typeDetails(val);
    this.selectedVechile = 1;
    this.vehInfo = true;
    this.carUser = false;
    this.bikeUser = true;
    this.vehservice = true;
    this.commercialUser = false;
    this.selectedVechileMake = undefined;
    this.selectedVechileType = undefined;
  }

  commercialUserClick(val) {
    this.makeDetails(val);
    this.selectedVechile = 2;
    this.selectedVechileType = null;
    this.selectedVechileAge = null;
    this.vehInfo = true;
    this.carUser = false;
    this.bikeUser = false;
    this.commercialUser = true;
    this.vehservice = true;
    this.selectedVechileMake = undefined;
    this.selectedVechileSize = undefined;
  }

  redirectToSalesList() {
    sessionStorage.removeItem('selectedUserEdit');
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
    if (this.selectedVechileSize == undefined && (this.selectedVechile == 0 || this.selectedVechile == 2)) {
      this.notif.error(
        'error',
        'Please Select Vehicle Size ',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50
        }
      )
      return;
    }

    if (this.selectedUserEditSession) {
      this.invoiceNo = this.selectedUserEditSession.invoice_num
    } else {
      this.invoiceNo = Math.floor(Math.random() * 899999 + 100000)

    }

    this.data = {
      user: {
        sale_user_id: this.saleUserId,
        firstname: this.firstName,
        email_id: this.emailId,
        mobile: this.mobileNo,
        profession: this.profession,
        address: this.address,
        source_customer: this.sourceCustomer,
        service_type: this.serviceType,
        business_type: this.businessType,
        vehicle_type: this.selectedVechile,
        empid: this.empId,
        branchid: this.branchId,
        invoice_num: this.invoiceNo,
        invoice_total: this.total
      },
      vechileInfo: {
        sale_vehicle_info_id: this.saleInfoId,
        vehicle_no: this.selectedVechileNo,
        vehicle_make_id: this.selectedVechileMake,
        vehicle_size: this.selectedVechileSize,
        vehicle_type_id: this.selectedVechileType,
        vehicle_age_id: this.selectedVechileAge

      },
      vechileServices: {
        sale_user_service_id: this.saleServiceId,
        services: this.serviceId
      }
    }

    console.log("******************")
    console.log(this.data)
    this.spinner.show();
    this.vehicledetails.userVehicleService(this.data).subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        console.log("came to here ");
        this.notif.success(
          'Success',
          'Successfully Done',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )            
      } else {
        console.log("*****************");
      }
    });
  }
}
