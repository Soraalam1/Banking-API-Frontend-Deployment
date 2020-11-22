import { Component, OnInit } from '@angular/core';
import {Customer} from '../models/customer';
import {CustomerService} from '../service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.refreshCustomerList();
  }

  refreshCustomerList(){
    this.customerService.getAllCustomers().subscribe(
      data => {
        this.customers = data.data;
        console.log(data);
        console.log(data.data);
      }
    )
  }
}
