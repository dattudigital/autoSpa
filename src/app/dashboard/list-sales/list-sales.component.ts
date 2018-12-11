import { Component, OnInit } from '@angular/core';
import { VehicleDetailsService } from './../../services/vehicle-details.service'
import { Router } from '@angular/router';
import { SaleUserDetailsPipe } from './../../pipe/sale-user-details.pipe'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.css']
})

export class ListSalesComponent implements OnInit {
  userDetailsDatas: any = [];
  printStyle = "hidden";
  constructor(private userListService: VehicleDetailsService, private router: Router, private saleUserPipe: SaleUserDetailsPipe, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.userListService.getUserDetails().subscribe(res => {
      if (res.json().status == true) {
        this.userDetailsDatas = this.saleUserPipe.transform(res.json().result);
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.userDetailsDatas = [];
      }
    })
  }

  redirectToAddSale() {
    this.router.navigate(['dashboard']);
  }

  editUser(val, i) {
    val.index = i;
    sessionStorage.setItem('selectedUserEdit', JSON.stringify(val));
    this.router.navigate(['dashboard']);
  }
  printInvoice(printlist) {
    this.printStyle = "visible";
    let printContents = document.getElementById(printlist).innerHTML;
    const popupWin = window.open();
    popupWin.document.open();
    popupWin.document.write(`
<html>
    <head>
        <title>INVOICE FORM</title>           
    </head>
    <body onload="window.print(); window.close()">
        ${printContents}
    </body>
</html>
`  );
    popupWin.document.close();
    this.printStyle = "hidden";
  }

}
