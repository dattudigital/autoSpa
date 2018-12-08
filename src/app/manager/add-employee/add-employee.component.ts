import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  empData: any = [];
  submitted = false;
  //for add new employee
  employee: any = {
    'firstName': '',
    'lastName': '',
    'emailId': '',
    'password': '',
    'employeeType': '',
    'branch': '',
    'phoneNumber': '',
    'address': '',
    'pincode': ''
  }

  constructor(private formBuilder: FormBuilder, private service: ManagerService) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      employeeFirstName: ['', Validators.required],
      employeeLastName: ['', Validators.required],
      employeeBranch: ['', Validators.required],
      employeeAddress: ['', Validators.required],
      employeePinCode: ['', Validators.required],
      empType: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
      Password: ['', Validators.required]
    });
    this.service.getEmployeeTypes().subscribe(res => {
      if (res.json().status == true) {
        this.empData = res.json().result;
      }
    });
  }

  removeFields() {
    this.submitted = false;
    this.employee.firstName = '';
    this.employee.lastName = '';
    this.employee.emailId = '';
    this.employee.password = '';
    this.employee.employeeType = '';
    this.employee.branch = '';
    this.employee.phoneNumber = '';
    this.employee.address = '';
    this.employee.pincode = '';
  }
  get f() { return this.employeeForm.controls; }

  addEmployee() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    console.log('success')
  }

}


