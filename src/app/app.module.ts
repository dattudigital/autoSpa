import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '../common-session/session.check';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MultiSelectModule} from 'primeng/multiselect';
import { VehicleServicesPipe } from './pipe/vehicle-services.pipe';
import { ListSalesComponent } from './dashboard/list-sales/list-sales.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'list-sales', component: ListSalesComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ListSalesComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    TypeaheadModule.forRoot()
  ],
  providers: [AuthGuard,VehicleServicesPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
