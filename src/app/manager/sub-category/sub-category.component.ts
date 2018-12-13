import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;


@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  categoryData: any = [];
  subCategoryData: any = [];
  cols: any[];
  subCategory: any = {
    'subCatId':'',
    'catId':'',
    'name': '',
    'status': ''
  }
  addEnableorDisable = 'visible';
  updateEnableorDisable = 'visible'
  editData: any = [];
  deleteData: any = [];
  temp: any;
  temp1: any;

  constructor(private router: Router, private managerservice: ManagerService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.managerservice.getCategoryDetails().subscribe(res => {
      if (res.json().status == true) {
        this.categoryData = res.json().result;
      } else {
        this.categoryData = [];
      }
    });
    this.managerservice.getSubCategory().subscribe(res => {
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

  removeFields() {
    this.updateEnableorDisable = 'hidden';
    this.addEnableorDisable = 'visible';
    this.subCategory.name = ' ';
    this.subCategory.catId = ' ';
  }

  addSubCategory() {
    var data = {
      cat_id: this.subCategory.catId,
      sub_category_name: this.subCategory.name,
      rec_status: 1
    }
    console.log(data)
    this.managerservice.saveSubCategory(data).subscribe(res => {
      console.log(res.json());
      this.subCategoryData.push(res.json().result);
      console.log(this.subCategoryData);
      $('#addSubCategory').modal('hide');
    });
  }

  editSubCategory(data, index) {
    this.addEnableorDisable = 'hidden';
    this.updateEnableorDisable = 'visible'
    this.editData = data;
    data.index = index;
    this.temp = index;
    this.subCategory.subCatId = this.editData[index].sub_cat_id,
    this.subCategory.catId = this.editData[index].cat_id,
    this.subCategory.name = this.editData[index].sub_category_name,
    this.subCategory.status = this.editData[index].rec_status
  }

  updateSubCategory() {
    var data = {
      sub_cat_id: this.subCategory.subCatId,
      cat_id: this.subCategory.catId,
      sub_category_name: this.subCategory.name,
      rec_status: this.subCategory.status
    }
    this.managerservice.saveSubCategory(data).subscribe(res => {
      this.subCategoryData[this.temp].sub_cat_id = data.sub_cat_id,
      this.subCategoryData[this.temp].cat_id = data.cat_id,
      this.subCategoryData[this.temp].sub_category_name = data.sub_category_name,
      this.subCategoryData[this.temp].rec_status = data.rec_status,
      this.temp = " "
    });
    $('#addSubCategory').modal('hide')
  }

  deleteSubCategory(val, index) {
    this.temp1 = index;
    this.deleteData = val;
    val.index = index;
    this.subCategory.subCatId = this.deleteData[index].sub_cat_id;
  }

  yesSubCategoryDelete() {
    this.subCategoryData.splice(this.temp1, 1)
    var data = {
      sub_cat_id: this.subCategory.subCatId,
      rec_status: "0"
    }
    this.managerservice.saveSubCategory(data).subscribe(res => {
    })
  }

}
