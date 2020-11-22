// @ts-ignore
import { Component, OnInit } from '@angular/core';
import {AccountService} from '../service/account.service';
import {Account} from '../models/account';
import { filter } from 'minimatch';

// @ts-ignore
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts: Account[];

  emptyArray: Account[];

  constructor(private accountService: AccountService) {
    this.filteredAccounts = this.accounts;
    this.listFilter;
   }

  filteredAccounts: Account[];

  private _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string){
    this._listFilter = value ;
    if(this._listFilter === ''){
      this.refreshAccountList();
    }
    this.accounts = this.listFilter ? this.performFilter(this.listFilter): this.accounts;
  }

  performFilter(filterBy: string){
    filterBy = filterBy.toLocaleLowerCase();
    return this.accounts.filter((account:Account) =>
        account.nickname.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.refreshAccountList();
  };

  refreshAccountList(){
    this.accountService.getAllAccounts().subscribe(
      data => {
        this.accounts = data.data;
        //made a property called accounts of type Account array
        //the data he gets from fetching all the accounts is being stored inside accounts
        console.log(data)
      }
    )
  }

  // delete(id: number){
  //   this.accountService.deleteAccount(id).subscribe(
  //     ()=> this.refreshAccountList()
  //   );
  // }
}
