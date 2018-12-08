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
  public getVehicleTypes() {
    return this.http.get(environment.host + 'vehicle-types')
  }
  public getVehicleMake() {
    return this.http.get(environment.host + 'vehicle-makes')
  }
  public getVehicleServices() {
    return this.http.get(environment.host + 'services')
  }
  public userVehicleService(data: any) {
    return this.http.post(environment.host + 'users/complete-sale', data)
  }
  public getUserDetails() {
    return this.http.get(environment.host + 'users')
  }
  public searchMobileOrEmailid(data:any) {
    return this.http.get(environment.host + 'search/user/mobile-or-email/'+data)
  }
}
