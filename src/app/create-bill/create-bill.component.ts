import { Component, OnInit } from '@angular/core';
import { BillService } from '../service/bill.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from '../models/bill';
import { Route } from '@angular/compiler/src/core';



@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {
  minDate: Date; //initializing the minDate to a Date
  maxDate: Date;
  bill = new Bill; 
  today = new Date; //LITERALLY getting todays date
  selection: Date;  //this is making a new date. They select the specific date they want

  constructor(private billService: BillService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), 30); //this restricts the customer from choosing any day after the 28th
    this.minDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1); //Starts the calendar from day 1 (availability)
 }

  ngOnInit(): void {
  }

  onSubmit(){
    this.bill.recurringDate = this.selection.getDate(); //this makes it so that it can only give the date chosen
    const id = this.activatedRoute.snapshot.params['accountId']; //snapshotting the accountID so it can show up in the URL
    console.log(this.bill); //this is printing out the bill info
    this.billService.createBill(id, this.bill).subscribe( //Creating the bill that connects to the backend. Frontend is talking to backend so it may execute the method
      data => { 
        this.router.navigate(['accounts/' + id + '/bills']); //navigating to a new URL
        console.log('bill created!'); //making sure the bill is created
       }
    );
  }

}
