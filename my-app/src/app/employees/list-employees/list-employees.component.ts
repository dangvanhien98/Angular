import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import {Employee} from '../model/employee.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  
  }

  public getEmployees(){
    this.employeeService.getEmployees().subscribe((data: Employee[]) =>{
      this.employees = data;
    })
  }

  public deleteEmployee(id){
    var x = confirm("Are you sure?")
    if(x){      
      this.employeeService.deleteEmployee(id).subscribe();
      this.employees = this.employees.filter(i => i.id !== id);
    }
    return false;
  }
}
