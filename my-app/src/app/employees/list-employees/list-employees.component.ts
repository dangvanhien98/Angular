import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import {Employee} from '../model/employee.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  currentIndex = -1;
  searchName = '';

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [3, 6, 9];

  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  //  this.getEmployees();
    this.retrieveEmployees();
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

  // public getEmployeeByName(name){
  //   this.employeeService.getEmployeeByName(name).subscribe((data: Employee[]) => {
  //     this.employees =data;
  //   })
  // }
  getRequestParams(searchName, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchName) {
      params[`searchName`] = searchName;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveEmployees(): void {
    const params = this.getRequestParams(this.searchName, this.page, this.pageSize);

    this.employeeService.getAllPagination(params)
      .subscribe(
        response => {
          //const { employees, totalItems } = response;
          this.employees = response;
          //this.count = totalItems;
          console.log(response);
          console.log(this.count);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieveEmployees();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveEmployees();
  }
}
