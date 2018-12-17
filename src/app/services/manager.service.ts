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

  public addOrUpdateEmployee(data: any) {
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

  public saveSubCategory(data: any) {
    return this.http.post(environment.host + 'sub-categorys', data)
  }
  
  public getServiceDetails() {
    return this.http.get(environment.host + 'services')
  }

  public saveServices(data: any) {
    return this.http.post(environment.host + 'services', data)
  }

  public getCategoryDetails() {
    return this.http.get(environment.host + 'categorys')
  }

  public saveCategoryDetails(data: any) {
    return this.http.post(environment.host + 'categorys', data)
  }

  public getPackages() {
    return this.http.get(environment.host + 'packages')
  }

  public savePackages(data: any) {
    return this.http.post(environment.host + 'packages', data)
  }

}
