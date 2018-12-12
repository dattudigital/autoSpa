import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetupService } from './../../services/setup.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  branches: any = [];
  cols: any[];
  constructor(private router: Router, private spinner: NgxSpinnerService,private service: SetupService) { }

  ngOnInit() {
    this.allServices();
  }

  allServices() {
    this.spinner.show();
    this.cols = [
      { field: 'branch_name', header: 'Name' },
      { field: 'branch_address', header: 'Address' },
      { field: 'branch_area', header: 'Area' }
    ];
    this.service.getBranchDetails().subscribe(res => {
      this.spinner.hide();
      console.log(res.json())
      if (res.json().status == true) {
        this.branches = res.json().result
      } else {
        this.branches = [];
      }
    })
  }

  addOrEditBranch(val, i) {
    console.log(val);
    console.log(i)
  }

  deleteBranch() {

  }

  backToSetup(){
    this.router.navigate(['setup']);
  }
}
