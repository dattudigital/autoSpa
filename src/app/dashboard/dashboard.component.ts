import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Http } from '@angular/http';
import { VehicleDetailsService } from '../services/vehicle-details.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleServicesPipe } from './../pipe/vehicle-services.pipe'
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
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
  discountApproval: any;
  // vechile info
  selectedVechile: any = 0;
  selectedVechileNo: string;
  selectedVechileMake: any;
  selectedVechileSize: any;
  selectedVechileAge: any;
  selectedVechileType: any;
  employees: any = [];
  vehicleAge: any = [];
  vehicleType: any = [];
  vehicleMake: any = [];
  vehicleServices: any = [];
  existingDetail: string;
  serviceId: string;
  total: any = 0;
  tempTotal = 0;
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
  salePaymentId: any;
  makeFor = '1';
  typeFor = '1'
  invoiceNo: any;
  // growl options
  public options = { position: ["top", "right"] }
  //payment mode Details
  public date2: any;
  payment: any = {
    'cashSelect': '',
    'cashAmount': '',
    'chequeSelect': '',
    'chequeAmount': '',
    'chequeNo': '',
    'chequeDate': null,
    'bankName': '',
    'creditcardSelect': '',
    'creditcardAmount': '',
    'creditTransId': '',
    'accountTranferSelect': '',
    'accounttranferAmount': '',
    'accountTranferId': '',
    'othersSelect': '',
    'mobileWallet': '',
    'othersAmount': ''
  }
  disableCash = 'hidden';
  isDisabled = 'hidden';
  disableCredit = 'hidden';
  disableTransfer = 'hidden';
  disableOther = 'hidden';
  disableDiscount = 'hidden';

  discount: any;
  cashTotal = 0;
  paymentTypes: any = []
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
    });

    this.vehicledetails.getPaymentTypes().subscribe(res => {
      if (res.json().status == true) {
        this.paymentTypes = res.json().result;
      } else {
        this.paymentTypes = [];
      }
    })

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

    this.vehicledetails.getEmployee().subscribe(res => {
      console.log(res.json())
      if (res.json().status == true) {
        this.employees = res.json().result;
      } else {
        this.employees = [];
      }
    })

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
      this.discountApproval = this.selectedUserEditSession.dis_approval_by_empid;
      if(this.selectedUserEditSession.discount_per){
        this.discount = parseFloat(this.selectedUserEditSession.discount_per);        
      }      
    }
  }

  // getServiceInvoiceCost(val) {
  //   let sum = 0;
  //   for (let i = 0; i < val.length; i++) {
  //    this.serviceId = this.serviceId + val[i].service_id + " , ";      
  //   }
  // }

  totalServicePrice() {
    this.total = 0;
    for (let i = 0; i < this.selectedServices.length; i++) {
      if (this.selectedVechileSize == 's') {
        this.total = 1 * this.total + 1 * this.selectedServices[i]["service_price_small"];
        this.tempTotal = this.total;
      }
      if (this.selectedVechileSize == 'l') {
        this.total = 1 * this.total + 1 * this.selectedServices[i]["service_price_large"];
        this.tempTotal = this.total;
      }
      if (this.selectedVechileSize == 'm') {
        this.total = 1 * this.total + 1 * this.selectedServices[i]["service_price_medium"];
        this.tempTotal = this.total;
      }
      if (this.selectedVechileSize == 'xl') {
        this.total = 1 * this.total + 1 * this.selectedServices[i]["service_price_xl"];
        this.tempTotal = this.total;
      }
    }
  }

  onChangeServices(val) {
    if (!this.selectedVechileSize) {
      this.notif.warn(
        'Warning',
        'Please Select Vehicle Size',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50
        }
      )
    }
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
    this.total = '';
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
      this.salePaymentId = null;
      this.selectedServices = [];
    }
    this.submitted = false;
  }

  resetCompleteUserVechileInfo() {
    this.clearUserdata(1);
    this.total = 0;
  }
  getChequedate() {
    let newDate = moment(this.payment.chequeDate).format('YYYY-MM-DD').toString();
    this.payment.chequeDate = newDate;
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
    this.selectedVechileSize = undefined;
    this.selectedVechileAge = undefined;
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
    this.selectedVechileAge = undefined;
    this.selectedVechileType = undefined;
  }

  commercialUserClick(val) {
    this.makeDetails(val);
    this.selectedVechile = 2;
    this.selectedVechileType = undefined;
    this.selectedVechileAge = undefined;
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

  cashChangeEvent() {
    if (this.payment.cashSelect == false) {
      this.disableCash = 'hidden';
      this.payment.cashAmount = null;
    } else {
      this.disableCash = 'visible';
    }
  }

  triggerSomeEvent() {
    if (this.payment.chequeSelect == false) {
      this.isDisabled = 'hidden';
      this.payment.chequeAmount = null;
      this.payment.chequeNo = null;

    } else {
      this.isDisabled = 'visible';
    }
  }

  tranferEvent() {
    if (this.payment.accountTranferSelect == false) {
      this.disableTransfer = 'hidden';
      this.payment.accountTranferId = null;
      this.payment.accounttranferAmount = null;
    } else {
      this.disableTransfer = 'visible';
    }
  }

  creditCardEvent() {
    if (this.payment.creditcardSelect == false) {
      this.disableCredit = 'hidden';
      this.payment.creditcardAmount = '';
      this.payment.creditTransId = null;
    } else {
      this.disableCredit = 'visible';
    }
  }

  otherEvent() {
    if (this.payment.othersSelect == false) {
      this.disableOther = 'hidden';
      this.payment.othersAmount = null;
      this.payment.othersSelect = '';
    } else {
      this.disableOther = 'visible';
    }
  }

  addTotalAmount() {
    this.cashTotal = 0;
    if (this.payment.chequeAmount && this.payment.chequeSelect) {
      this.cashTotal = this.cashTotal + this.payment.chequeAmount;
    }
    if (this.payment.cashAmount && this.payment.cashSelect) {
      this.cashTotal = this.cashTotal + this.payment.cashAmount
    }
    if (this.payment.creditcardAmount && this.payment.creditcardSelect) {
      this.cashTotal = this.cashTotal + this.payment.creditcardAmount
    }
    if (this.payment.accounttranferAmount && this.payment.accountTranferSelect) {
      this.cashTotal = this.cashTotal + this.payment.accounttranferAmount;
    }
    if (this.payment.othersAmount && this.payment.othersSelect) {
      this.cashTotal = this.cashTotal + this.payment.othersAmount
    }
  }

  get f() { return this.salesForm.controls; }
  get v() { return this.vehicleForm.controls; }

  discountOption() {
    let _total = 0;
    _total = this.tempTotal;    
    console.log(this.discount)
    if (typeof this.discount == 'string') {
      this.total = this.tempTotal;
    } else {
      if (this.discount == undefined) {
        this.total = this.tempTotal;
      } else {
        this.total = _total - (_total * this.discount);
      }
    }
  }

  addUserInfoAndVehicle() {
    if (typeof this.discount == 'number') {
      if (!this.discountApproval) {
        this.notif.error(
          'Error',
          'Please Select Employee Approval By',
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
    }

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
        'Error',
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
    if (this.selectedServices.length == 0) {
      this.notif.error(
        'Error',
        'Please Select Atleast One Services ',
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
    if (this.payment.chequeSelect == true) {
      this.payment.chequeSelect = '1'
    } else {
      this.payment.chequeSelect = '0'
    }

    if (this.payment.cashSelect == true) {
      this.payment.cashSelect = '1'
    } else {
      this.payment.cashSelect = '0'
    }
    if (this.payment.creditcardSelect == true) {
      this.payment.creditcardSelect = '1'
    } else {
      this.payment.creditcardSelect = '0'
    }
    if (this.payment.accountSelect == true) {
      this.payment.accountSelect = '1'
    } else {
      this.payment.accountSelect = '0'
    }

    if (this.payment.othersSelect == true) {
      this.payment.otherSelect = '1'
    } else {
      this.payment.otherSelect = '0'
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
        discount_per: this.discount,
        dis_approval_by_empid: this.discountApproval,
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
      },

      payment: {
        sale_user_vechile_payment_id: this.salePaymentId,
        cheque: this.payment.chequeSelect,
        cheque_no: this.payment.chequeNo,
        cheque_date: this.payment.chequeDate,
        cheque_amt: this.payment.chequeAmount,
        cheque_bank: this.payment.bankName,
        cash: this.payment.cashSelect,
        cash_amount: this.payment.cashAmount,
        credit_card: this.payment.creditcardSelect,
        credit_card_tranactionid: this.payment.creditTransId,
        credit_card_amt: this.payment.creditcardAmount,
        account_transfer: this.payment.accountSelect,
        account_trasaction_id: this.payment.accountTranferId,
        account_transfer_amt: this.payment.accounttranferAmount,
        other: this.payment.otherSelect,
        others_type: this.payment.mobileWallet,
        others_amt: this.payment.othersAmount,
      }
    }
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
        this.notif.error(
          'Error',
          'Something Went Wrong',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      this.router.navigate(['list-sales'])
    });
  }

  //this method  allow alphabets 
  omit_special_char(event) {
    var k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 0 || k == 32);
  }

  //This Method  allow Numbers
  only_allow_number(event) {
    var n = event.charCode
    return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
  }

  //this method allow bothe numbers and alphabets
  allow_numbers_alphabets(event) {
    var a = event.charCode
    return ((a > 64 && a < 91) || (a > 96 && a < 123) || a == 8 || a == 0 || (a >= 48 && a <= 57));
  }
}
