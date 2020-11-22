import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../models/address';
import { Customer } from '../models/customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
    
customer: Customer;
addressArray: Address[] = [];
 customerId = this.activatedRoute.snapshot.params[`id`];
  constructor(private customerService: CustomerService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params[`id`];
    this.customerService.getCustomerById(id).subscribe(
      data => {
        this.customer = data.data;
      }
    );
  }

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

  editCustomerButton(){
    const id = this.activatedRoute.snapshot.params[`id`];
    // this.customer = this.customerForm.value;
    this.addressArray.push(this.customerForm.value.address);

    // if (this.customerForm.value.address1){
    //   this.addressArray.push(this.customerForm.value.address1);

    //   if (!this.customerForm.value.address1.streetName){
    //     this.addressArray.splice(1);
    //   }
    // };

    if(this.customer.address.length === 1){
      this.customer = {id: id, 
        firstName: this.customerForm.value.firstName, 
        lastName: this.customerForm.value.lastName, 
      address: [this.customerForm.value.address]}
      };

    if(this.customer.address.length === 2){
    this.customer = {id: id, 
      firstName: this.customerForm.value.firstName, 
      lastName: this.customerForm.value.lastName, 
    address: [this.customerForm.value.address, this.customerForm.value.address1]}
    };
    console.log(this.customer);
    
    this.customerService.updateCustomerById( this.customerId,this.customer).subscribe(
      data => {
         
        this.router.navigate(['customers/' + id]);
      })
  };

  removeAddress (){
    this.customer.address.pop();
   

  }


  addAddress(){
    const address2 = new Address();
    this.customer.address.push(address2);
  }
}
