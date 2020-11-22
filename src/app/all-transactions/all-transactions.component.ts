import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent implements OnInit {

  transactions: Transaction[];

  constructor(private transactionService: TransactionService) {
    this.filteredTransactions= this.transactions;
    this.listFilter;
   }



  filteredTransactions: Transaction[];

  private _listFilter: string;

  
  get listFilter(): string {
    return this._listFilter;
  }


  set listFilter(value: string){
    this._listFilter = value ;
    if(this._listFilter === ''){
      this.refreshAccountList();
    }
    this.transactions = this.listFilter ? this.performFilter(this.listFilter): this.transactions;
  }


  performFilter(filterBy: string){
    filterBy = filterBy.toLocaleLowerCase();
    return this.transactions.filter((transaction:Transaction) => 
        transaction.transactionDate.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }



  ngOnInit(): void {
    this.refreshAccountList();
  };

  refreshAccountList(){
    this.transactionService.fetchAllTransactions().subscribe(
      data => {
        this.transactions = data.data;
        //made a property called accounts of type Account array
        //the data he gets from fetching all the accounts is being stored inside accounts
        console.log(data)
      }
    )
  }

}
