import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../models/account';
import { Customer } from '../models/customer';
import { Transaction } from '../models/transaction';
import { AccountService } from '../service/account.service';
import { CustomerService } from '../service/customer.service';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.css']
})
export class AccountViewComponent implements OnInit {

  transactions: Transaction[] = [];
  account: Account;
  customer: Customer = new Customer();


  constructor(private transactionService: TransactionService,private accountService: AccountService, private activatedRoute: ActivatedRoute, private router: Router, private customerService: CustomerService) { }


  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params[`id`];
    this.getAccountId(id);
    this.getTransactionsByAccountId(id);
  };

  

  getTransactionsByAccountId(id: number){
    this.transactionService.fetchAllTransactionsByAccountId(id).subscribe(
      data =>{
        console.log("hey hey");
        for (const transaction of data.data) {
          this.transactions.push(transaction);
        }
      }
    )
  }
  getAccountId(id: number){
    this.accountService.getAccountById(id).subscribe(
      data => {
        this.account = data.data;
        this.getCustomer(this.account.customerId);
      }
    )
  }

  getCustomer(id:number){
    this.customerService.getCustomerById(id).subscribe(
      data => {
        this.customer = data.data;
      }
    )
  }

  goToEditAccount(id: number){ //parameters take in an id
    this.router.navigate(['accounts/editAccount/' + id]) //navigating to editAccount URL
  }


  goToCreateTransaction(id: number){
    this.router.navigate(['accounts/' + id + '/post']);

  };

  deleteAccount(CId, AId){
    console.log("Hello");
    console.log("World");
    this.accountService.deleteAccount(AId).subscribe(
      () => this.router.navigate(['customers/'+CId])
    );
    console.log("World");
    
  }

  gotoAccountBills(id:number){
    this.router.navigate(['accounts/'+id+'/bills'])
  }

  checkType(type){
    if(type === true){
      return true;
    }
  }

}
