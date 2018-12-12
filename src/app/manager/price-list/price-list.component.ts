import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  constructor(private router: Router, private service: ManagerService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  backToManager(){
    this.router.navigate(['manager'])
  }

}
