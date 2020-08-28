import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../model/employee.model';


@Component({
  selector: 'app-update-employees',
  templateUrl: './update-employees.component.html',
  styleUrls: ['./update-employees.component.css']
})
export class UpdateEmployeesComponent implements OnInit {
  gender : any = ['Male', 'FeMale', 'Other'];
  department : any = ['DEV 1', 'DEV 2', 'DEV 3', 'DEV 4'];
  employee: Employee;
  id: number;
  isDone :boolean
  UpdateEmployeeForm: FormGroup

  constructor(private employeeService: EmployeeService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute:ActivatedRoute) {   
             }

  ngOnInit(): void {
    //get param url
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;  
    });

    //set data to form update
    this.UpdateEmployeeForm = this.fb.group({
      id:['', Validators.required],
      name:['',Validators.required],
      city: ['',Validators.required],
      gender:['',Validators.required],
      department:['',Validators.required],
    });
    //get employye by id
    this.getByID(this.id)
  }
  submitForm(){
    this.employeeService.updateEmployee(this.employee.id, this.UpdateEmployeeForm.value).subscribe(res => {
      console.log("update success")
      this.router.navigateByUrl('/employees/list')
    });
  }

 
  public getByID(id: number){
    this.employeeService.getEmployeeById(this.id).subscribe((data: Employee) =>{
    this.employee = data;
      // console.log(data)
      

    }) 
  }

  

}
