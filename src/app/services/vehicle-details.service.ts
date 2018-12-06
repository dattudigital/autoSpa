import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VehicleDetailsService {

  constructor(private http: Http) { }

  public getVehicleAge() {
    return this.http.get(environment.host + 'ages')
  }
  public getVehicleTypes(){
    return this.http.get(environment.host + 'vehicle-types')
  }
  public getVehicleMake(){
    return this.http.get(environment.host + 'vehicle-makes')
  }
}
