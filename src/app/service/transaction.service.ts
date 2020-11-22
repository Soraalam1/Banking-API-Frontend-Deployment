import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  fetchAllTransactions(): Observable<any>{
      return this.http.get<any>(`http://wutang-backend.herokuapp.com/transactions`);
  }

  createATransaction(transaction: Transaction, accountId: number): Observable<any>{
    return this.http.post<any>(`http://wutang-backend.herokuapp.com/transactions/${accountId}`, transaction);
  }

  cancelATransaction(transactionId: number){
    return this.http.delete<any>(`http://wutang-backend.herokuapp.com/transactions/${transactionId}`);
  }

  fetchATransactionById(transactionId:number): Observable<any>{
    return this.http.get<any>(`http://wutang-backend.herokuapp.com/transactions/${transactionId}`);
  }

  fetchAllTransactionsByAccountId(transactionId:number): Observable<any> {
    return this.http.get<any>(`http://wutang-backend.herokuapp.com/transactions/accounts/${transactionId}`);
  }

  getAllDeposits(): Observable<any> {
    return this.http.get<any>(`http://wutang-backend.herokuapp.com/transactions/deposits`);
  };

  getAllDepositsByAccountId(accountId:number): Observable<any>{
    return this.http.get<any>(`http://wutang-backend.herokuapp.com/transactions/accounts/${accountId}/deposits`);
  };

  getAllWithdrawals(): Observable<any> {
    return this.http.get<any>(`http://wutang-backend.herokuapp.com/transactions/withdrawals`);
  };

  getAllWithdrawalsByAccountId(accountId: number): Observable<any>{
    return this.http.get<any>(`http://wutang-backend.herokuapp.com/transactions/accounts/${accountId}/withdrawals`);
  };

  getAllP2ps():Observable<any>{
    return this.http.get<any>(`http://wutang-backend.herokuapp.com/transactions/transfers`);
  };
  createP2pTransaction(transaction: Transaction,payeeId: Number,payerId:Number){
    return this.http.post(`http://wutang-backend.herokuapp.com/transactions/accounts/${payerId}/transfersto/${payeeId}`,transaction);
  };

}

