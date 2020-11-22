import { Identifiers } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from '../models/account';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  account: Account; //account is the datatype of Account. It is an object

  id: number = this.activatedRoute.snapshot.params[`id`]; //this grabs the specific id from the URL

  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAccount(); //We want this to excecute ASAP
  }

  getAccount(){
    this.accountService.getAccountById(this.id).subscribe( //need to subscribe for the response to execute
      response =>
      this.account = response.data // storing the data we received into the account field for this class
    )
  }

  editAccount() {
    const id = this.activatedRoute.snapshot.params[`id`]; //grabbing the specific id from URL
    this.account.balance = 0;
    this.account.rewards = 0;
    this.accountService.updateAccount(id, this.account).subscribe(
      () => {
        this.router.navigate(['accounts/' + id]); //navigating to a new URL
        console.log("Edited")
      }
    );
  }
}
