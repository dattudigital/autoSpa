import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  constructor(private http: Http) { }

  public getBranchDetails() {
    return this.http.get(environment.host + 'branches')
  }

  public saveBranchDetails(data: any) {
    return this.http.post(environment.host + 'branches', data)
  }

}
