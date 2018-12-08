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
}
