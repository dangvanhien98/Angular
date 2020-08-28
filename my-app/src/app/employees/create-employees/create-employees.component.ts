import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnsubscriptionError } from 'rxjs';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {
  gender : any = ['Male', 'FeMale', 'Other'];
  department : any = ['DEV 1', 'DEV 2', 'DEV 3', 'DEV 4'];
  employeeForm: FormGroup;
  constructor(private employeeService: EmployeeService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id:[''],
      name:[''],
      city:[''],
      gender:[''],
      department:[''],
    })
  }

  submitForm(){
    this.employeeService.createEmployee(this.employeeForm.value).subscribe(res => {
      console.log('Employee created')
      this.router.navigateByUrl('/employees/list')

    })
  }

}
