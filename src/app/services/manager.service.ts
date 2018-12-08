import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: Http) { }

  public getEmployeeTypes() {
    return this.http.get(environment.host + 'emp-types')
  }

  public addNewEmployee(data: any) {
    return this.http.post(environment.host + 'employees', data)
  }
  public getEmployeeDetails() {
    return this.http.get(environment.host + 'employees')
  }
  public getBranchDetails() {
    return this.http.get(environment.host + 'branches')
  }
  public getSubCategory() {
    return this.http.get(environment.host + 'sub-categorys')
  }
  public getServiceDetails() {
    return this.http.get(environment.host + 'services')
  }

  public saveServices(data: any) {
    return this.http.post(environment.host + 'services', data)
  }

}
