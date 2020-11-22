import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../models/account';
import { Customer } from '../models/customer';
import { CustomerService } from '../service/customer.service';
import { AccountService } from '../service/account.service';
import { Address } from '../models/address';


// @ts-ignore
@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customer = new Customer(); //new object

  accounts: Account[];


  address1: Address; //stores the customer's first address

  address2: Address;//stores the customer's second address (if they have one)

  filteredAccounts: Account[];


  private _listFilter: string;

  emptyArray: Address[];


  ngOnInit(): void {
    this.getCustomerDetails();
    this.getCustomerAccountDetails();
  }

  getAddressesInOrder(){
    if(this.customer.address[1].id < this.customer.address[0].id){
      this.address1 = this.customer.address[1];
      this.address2 = this.customer.address[0];
    }
  }

  constructor(private customerService: CustomerService, private accountService: AccountService, private router: Router, private activateRoute: ActivatedRoute) {
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string){
    this._listFilter = value ;
    if(this._listFilter == ''){
      this.getCustomerAccountDetails();
    }
    this.accounts = this.listFilter ? this.performFilter(this.listFilter): this.accounts;
  }

  performFilter(filterBy: string){
    filterBy = filterBy.toLocaleLowerCase();
    return this.accounts.filter((account:Account) =>
        account.nickname.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  delete(id: number){
    this.accountService.deleteAccount(id).subscribe(
      ()=> {
        this.getCustomerDetails();
        this.getCustomerAccountDetails();
      }
    );
  }

  getCustomerDetails(){
    const id = this.activateRoute.snapshot.params[`id`]; //active URL. grabs the id and stores it inside of the variable const id
    this.customerService.getCustomerById(id).subscribe( //executing the method
      response => {
        this.customer = response.data;
        console.log(response.data);
        console.log(response.data.address)
        this.getAddressesInOrder();
      }
      //taking the response data and storing inside customer
    );
  }

  getCustomerAccountDetails(){
    const id = this.activateRoute.snapshot.params[`id`];
    this.accountService.getAllCustomerAccountsByCustomerId(id).subscribe(
      response => {
        if(response.code === 404){
          this.accounts = [];
        }else{
        this.accounts = response.data }
      }
    );
  }

  goToEditCustomer(){
    const id = this.activateRoute.snapshot.params[`id`];
    this.router.navigate([`customers/${id}/editCustomer`]);
  }

  goToCreateAccount(){
    const id = this.activateRoute.snapshot.params[`id`];
    this.router.navigate([`customers/${id}/create-accounts`]);
  }

  goToAllCustomers(){
    this.router.navigate([`customers`]);
  }

  clickStopper(event) {
    event.stopPropagation();
    return;
}

}
