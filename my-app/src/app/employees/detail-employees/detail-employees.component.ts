import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../service/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-employees',
  templateUrl: './detail-employees.component.html',
  styleUrls: ['./detail-employees.component.css']
})
export class DetailEmployeesComponent implements OnInit {
  employee : Employee;
  id : number;
  detailEmployeeForm : FormGroup;
  constructor(private employeeService: EmployeeService,
              private fb: FormBuilder,
              private router: Router,
              private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //get param url
    this.activedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });

    //set data to form detail
    this.detailEmployeeForm =this.fb.group({
      id:['', Validators.required],
      name:['',Validators.required],
      city: ['',Validators.required],
      gender:['',Validators.required],
      department:['',Validators.required],
    });

    //get employee by id
     this.getEmployeeById(this.id)
  }

  public getEmployeeById(id : number){
    this.employeeService.getEmployeeById(this.id).subscribe((data: Employee) =>{
      this.employee = data;
    })
  }

}
