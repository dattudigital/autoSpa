import { Component, OnInit } from '@angular/core';
import { VehicleDetailsService } from './../../services/vehicle-details.service'
import { Router } from '@angular/router';
import { SaleUserDetailsPipe } from './../../pipe/sale-user-details.pipe'
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.css']
})

export class ListSalesComponent implements OnInit {
  userDetailsDatas: any = [];
  printStyle = "hidden";
  editData: any = [];
  //to display branch details on print form
  branchAddress: '';
  branchArea: '';
  branchLocation: '';
  branchContact: '';
  percentageVal:any;
  //to print invoice details
  userAddress: '';
  invoiceNo: '';
  invoiceTotal: any;
  invoiceDate: '';
  vehicleNo: '';
  vatCalculate: any;
  serviceTax: any;
  totalWithTax: any;
  servicesData: any
  servicePrice: any;
  vehicleSize: any;

  constructor(private userListService: VehicleDetailsService, private http: Http, private router: Router, private saleUserPipe: SaleUserDetailsPipe, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.userListService.getUserDetails().subscribe(res => {      
      if (res.json().status == true) {
        this.userDetailsDatas = this.saleUserPipe.transform(res.json().result);
        this.spinner.hide();
      } else {
        this.userDetailsDatas = [];
      }
    });
  }

  redirectToAddSale() {
    this.router.navigate(['dashboard']);
  }

  editUser(val, i) {
    sessionStorage.setItem('selectedUserEdit', JSON.stringify(val));
    this.router.navigate(['dashboard']);
  }

  mouseEnterOnPrint(rowData, index) {
    this.http.get(environment.host + 'branches/' + rowData.branchid).subscribe(res => {
      this.branchAddress = res.json().result[0].branch_address
      this.branchArea = res.json().result[0].branch_area
      this.branchLocation = res.json().result[0].branch_location
      this.branchContact = res.json().result[0].branch_contact_number
    });

    this.http.get(environment.host + 'users/' + rowData.services).subscribe(res => {
      this.servicesData = res.json().result;
      this.vehicleSize = rowData.vehicle_size
    });

    this.userAddress = rowData.address;
    this.invoiceNo = rowData.invoice_num;
    this.invoiceTotal = rowData.invoice_total;
    if (this.invoiceTotal) {
      this.serviceTax = 0;
      this.totalWithTax = 0;
      this.serviceTax = this.serviceTax + this.invoiceTotal * (18 / 100)
      this.serviceTax = Math.floor(this.serviceTax)
      this.totalWithTax = this.invoiceTotal * 1 + this.serviceTax * 1;
    }
    this.invoiceDate = rowData.ceraeddate
    this.vehicleNo = rowData.vehicle_no
    console.log(rowData);
    console.log(rowData.invoice_total);
    if(rowData.discount_per == 0.05){
      this.percentageVal = "5%";
      rowData.discount = (rowData.invoice_total * 0.05);
    } else if(rowData.discount_per == 0.1){
      this.percentageVal = "10%";
      rowData.discount = (rowData.invoice_total * 0.1);
    } else if(rowData.discount_per == 0.18){
      this.percentageVal = "18%";
      rowData.discount = (rowData.invoice_total * 0.18);
    } 
    console.log(rowData.discount);
  }

  printInvoice(printlist, val, i) {
    val.index = i;
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
