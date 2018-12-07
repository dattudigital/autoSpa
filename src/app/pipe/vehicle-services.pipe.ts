import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehicleServices'
})
export class VehicleServicesPipe implements PipeTransform {

  transform(value: any): any {
    var data = [];
    value.forEach(element => {
      data.push({
        label: element.service_name,
        value: element
      })    
    });
    console.log(data)
    return data;
  }

}
