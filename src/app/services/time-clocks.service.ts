import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class TimeClocksService {

  constructor(private http:Http) { }

  public saveInandOutTime(time: any) {
    return this.http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3006/time-clocks', time)
  }

  public loginEmployee(data:any){
    return this.http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3006/time-clocks/login', data)
  }
}
