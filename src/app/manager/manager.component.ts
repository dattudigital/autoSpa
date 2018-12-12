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
    this.router.navigate(['manager/add-employee'])
  }
  redirectToPriceList(){
    this.router.navigate(['manager/price-list'])
  }
  redirectToCategory() {
    this.router.navigate(['manager/category'])
  }
  redirectToSubCategory() {
    this.router.navigate(['manager/sub-category'])
  }
  redirectToService() {
    this.router.navigate(['manager/services'])
  }
  redirectToPackage(){
    this.router.navigate(['manager/packages'])
  }
}
