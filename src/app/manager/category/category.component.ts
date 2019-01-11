import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryData: any = [];
  cols: any[];
  category: any = {
    'catId': '',
    'name': '',
    'status': ''
  }
  addEnableorDisable = 'visible';
  updateEnableorDisable = 'visible'
  editData: any = [];
  deleteData: any = [];
  temp: any;
  temp1: any;

  constructor(private router: Router, private service: ManagerService, private spinner: NgxSpinnerService, private managerservice: ManagerService) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getCategoryDetails().subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.categoryData = res.json().result;
      } else {
        this.categoryData = [];
      }
    });
    this.cols = [
      { field: 'category_name', header: 'Category Name' }
    ];
  }

  backToManager() {
    this.router.navigate(['manager'])
  }

  removeFields() {
    this.updateEnableorDisable = 'hidden';
    this.addEnableorDisable = 'visible';
    this.category.name = ' ';
  }

  addCategory() {
    var data = {
      category_name: this.category.name,
      rec_status: 1
    }
    this.managerservice.saveCategoryDetails(data).subscribe(res => {
      this.categoryData.push(res.json().result);
      $('#addCategory').modal('hide');
    });
  }

  editCategory(data, index) {
    this.addEnableorDisable = 'hidden';
    this.updateEnableorDisable = 'visible'
    this.editData = data;
    data.index = index;
    this.temp = index;
    this.category.catId = this.editData[index].cat_id,
    this.category.name = this.editData[index].category_name,
    this.category.status = this.editData[index].rec_status
  }

  updateCategory() {
    var data = {
      cat_id: this.category.catId,
      category_name: this.category.name,
      rec_status: this.category.status
    }
    this.managerservice.saveCategoryDetails(data).subscribe(res => {
      this.categoryData[this.temp].cat_id = data.cat_id,
      this.categoryData[this.temp].category_name = data.category_name,
      this.categoryData[this.temp].rec_status = data.rec_status,
      this.temp = " "
    });
    $('#addCategory').modal('hide')
  }

  deleteCategory(val, index) {
    this.temp1 = index;
    this.deleteData = val;
    val.index = index;
    this.category.catId = this.deleteData[index].cat_id;
  }

  yesCategoryDelete() {
    this.categoryData.splice(this.temp1, 1)
    var data = {
      cat_id: this.category.catId,
      rec_status: "0"
    }
    this.managerservice.saveCategoryDetails(data).subscribe(res => {
    })
  }


}
