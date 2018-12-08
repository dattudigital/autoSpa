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
import { MultiSelectModule } from 'primeng/multiselect';
import { VehicleServicesPipe } from './pipe/vehicle-services.pipe';
import { ListSalesComponent } from './dashboard/list-sales/list-sales.component';
<<<<<<< HEAD
import { ManagerComponent } from './manager/manager.component';
import { AddEmployeeComponent } from './manager/add-employee/add-employee.component';
=======
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SetupComponent } from './setup/setup.component';
import { NgxSpinnerModule } from 'ngx-spinner';
>>>>>>> 696f23dc7a4bbf9e42009fd0f821095cf4e6bb5b

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'list-sales', component: ListSalesComponent, canActivate: [AuthGuard] },
<<<<<<< HEAD
  { path: 'manager', component: ManagerComponent, canActivate: [AuthGuard] },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] }
=======
  { path: 'setup', component: SetupComponent, canActivate: [AuthGuard] }
>>>>>>> 696f23dc7a4bbf9e42009fd0f821095cf4e6bb5b
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ListSalesComponent,
<<<<<<< HEAD
    ManagerComponent,
    AddEmployeeComponent
=======
    SetupComponent    
>>>>>>> 696f23dc7a4bbf9e42009fd0f821095cf4e6bb5b
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
    TypeaheadModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [AuthGuard, VehicleServicesPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
