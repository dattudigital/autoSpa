import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  redirectToNewEmployee() {
    this.router.navigate(['add-employee'])
  }
  redirectToService() {
    this.router.navigate(['manager/services'])
  }
  redirectToCategory() {
    this.router.navigate(['manager/catrgory'])
  }
  redirectToSubcategory() {
    this.router.navigate(['manager/sub-catrgory'])
  }
}
