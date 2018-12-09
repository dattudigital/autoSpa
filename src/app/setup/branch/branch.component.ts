import { Component, OnInit } from '@angular/core';
import { ManagerService } from './../../services/manager.service'
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  branches: any = [];
  cols: any[];
  constructor(private service: ManagerService) { }

  ngOnInit() {
    this.allServices();
  }

  allServices() {
    this.cols = [
      { field: 'branch_name', header: 'Name' },
      { field: 'branch_address', header: 'Address' },
      { field: 'branch_area', header: 'Area' }
    ];
    this.service.getBranchDetails().subscribe(res => {
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
}
