import{ Injectable} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CompanyService{
    API_URL = 'http://localhost:3000/owner';

    constructor(private httpClient: HttpClient){}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    //getall Company Pagination
    getAllCompanyPagination(params): Observable<any>{
        return this.httpClient.get(this.API_URL + `?page=${params}`);
    }

}