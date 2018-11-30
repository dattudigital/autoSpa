import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 
  constructor(private router:Router) { }

  ngOnInit() {
      
  
  }
  newSaleClick(){
    this.router.navigate(['dashboard']);
  }

  logOutClick(){
    console.log(sessionStorage);
    window.sessionStorage.removeItem('userSession');
    window.sessionStorage.removeItem('secondaryLoginData');
    window.sessionStorage.removeItem('secondaryLoginData1');
    window.sessionStorage.removeItem('secondaryLoginData2');
    window.sessionStorage.removeItem('secondaryLoginData3');
    window.sessionStorage.clear
   this.router.navigate(['login'])

  }

}
