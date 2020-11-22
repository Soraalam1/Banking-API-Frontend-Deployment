import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllBills(): Observable<any>{
    return this.http.get(`http://wutang-backend.herokuapp.com/bills`);
  }
  getBillById(billId: number): Observable<any> {
    return this.http.get(`http://wutang-backend.herokuapp.com/bills/${billId}`);
  }
  createBill(accountId: number, bill: Bill): Observable<any>{
    return this.http.post(`http://wutang-backend.herokuapp.com/accounts/${accountId}/bills`, bill);
  }
  getAllBillsByCustomer(customerId: number): Observable<any>{
    return this.http.get(`http://wutang-backend.herokuapp.com/customers/${customerId}/bills`);
  }
  getAllBillsByAccount(accountId: number): Observable<any>{
    return this.http.get(`http://wutang-backend.herokuapp.com/accounts/${accountId}/bills`);
  }
  updateBill(billId: number, bill: Bill): Observable<any>{
    return this.http.put(`http://wutang-backend.herokuapp.com/bills/${billId}`, bill);
  }
  cancelBill(billId: number): Observable<any>{
    return this.http.delete(`http://wutang-backend.herokuapp.com/bills/cancel/${billId}`);

  }
}

//http client: allows to connect with server and access back end to upload/dowloand dat.
//The ability to request typed response objects.
