import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../service/transaction.service';
import { Transaction } from '../models/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[];

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
  }

  refreshTransactionList(){
    this.transactionService.fetchAllTransactions().subscribe(
      data => {
        this.transactions = data.data;
        console.log(data)
        console.log(data.data)
      }
    )
  }
}

