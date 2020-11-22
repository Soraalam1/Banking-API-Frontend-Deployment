import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {
  transaction: Transaction;
  
  id: number;
  constructor(private transactionService: TransactionService, private router: Router, private activatedRouter: ActivatedRoute) { }


  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params['transactionId'];
    this.getTransaction(this.id);
  }


  getTransaction(id){
    this.transactionService.fetchATransactionById(id).subscribe(
      data => {
        this.transaction = data.data;
        console.log("why")
      },
      error => console.log(error)
    );
  }

  cancelTransaction(){
    this.transactionService.cancelATransaction(this.id).subscribe(
      data => {
        this.goBackToAccount();
      }
    )
  }

  goBackToAccount(){
    if (this.transaction.payerAccountId){
      this.router.navigate([`accounts/`+this.transaction.payerAccountId])
    }
    if (this.transaction.payeeAccountId){
      this.router.navigate([`accounts/`+this.transaction.payeeAccountId])

    }

  }

  goToAllTransactions(){
    this.router.navigate([`transactions`]);

  }
}
