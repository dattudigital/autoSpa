import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'saleUserDetails'
})
export class SaleUserDetailsPipe implements PipeTransform {

  transform(value: any): any {
    console.log(value);
    value.forEach(element => {
      if (element.source_customer == 0) {
        element.source_name = "Walk-in";
      } else if (element.source_customer == 1) {
        element.source_name = "Referral";
      } else if (element.source_customer == 2) {
        element.source_name = "Family Friend";
      }

      if (element.service_type == 0) {
        element.service_name = "Door Step";
      } else if (element.service_type == 1) {
        element.service_name = "Store";
      }

      if (element.business_type == 0) {
        element.business_name = "B2B";
      } else if (element.business_type == 1) {
        element.business_name = "B2C";
      }

      if (element.vehicle_type == 0) {
        element.vehicl_name = "Car";
      } else if (element.vehicle_type == 1) {
        element.vehicl_name = "Bike";
      } else if (element.vehicle_type == 2) {
        element.vehicl_name = "Commercial";
      }

      if(element.cash == 1){
        element.cash="Cash"
      }else if(element.cheque == 1){
        element.cheque='Cheque'
      }else if(element.credit_card == 1){
        element.credit_card="Credit/Debit Card"
      }else if(element.account_transfer == 1){
        element.account_transfer ="Account Transfer"
      }else if(element.other == 1){
        element.other="mobileWallet"
      }else if(element.credit_sale == 1){
        element.credit_sale="Credit Sale"
      }
    });
    return value;
  }
}
