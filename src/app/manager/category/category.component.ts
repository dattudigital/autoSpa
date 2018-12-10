import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryData: any = [];
  cols: any[];

  constructor(private router: Router, private service: ManagerService) { }

  ngOnInit() {
    this.service.getCategoryDetails().subscribe(res => {
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
}
