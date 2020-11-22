import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../models/address';
import { Customer } from '../models/customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-view-all-customers',
  templateUrl: './view-all-customers.component.html',
  styleUrls: ['./view-all-customers.component.css']
})
export class ViewAllCustomersComponent implements OnInit {
  
  customers: Customer[]; //array of customers. we want to use this later to store the response in the data
  private _listFilter: string;
  filteredCustomer: Customer[] = [];

  constructor(private customerService: CustomerService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.filteredCustomer = this.customers;
   }

  get listFilter(): string { 
    return this._listFilter;
  }

  set listFilter(value: string){
    this._listFilter = value ;
    if(this._listFilter == ''){
      this.getAllTheCustomers();
    }
    this.customers = this.listFilter ? this.performFilter(this.listFilter): this.customers; 
  }

  performFilter(filterBy: string){
    filterBy = filterBy.toLocaleLowerCase();
    return this.customers.filter((customer: Customer) =>
        customer.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  ngOnInit(): void {
  this.getAllTheCustomers();
  }

  getAllTheCustomers(){
    this.customerService.getAllCustomers().subscribe(
      response => {
        console.log(response.data);
        this.customers = response.data }    
    )
  }

  goToCreateNewCustomer(){
    this.router.navigate([`/customers/new`])
  }
}