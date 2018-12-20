import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetupService } from './../../services/setup.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})

export class BranchComponent implements OnInit {
  branchForm: FormGroup;
  submitted = false;
  branch: any = {
    'branchId': '',
    'branchName': '',
    'branchAddress': '',
    'branchArea': '',
    'branchLocation': '',
    'branchEmail': '',
    'phoneNumber': '',
    'status': ''
  }
  branches: any = [];
  cols: any[];
  temp: any;
  temp1: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private spinner: NgxSpinnerService, private setupService: SetupService) { }

  ngOnInit() {
    this.allServices();

    this.branchForm = this.formBuilder.group({
      branchName: ['', Validators.required],
      branchAddress: ['', Validators.required],
      branchArea: ['', Validators.required],
      branchLocation: ['', Validators.required],
      branchEmail: ['', Validators.required],
      Phone: ['', Validators.required]
    });
  }

  allServices() {
    this.spinner.show();
    this.cols = [
      { field: 'branch_name', header: 'Name' },
      { field: 'branch_address', header: 'Address' },
      { field: 'branch_area', header: 'Area' }
    ];
    this.setupService.getBranchDetails().subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.branches = res.json().result
      } else {
        this.branches = [];
      }
    })
  }

  backToSetup() {
    this.router.navigate(['setup']);
  }

  removeFields() {
    this.submitted = false;
    this.branch.branchId = '';
    this.branch.branchName = '';
    this.branch.branchAddress = '';
    this.branch.branchArea = '';
    this.branch.branchLocation = '';
    this.branch.branchEmail = '';
    this.branch.phoneNumber = '';
  }

  get f() { return this.branchForm.controls; }

  addBranch() {
    this.submitted = true;
    if (this.branchForm.invalid) {
      return;
    }
    var data = {
      branch_name: this.branch.branchName,
      branch_address: this.branch.branchAddress,
      branch_area: this.branch.branchArea,
      branch_location: this.branch.branchLocation,
      branch_email: this.branch.branchEmail,
      branch_contact_number: this.branch.phoneNumber,
      rec_status: 1
    }
    this.setupService.saveBranchDetails(data).subscribe(res => {
      this.branches.push(res.json().result);
      $('#addBranch').modal('hide');
    });
  }

  editBranch(data, index) {
    this.temp = index;
    this.branch.branchId = data[index].branch_id,
      this.branch.branchName = data[index].branch_name,
      this.branch.branchAddress = data[index].branch_address,
      this.branch.branchArea = data[index].branch_area,
      this.branch.branchLocation = data[index].branch_location,
      this.branch.branchEmail = data[index].branch_email,
      this.branch.phoneNumber = data[index].branch_contact_number,
      this.branch.status = data[index].rec_status
  }

  updateBranch() {
    var data = {
      branch_id: this.branch.branchId,
      branch_name: this.branch.branchName,
      branch_address: this.branch.branchAddress,
      branch_area: this.branch.branchArea,
      branch_location: this.branch.branchLocation,
      branch_email: this.branch.branchEmail,
      branch_contact_number: this.branch.phoneNumber,
      rec_status: 1
    }
    this.setupService.saveBranchDetails(data).subscribe(res => {
      this.branches[this.temp].branch_name = data.branch_name;
      this.branches[this.temp].branch_address = data.branch_address;
      this.branches[this.temp].branch_area = data.branch_area;
      this.branches[this.temp].branch_location = data.branch_location;
      this.branches[this.temp].branch_email = data.branch_email;
      this.branches[this.temp].branch_contact_number = data.branch_contact_number;
      this.branches[this.temp].rec_status = data.rec_status;
      this.temp = " ";
    });
    $('#addBranch').modal('hide')
  }

  deleteBranch(val, index) {
    this.temp1 = index;
    this.branch.branchId = val[index].branch_id
  }

  yesBranchDelete() {
    this.branches.splice(this.temp1, 1)
    var data = {
      branch_id: this.branch.branchId,
      rec_status: "0"
    }
    this.setupService.saveBranchDetails(data).subscribe(res => {
    })
  }

  only_allow_number(event) {
    var n = event.charCode
    return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
  }
  omit_special_char(event) {
    var k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 0 || k == 32);
  }
  allow_numbers_alphabets(event) {
    var a = event.charCode
    return ((a > 64 && a < 91) || (a > 96 && a < 123) || a == 8 || a == 0 || (a >= 48 && a <= 57));
  }

}
