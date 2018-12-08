import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
declare var $: any;
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
    'employeeId': '',
    'firstName': '',
    'lastName': '',
    'emailId': '',
    'password': '',
    'employeeType': '',
    'branch': '',
    'phoneNumber': '',
    'address': '',
    'pincode': '',
    'status': ''
  }
  cols: any[];
  employees: any[];
  branches: any[];
  editData: any = [];
  temp: any;
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
    this.cols = [
      { field: 'employee_firstname', header: 'First Name' },
      { field: 'employee_lastname', header: 'Last Name' },
      { field: 'branch_name', header: 'Branch' },
      { field: 'employee_address', header: 'Address' },
      { field: 'email_id', header: 'Email' },
      { field: 'phone', header: 'Phone' },
    ];
    this.service.getEmployeeTypes().subscribe(res => {
      if (res.json().status == true) {
        this.empData = res.json().result;
      }
    });
    this.service.getEmployeeDetails().subscribe(res => {
      if (res.json().status == true) {
        this.employees = res.json().result;
      }
    });
    this.service.getBranchDetails().subscribe(res => {
      if (res.json().status == true) {
        this.branches = res.json().result;
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
    var data = {
      employee_firstname: this.employee.firstName,
      employee_lastname: this.employee.lastName,
      employee_branch_id: this.employee.branch,
      employee_address: this.employee.address,
      employee_pincode: this.employee.pincode,
      email_id: this.employee.emailId,
      emp_type_id: this.employee.employeeType,
      phone: this.employee.phoneNumber,
      password: this.employee.password,
      rec_status: 1
    }
    this.service.addNewEmployee(data).subscribe(res => {
      console.log(res.json());
      this.employees.push(res.json().result);
      console.log(this.employees);
      $('#addEmployee').modal('hide');
    })
  }
  editEmployee(data, index) {
    this.editData = data;
    data.index = index;
    this.temp = index;
    this.employee.employeeId = this.editData[index].employee_id,
      this.employee.firstName = this.editData[index].employee_firstname,
      this.employee.lastName = this.editData[index].employee_lastname,
      this.employee.branch = this.editData[index].employee_branch_id,
      this.employee.address = this.editData[index].employee_address,
      this.employee.pincode = this.editData[index].employee_pincode,
      this.employee.emailId = this.editData[index].email_id,
      this.employee.phoneNumber = this.editData[index].phone,
      this.employee.employeeType = this.editData[index].emp_type_id,
      this.employee.password = this.editData[index].password
    this.employee.status = this.editData[index].rec_status
  }
  omit_special_char(event) {
    var k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 0 || k == 32);
  }

  //This Method  allow Numbers
  only_allow_number(event) {
    var n;
    n = event.charCode
    return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
  }

  //this method allow both numbers and alphabets
  allow_numbers_alphabets(event) {
    var a;
    a = event.charCode
    return ((a > 64 && a < 91) || (a > 96 && a < 123) || a == 8 || a == 0 || (a >= 48 && a <= 57));
  }
}


