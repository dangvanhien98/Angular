import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';
import { CreateEmployeesComponent } from './employees/create-employees/create-employees.component';
import{EmployeeService} from './employees/service/employee.service'
import{CompanyService} from './companys/service/company.service'

import {RouterModule, Routes} from '@angular/router';
import { UpdateEmployeesComponent } from './employees/update-employees/update-employees.component';
import { DetailEmployeesComponent } from './employees/detail-employees/detail-employees.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//search filter
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { ListCompanysComponent } from './companys/list-companys/list-companys.component';



//each router maps a url path to a component
//the 3rd route specifies the route to redirect to if the path
//..is empty. in our case we are redirecting to/ list

//pathmatch property value can be full or prefix. for vow we
//will set it to full as we want to do a full match

const appRoutes: Routes = [
  {path: 'employees/list', component: ListEmployeesComponent},
  {path: 'employees/create', component: CreateEmployeesComponent},
  {path: 'employees/update/:id', component: UpdateEmployeesComponent},
  {path: 'employees/detail/:id', component: DetailEmployeesComponent},
  {path: 'employees', redirectTo: 'employees/list', pathMatch: 'full'},

  {path: 'owner', component: ListCompanysComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeesComponent,
    UpdateEmployeesComponent,
    DetailEmployeesComponent,
    ListCompanysComponent,
  ],
  imports: [
    BrowserModule,   
   // AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [EmployeeService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
