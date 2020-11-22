import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validator, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';
import { CustomerService } from '../service/customer.service';
import { Address } from '../models/address'

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router, private customerService: CustomerService) {
  }

  customer: Customer = new Customer();

  addressArray: Address[] = [];

    customerForm = new FormGroup({
      firstName: new FormControl('' , Validators.required),
      lastName:  new FormControl('' , Validators.required),
      address: new FormGroup({
        streetNumber: new FormControl('', Validators.required),
        streetName: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zip: new FormControl('', Validators.required)
      }),
      address1: new FormGroup({
        streetNumber: new FormControl(''),
        streetName: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zip: new FormControl('')
      })
    });
  
  ngOnInit(): void {


  }

  get addresses() {
    return this.customerForm.get('addresses') as FormArray;
  }


addAlias() {
  this.addresses.push(this.formBuilder.control(''));
}

onSubmit(){
  console.log(this.customerForm.value);
  this.customer = this.customerForm.value;
  this.addressArray.push(this.customerForm.value.address);
  if (this.customerForm.value.address1.streetName){
    this.addressArray.push(this.customerForm.value.address1);
  }
  this.customer.address =this.addressArray;
  this.customerService.addCustomer(this.customerForm.value).subscribe(
    data => {
      this.router.navigate([`customers`])
      console.warn("Customer Created!", this.customerForm.value);}
  )
}

}
