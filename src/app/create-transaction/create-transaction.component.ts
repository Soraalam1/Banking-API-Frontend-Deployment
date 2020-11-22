import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../service/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {
  

transaction = new Transaction();
id: Number;

  constructor(private transactionService: TransactionService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
   this.id = this.activatedRoute.snapshot.params[`accountId`];
  }


  submitNewTransaction(){
    const id = this.activatedRoute.snapshot.params[`accountId`];
    this.transactionService.createATransaction(this.transaction, id).subscribe(
      data => {
        console.log("anything")
        this.router.navigate(['accounts/' + id]);
      
      }
    )
  };

createTransaction(){
  if(this.transaction.type === 'P2P'){
    this.submitNewP2P();
  }else{
    this.submitNewTransaction();
  }
}

  submitNewP2P(){
    const id = this.activatedRoute.snapshot.params[`accountId`];
    this.transaction.payerAccountId = id;
    console.log(this.transaction)
    this.transactionService.createP2pTransaction(this.transaction,this.transaction.payeeAccountId,id).subscribe(
      data => {
        this.router.navigate(['accounts/' + id])
      }
    )
  };
}
