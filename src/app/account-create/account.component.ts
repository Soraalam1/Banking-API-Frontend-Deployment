import { Component, OnInit} from '@angular/core';
import {AccountService} from '../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Account} from '../models/account';
import { Customer } from '../models/customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
account = new Account();
customer: Customer;
id: number = this.activatedRoute.snapshot.params[`id`];

  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer(){
    this.customerService.getCustomerById(this.id).subscribe(
      response =>
      this.customer = response.data //Storing a customer from the data
    )
  }

  submitNewAccount() {
    const id = this.activatedRoute.snapshot.params[`id`];
    this.account.balance = 0;
    this.account.rewards = 0;
    this.accountService.addAccount(id, this.account).subscribe(
      data => {
        this.router.navigate(['/customers/'+ id]);
        console.log("Made a new account")
      }
    );
  }
}
