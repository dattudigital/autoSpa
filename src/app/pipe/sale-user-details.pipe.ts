import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'saleUserDetails'
})
export class SaleUserDetailsPipe implements PipeTransform {

  transform(value: any): any {
    console.log(value);
    return null;
  }

}
