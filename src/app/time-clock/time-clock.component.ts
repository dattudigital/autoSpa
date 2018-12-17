import { Component, OnInit } from '@angular/core';
import { TimeClocksService } from '../services/time-clocks.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $: any;
import { Location } from '@angular/common';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.css']
})
export class TimeClockComponent implements OnInit {
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
  errorMessage = false;
  today: number;
  password = "";
  mailId = "";
  alerts: any[] = [];
  loginTest: any = {
    'user_type_id': '',
    'employee_id': ''
  };
  test: 'text';
  data: any = {
    'time_clock_id': '',
    'emp_id': '',
    'check_in_time': null,
    'check_out_time': null,
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

  constructor(private service: TimeClocksService, private spinner: NgxSpinnerService, private router: Router, private _location: Location, private messageService: MessageService, private http: HttpClient) { }

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
    if (sessionStorage.backBtnTimeclocks) {
      $('#time-click-login').modal('hide');
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
      this.http.post(environment.host + 'time-clocks/login', data).subscribe(loginData => {
        this.spinner.hide();
        this.data.time_clock_id = loginData["result"].time_clock_id;
        this.data.emp_id = loginData["result"].emp_id;
        this.data.check_in_time = loginData["result"].check_in_time;
        this.data.check_out_time = loginData["result"].check_out_time;
        this.data.break_in1 = loginData["result"].break_in1;
        this.data.break_out1 = loginData["result"].break_out1;
        this.data.break_in2 = loginData["result"].break_in2;
        this.data.break_out2 = loginData["result"].break_out2;
        this.data.break_in3 = loginData["result"].break_in3;
        this.data.break_out3 = loginData["result"].break_out3;
        this.data.break_in4 = loginData["result"].break_in4;
        this.data.break_out4 = loginData["result"].break_out4;
        this.data.check_in_date = loginData["result"].check_in_date;
        this.data.modified_by = loginData["result"].modified_by;
        this.data.remarks = loginData["result"].remarks;
        this.data.total_hours = loginData["result"].total_hours;

        if (loginData["status"] == true) {
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
      this.data.time_clock_id = response.json().result.time_clock_id;
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
    this.service.saveInandOutTime(this.data).subscribe(response => {
    });
    this.disable_break_out = true;
    this.disable_break_in = true;
    this.buttonColorTimeIn = '#345465';
    this.buttonColorTimeOut = '#345465';
    this.buttonColorBreakIn = '#345465';
    this.buttonColorBreakOut = '#345465';

    let resultInMinutes1 = Math.round((new Date(this.getFormattedDate(this.data.break_in1)).getTime() - new Date(this.getFormattedDate(this.data.break_out1)).getTime()) / 60000);
    let resultInMinutes2 = Math.round((new Date(this.getFormattedDate(this.data.break_in2)).getTime() - new Date(this.getFormattedDate(this.data.break_out2)).getTime()) / 60000);
    let resultInMinutes3 = Math.round((new Date(this.getFormattedDate(this.data.break_in3)).getTime() - new Date(this.getFormattedDate(this.data.break_out3)).getTime()) / 60000);
    let resultInMinutes4 = Math.round((new Date(this.getFormattedDate(this.data.break_in4)).getTime() - new Date(this.getFormattedDate(this.data.break_out4)).getTime()) / 60000);
    var timeDiffTotal = resultInMinutes1 + resultInMinutes2 + resultInMinutes3 + resultInMinutes4;
    let resultInMinutes = Math.round((new Date(this.getFormattedDate(this.data.check_out_time)).getTime() - new Date(this.getFormattedDate(this.data.check_in_time)).getTime()) / 60000);

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

  commonBreakOutCode() {
    this.service.saveInandOutTime(this.data).subscribe(response => {
    });
    this.disable_break_out = true;
    this.disable_break_in = false;
    this.buttonColorBreakIn = '#e4e9ef';
    this.buttonColorBreakOut = '#345465';
  }

  breakOutTime() {
    if (this.data.break_out1 === null) {
      this.data.break_out1 = Date.now();
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