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
import { ManagerComponent } from './manager/manager.component';
import { AddEmployeeComponent } from './manager/add-employee/add-employee.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SetupComponent } from './setup/setup.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BranchComponent } from './setup/branch/branch.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'list-sales', component: ListSalesComponent, canActivate: [AuthGuard] },
  { path: 'setup', component: SetupComponent, canActivate: [AuthGuard] },
  { path: 'branch', component: BranchComponent, canActivate: [AuthGuard] },
  { path: 'manager', component: ManagerComponent, canActivate: [AuthGuard] },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ListSalesComponent,
    SetupComponent,
    BranchComponent,    
    ManagerComponent,
    AddEmployeeComponent,
    SetupComponent    
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
