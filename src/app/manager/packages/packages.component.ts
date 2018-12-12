import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  constructor(private router: Router, private service: ManagerService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  backToManager(){
    this.router.navigate(['manager'])
  }

}
