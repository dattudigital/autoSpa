import { Component, OnInit } from '@angular/core';
import { VehicleDetailsService } from '../../services/vehicle-details.service';
import { SaleUserDetailsPipe } from '../../pipe/sale-user-details.pipe';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jsPDF: any;
import { ExcelServiceService } from '../../services/excel-service.service';

@Component({
  selector: 'app-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.css']
})

export class ViewSalesComponent implements OnInit {
  userDetailsData: any = [];

  constructor(private userListService: VehicleDetailsService, private excelservice: ExcelServiceService, private saleUserPipe: SaleUserDetailsPipe, private spinner: NgxSpinnerService, ) { }

  ngOnInit() {
    this.spinner.show();
    this.userListService.getUserDetails().subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.userDetailsData = this.saleUserPipe.transform(res.json().result);
      } else {
        this.userDetailsData = [];
      }
    });
  }

  pdfDownload() {
    var columns = [
      { title: "First Name", dataKey: "firstname" },
      { title: "Email", dataKey: "email_id" },
      { title: "Address", dataKey: "address" },
      { title: "Source Customer", dataKey: "source_name" },
      { title: "ServiceType", dataKey: "service_name" },
      { title: "BusinessType", dataKey: "business_name" }
    ];
    var rows = this.userDetailsData;
    var doc = new jsPDF('');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        id: { fillColor: [255, 0, 0] }
      },
      margin: { top: 50 },
      addPageContent: function () {
        doc.text("Viewsale", 30, 30);
      }
    });
    doc.save('Viewsale.pdf');
  }

  xlDownload() {
    this.excelservice.exportAsExcelFile(this.userDetailsData, 'ViewSaleList');
  }

}
