import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import {Company} from '../model/company.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-companys',
  templateUrl: './list-companys.component.html',
  styleUrls: ['./list-companys.component.css']
})
export class ListCompanysComponent implements OnInit {

  constructor(private companyService: CompanyService,
    private router: Router,
    private activedRoute: ActivatedRoute) {}
    
  ngOnInit(): void {
    this.getCompanys();
    this.activedRoute.params.subscribe(paramsPage =>{
      this.page = paramsPage.page ? paramsPage.page : 0
     
    })
  }

  companys : Company[];
  page =0;
  pageSize: number;
  arrayOne(n: number): any[] {
    return Array(n);
  }



  getCompanys(): void{
  
    this.companyService.getAllCompanyPagination(this.page)
    .subscribe(
      respose => {     
        this.companys = respose.data;
        this.pageSize = Math.floor((respose.total-1)/respose.limit+1);
      },
      error => {
        console.log(error);
      }
    );
  }

}
