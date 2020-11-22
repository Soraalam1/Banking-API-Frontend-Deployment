import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = 'http://wutang-backend.herokuapp.com';

  constructor(private http: HttpClient) { } //creating a variable that will be used to make requests to the backend

  getCustomerById(id: number): Observable<any>{ //Observable relates back to http on line 18
    return this.http.get<any>(this.url+`/customers/${id}`);
  }

  addCustomer(customer: Customer): Observable<any> {
    return this.http.post<any>(this.url+ `/customers`,customer);
  }

  getAllCustomers(): Observable<any>{ //returns an array
    return this.http.get<any>(this.url+ `/customers`); //getting the endpoint /customers
  }

  updateCustomerById(id: number, customer: Customer): Observable<any>{
    return this.http.put<any>(this.url+`/customers/${id}`, customer)
  }

  getCustomerAccountById(accountId: number): Observable<any>{
    return this.http.get<any>(this.url+`/accounts/${accountId}/customer`)
  }
}
