//employee.service.ts
import{ Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty, EMPTY } from 'rxjs';
import { Employee } from '../model/employee.model';
import {  throwError } from 'rxjs';
import { catchError, isEmpty } from 'rxjs/operators'
import { isNull } from '@angular/compiler/src/output/output_ast';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService{
    API_URL = 'http://localhost:3000/employees';
    constructor(private httpClient: HttpClient){}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    getEmployees(){
        return this.httpClient.get(`${this.API_URL}`);
    }

    //get all pagination
    getAllPagination(params): Observable<any>{
        return this.httpClient.get(this.API_URL,{params});
    }

    //create employee
    createEmployee(employee: Employee): Observable<Employee>{
        if(employee.name == ''){
            alert('invalid data')
        }else
            return this.httpClient.post<Employee>(this.API_URL, JSON.stringify(employee),this.httpOptions)
            .pipe(
                catchError(e => throwError(e))
            );
    }

    //deleye employee by id
    deleteEmployee(id: number): Observable<{}>{      
        const url = `${this.API_URL}/${id}`;
        console.log(url)
        return this.httpClient.delete(url,this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        );
    }

    //update
    updateEmployee(id: number, data): Observable<Employee>{
        const url = `${this.API_URL}/${id}`;
        return this.httpClient.put<Employee>(url,JSON.stringify(data), this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        )
    }

    //get by id
    getEmployeeById(id: number): Observable<Employee>{
        const url = `${this.API_URL}/${id}`;
        return this.httpClient.get<Employee>(url);
    }

    //gey employee by name
    getEmployeeByName(name: String){
        const url = `${this.API_URL}/${name}`;
        return this.httpClient.get(url);
    } 

    errorHandler(error){
        let errorMessage = '';
        if(error.error instanceof ErrorEvent){
            //get client-side error
            errorMessage = error.error.message;            
        }else{
            //get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}