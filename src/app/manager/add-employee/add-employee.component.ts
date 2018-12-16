import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ExcelServiceService } from '../../services/excel-service.service';
declare var jsPDF: any;
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
  deleteData: any = [];
  temp1: any;

  addEnableorDisable = 'visible';
  updateEnableorDisable = 'visible'

  constructor(private formBuilder: FormBuilder, private router: Router, private spinner: NgxSpinnerService, private service: ManagerService, private excelService: ExcelServiceService) { }

  ngOnInit() {
    this.spinner.show();
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
      } else {
        this.empData = [];
      }
    });
    this.service.getEmployeeDetails().subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.employees = res.json().result;
      } else {
        this.employees = [];
      }
    });
    this.service.getBranchDetails().subscribe(res => {
      if (res.json().status == true) {
        this.branches = res.json().result;
      } else {
        this.branches = [];
      }
    });
  }
  backToManager() {
    this.router.navigate(['manager']);
  }
  removeFields() {
    this.updateEnableorDisable = 'hidden';
    this.addEnableorDisable = 'visible';
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

  pdfDownload() {
    var columns = [
      { title: "First Name", dataKey: "employee_firstname" },
      { title: "Last Name", dataKey: "employee_lastname" },
      { title: "Branch", dataKey: "branch_name" },
      { title: "Address", dataKey: "employee_address" },
      { title: "Email Id", dataKey: "email_id" },
      { title: "Phone", dataKey: "phone" }
    ];
    var rows = this.employees;
    var doc = new jsPDF('');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        id: { fillColor: [255, 0, 0] }
      },
      margin: { top: 50 },
      addPageContent: function () {
        doc.text("Totalsale", 30, 30);
      }
    });
    doc.save('Employee.pdf');
  }

  xlDownload() {
    this.excelService.exportAsExcelFile(this.employees, 'Employee');
  }

  addEmployee() {
    console.log("check")
    console.log(this.employee.branch.branch_name)
    // this.employees.push( {"employee_id": 2,
    //   "emp_type_id": 1,
    //   "employee_firstname": "dathu",
    //   "employee_lastname": "dathu",
    //   "employee_branch_id":1,
    //   "employee_address": "Hyderabad",
    //   "email_id": "car@gmail.com",
    //   "phone": "9876543210",
    //   "rec_status": "1",
    //   "branch_name": "ammerpet"});
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    var data = {
      employee_firstname: this.employee.firstName,
      employee_lastname: this.employee.lastName,
      employee_branch_id: this.employee.branch.branch_id,
      employee_address: this.employee.address,
      employee_pincode: this.employee.pincode,
      email_id: this.employee.emailId,
      emp_type_id: this.employee.employeeType,
      phone: this.employee.phoneNumber,
      password: this.employee.password,
      rec_status: 1
    }
    console.log(data)

    this.service.addNewEmployee(data).subscribe(res => {
      let emp: object;
      if (res.json().status == true) {
        emp = res.json().result;
        emp["branch_name"] = this.employee.branch.branch_name;
        this.employees.push(emp);
        this.employees = this.employees.slice();
        $('#addEmployee').modal('hide');
        console.log(this.employees);
      }
    });
  }
  editEmployee(data, index) {
    this.addEnableorDisable = 'hidden';
    this.updateEnableorDisable = 'visible'
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
  updateEmployeeDetails() {
    var data = {
      employee_id: this.employee.employeeId,
      employee_firstname: this.employee.firstName,
      employee_lastname: this.employee.lastName,
      employee_branch_id: this.employee.branch,
      employee_address: this.employee.address,
      employee_pincode: this.employee.pincode,
      email_id: this.employee.emailId,
      phone: this.employee.phoneNumber,
      emp_type_id: this.employee.employeeType,
      rec_status: this.employee.status
    }
    this.service.addNewEmployee(data).subscribe(res => {
      this.employees[this.temp].employee_firstname = data.employee_firstname;
      this.employees[this.temp].employee_lastname = data.employee_lastname;
      this.employees[this.temp].employee_branch_id = data.employee_branch_id;
      this.employees[this.temp].employee_address = data.employee_address;
      this.employees[this.temp].employee_pincode = data.employee_pincode;
      this.employees[this.temp].email_id = data.email_id;
      this.employees[this.temp].phone = data.phone;
      this.employees[this.temp].emp_type_id = data.emp_type_id
      this.employees[this.temp].rec_status = data.rec_status;
      this.temp = " ";
    });
    $('#addEmployee').modal('hide')
  }

  deleteEmployee(val, index) {
    this.temp1 = index;
    this.deleteData = val;
    val.index = index;
    this.employee.employeeId = this.deleteData[index].employee_id;
  }

  yesEmployeeDelete() {
    this.employees.splice(this.temp1, 1);
    this.employees = this.employees.slice();
    var data = {
      employee_id: this.employee.employeeId,
      rec_status: "0"
    }
    this.service.addNewEmployee(data).subscribe(res => {
    })
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


