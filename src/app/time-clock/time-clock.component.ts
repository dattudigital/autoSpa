import { Component, OnInit } from '@angular/core';
import { TimeClocksService } from '../services/time-clocks.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $: any;
import { Location } from '@angular/common';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.css']
})
export class TimeClockComponent implements OnInit {
  memberships: any = [];
  temp: any[] = new Array();
  userActivity: any[] = new Array();
  textArray: any[] = new Array();
  disable_time_in = false;
  disable_break_out = true;
  disable_break_in = true;
  disable_time_out = true;
  titleStyle = "hidden";
  buttonColorTimeIn: string = '#e4e9ef';
  buttonColorTimeOut: string = '#345465';
  buttonColorBreakIn: string = '#345465';
  buttonColorBreakOut: string = '#345465';
  totalHours;
  totalMin;
  finalHours;

  constructor(private service: TimeClocksService, private spinner: NgxSpinnerService, private router: Router, private _location: Location, private messageService: MessageService, private http: HttpClient) { }

  emp_id = '';
  errorMessage = false;
  check_in_time = null;
  check_out_time = null;
  break_in1 = null;
  break_out1 = null;
  break_in2 = null;
  break_out2 = null;
  break_in3 = null;
  break_out3 = null;
  break_in4 = null;
  break_out4 = null;
  check_in_date = '';
  modified_by = '';
  total_hours = '';
  remarks = '';
  today: number;
  password = "";
  mailId = "";
  alerts: any[] = [];
  loginData: any[];
  loginTest: any = {
    'user_type_id': '',
    'employee_id': ''
  };
  test: 'text';
  test1: any;
  data: any = {
    'time_clock_id': '',
    'emp_id': '',
    'check_in_time': null,
    'break_in1': null,
    'break_out1': null,
    'break_in2': null,
    'break_out2': null,
    'break_in3': null,
    'break_out3': null,
    'break_out4': null,
    'check_in_date': null,
    'modified_by': null,
    'remarks': null,
    'total_hours': ''
  };
  msgs: Message[] = [];

  ngOnInit() {
    this.loginPopUp();
    this.getTimeAndDate();
    setInterval(() => {
      this.getTimeAndDate();
    }, 1000);

  }

  getTimeAndDate() {
    this.today = Date.now();
  }

  showError() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', detail: 'Validation failed' });
  }

  loginPopUp() {
    console.log('login')
    if (sessionStorage.backBtnTimeclocks) {
      $('#time-click-login').modal('hide');
      console.log('@@@')
      this.titleStyle = "visible";
    } else {
      $('#time-click-login').modal('show');
    }
  }

  backLocation() {
    this._location.back();
  }

  RedirectToHome() {
    this.router.navigate(['dashboard']);
  }

  errorClear() {
    this.errorMessage = false;
  }

  loginSubmit() {
    var data = {
      password: this.password,
      email_id: this.mailId
    }
    sessionStorage.removeItem('setup');
    sessionStorage.removeItem('inventory');
    sessionStorage.removeItem('manager');
    this.spinner.show();
    if (this.mailId && this.password) {
      console.log(data)
      this.http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3006/time-clocks/login', data).subscribe(response => {
        console.log(response);
        
        this.spinner.hide();
        this.test1 = response;
        console.log("@@@@")
        console.log(this.test1.result.emp_id)
        this.data.time_clock_id = this.test1.result.time_clock_id;
        this.data.emp_id = this.test1.result.emp_id;
        this.data.check_in_time = this.test1.result.check_in_time;
        this.data.check_out_time = this.test1.result.check_out_time;
        this.data.break_in1 = this.test1.result.break_in1;
        this.data.break_out1 = this.test1.result.break_out1;
        this.data.break_in2 = this.test1.result.break_in2;
        this.data.break_out2 = this.test1.result.break_out2;
        this.data.break_in3 = this.test1.result.break_in3;
        this.data.break_out3 = this.test1.result.break_out3;
        this.data.break_in4 = this.test1.result.break_in4;
        this.data.break_out4 = this.test1.result.break_out4;
        this.data.check_in_date = this.test1.result.check_in_date;
        this.data.modified_by = this.test1.result.modified_by;
        this.data.remarks = this.test1.result.remarks;
        this.data.total_hours = this.test1.result.total_hours;

        if (this.test1.status == true) {
          $('#time-click-login').modal('hide');
          this.titleStyle = "visible";

        } else {
          this.errorMessage = true;
        }

        if (this.data.check_in_time) {
          this.disable_time_in = true;
          this.disable_break_out = false;
          this.disable_break_in = false;
        }
        if (!this.data.check_out_time) {
          this.disable_time_out = false;
        }
      });
    } else {
      this.spinner.hide();
      this.alerts = [{
        type: 'danger',
        msg: `Invalid credentials`,
        timeout: 1000
      }];
    }
  }
  time_in = this.data.check_in_time;
  first_break_out = this.data.break_out1

  clockInTime() {
    this.data.check_in_time = Date.now();
    this.service.saveInandOutTime(this.data).subscribe(response => {
      console.log(response.json().result.time_clock_id);
      this.data.time_clock_id = response.json().result.time_clock_id;
      console.log(this.data.time_clock_id);
    });
    this.disable_time_in = true;
    this.disable_break_out = false;
    this.disable_time_out = false;

    this.buttonColorTimeIn = '#345465';
    this.buttonColorTimeOut = '#e4e9ef';
    this.buttonColorBreakIn = '#345465';
    this.buttonColorBreakOut = '#e4e9ef';
  }

  clockOutTime() {
    this.data.check_out_time = Date.now();
    console.log(this.data.check_out_time)
    this.service.saveInandOutTime(this.data).subscribe(response => {
    });
    this.disable_break_out = true;
    this.disable_break_in = true;

    this.buttonColorTimeIn = '#345465';
    this.buttonColorTimeOut = '#345465';
    this.buttonColorBreakIn = '#345465';
    this.buttonColorBreakOut = '#345465';

    let BreakOut1 = this.getFormattedDate(this.data.break_out1);
    let BreakIn1 = this.getFormattedDate(this.data.break_in1);
    var dt1 = new Date(BreakOut1);
    var dt2 = new Date(BreakIn1);
    let difference1 = dt2.getTime() - dt1.getTime();
    let resultInMinutes1 = Math.round(difference1 / 60000);

    let BreakOut2 = this.getFormattedDate(this.data.break_out2);
    let BreakIn2 = this.getFormattedDate(this.data.break_in2);
    var dt3 = new Date(BreakOut2);
    var dt4 = new Date(BreakIn2);
    let difference2 = dt4.getTime() - dt3.getTime();
    let resultInMinutes2 = Math.round(difference2 / 60000);

    let BreakOut3 = this.getFormattedDate(this.data.break_out3);
    let BreakIn3 = this.getFormattedDate(this.data.break_in3);
    var dt5 = new Date(BreakOut3);
    var dt6 = new Date(BreakIn3);
    let difference3 = dt6.getTime() - dt5.getTime();
    let resultInMinutes3 = Math.round(difference3 / 60000);

    let BreakOut4 = this.getFormattedDate(this.data.break_out4);
    let BreakIn4 = this.getFormattedDate(this.data.break_in4);
    var dt7 = new Date(BreakOut4);
    var dt8 = new Date(BreakIn4);
    let difference4 = dt8.getTime() - dt7.getTime();
    let resultInMinutes4 = Math.round(difference4 / 60000);

    var timeDiffTotal = resultInMinutes1 + resultInMinutes2 + resultInMinutes3 + resultInMinutes4;
    let TimeIn = this.getFormattedDate(this.data.check_in_time);
    let TimeOut = this.getFormattedDate(this.data.check_out_time);
    var dt0 = new Date(TimeIn);
    var dt9 = new Date(TimeOut);
    let totaldiff = dt9.getTime() - dt0.getTime();
    let resultInMinutes = Math.round(totaldiff / 60000);
    var finaltotal = resultInMinutes - timeDiffTotal;
    this.totalHours = Math.round(finaltotal / 60);
    if (this.totalHours == 0) {
      this.totalMin = finaltotal - (60 * this.totalHours);
    } else {
      this.totalMin = (60 * this.totalHours) - finaltotal;
    }
    this.finalHours = this.totalHours + ":" + this.totalMin;
    // console.log("total hrs")
    // this.data.total_hours = this.finalHours;
    // console.log(this.data.total_hours)
    // this.service.saveInandOutTime(this.data.total_hours).subscribe(response => {
    // });
  }

  getFormattedDate(_date) {
    var date = new Date(_date);
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return str;
  }

  commonBreakOutCode(){
    this.service.saveInandOutTime(this.data).subscribe(response => {
    });
    this.disable_break_out = true;
    this.disable_break_in = false;

    this.buttonColorBreakIn = '#e4e9ef';
    this.buttonColorBreakOut = '#345465';
  }

  breakOutTime() {
    console.log('#######')
    console.log(this.data)
    console.log(this.data.break_out1);
    if (this.data.break_out1 === null) {
      this.data.break_out1 = Date.now();
      console.log(this.data.break_out1);
      this.commonBreakOutCode();
      return true;
    }
    if (this.data.break_out2 === null) {
      this.data.break_out2 = Date.now();
      this.commonBreakOutCode();
      return true;
    }
    if (this.data.break_out3 === null) {
      this.data.break_out3 = Date.now();
      this.commonBreakOutCode();
      return true;
    }
    if (this.data.break_out4 === null) {
      this.data.break_out4 = Date.now();
      this.commonBreakOutCode();
      return true;
    }
  }

  commonBreakInCode() {
    this.service.saveInandOutTime(this.data).subscribe(response => {
    });
    this.disable_break_out = false;
    this.disable_break_in = true;

    this.buttonColorBreakIn = '#345465';
    this.buttonColorBreakOut = '#e4e9ef';
  }

  breakInTime() {
    console.log(this.data)
    if (this.data.break_in1 === null) {
      this.data.break_in1 = Date.now();
      this.commonBreakInCode()
      return true;
    }
    if (this.data.break_in2 === null) {
      this.data.break_in2 = Date.now();
      this.commonBreakInCode()
      return true;
    }
    if (this.data.break_in3 === null) {
      this.data.break_in3 = Date.now();
      this.commonBreakInCode()
      return true;
    }
    if (this.data.break_in4 === null) {
      this.data.break_in4 = Date.now();
      this.commonBreakInCode()
      return true;
    }
  }

}
