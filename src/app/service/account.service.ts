import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {}

  addAccount(customerId: number, account: Account): Observable<any>{
    return this.http.post<any>(`http://wutang-backend.herokuapp.com/customers/${customerId}/accounts`, account);
  }

  updateAccount(accountId: number, account:Account): Observable<any>{
    return this.http.put<any>(`http://wutang-backend.herokuapp.com/accounts/${accountId}`, account);
  }

  deleteAccount(accountId: number){
    return this.http.delete(`http://wutang-backend.herokuapp.com/accounts/${accountId}`);
  }

  getAccountById(accountId: number): Observable<any>{
    return this.http.get<any>(`http://wutang-backend.herokuapp.com/accounts/${accountId}`);
  }

  getAllAccounts(): Observable<any>{
    return this.http.get<any>(`http://wutang-backend.herokuapp.com/accounts`);
  }

  getAllCustomerAccountsByCustomerId(customerId: number): Observable<any>{
    return this.http.get<any>(`http://wutang-backend.herokuapp.com/accounts/customer/${customerId}`);
  }
}
