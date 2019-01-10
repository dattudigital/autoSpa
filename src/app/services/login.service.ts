import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:Http) { }
  public loginData(data: any) {
    return this.http.post(environment.host + 'auth/login', data)
  }
}
