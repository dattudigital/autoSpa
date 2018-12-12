import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  subCategoryData: any = [];
  cols: any[];

  constructor(private router: Router, private service: ManagerService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getSubCategory().subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.subCategoryData = res.json().result;
      } else {
        this.subCategoryData = [];
      }
    });
    this.cols = [
      { field: 'sub_category_name', header: 'Sub-Category Name' }
    ];
  }
  backToManager() {
    this.router.navigate(['manager'])
  }
}
