import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password = "";
  mailId = "";
  alerts: any[] = [];
  errorMessage = false;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.loginPopUp();
  }

  loginSubmite() {
    sessionStorage.removeItem('userSession')
    var data = {
      password: this.password,
      email_id: this.mailId
    }
    if (this.mailId && this.password) {
      this.spinner.show();
      this.loginService.loginData(data).subscribe(loginData => {
        this.spinner.hide();
        if (loginData.json().status == false) {
          this.errorMessage = true;
        } else {
          sessionStorage.removeItem('selectedUserEdit');
          sessionStorage.setItem('userSession', JSON.stringify(loginData.json()));
          this.router.navigate(['dashboard']);
          $('#loginModal').modal('hide');
        }
      });
    } else {
      this.errorMessage = true;
    }
  }

  loginPopUp() {
    $('#loginModal').modal('show');
  }
}
