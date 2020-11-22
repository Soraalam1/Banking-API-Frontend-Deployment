import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from '../models/bill';
import { BillService } from '../service/bill.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.css']
})
export class EditBillComponent implements OnInit {
  minDate: Date; //initializing the minDate to a Date
  maxDate: Date;
  today = new Date;
  selection: Date;
  bill = new Bill;

  constructor(private billService: BillService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), 30); //this restricts the customer from choosing any day after the 28th
    this.minDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  }

  ngOnInit(): void {
    this.getBillInformation();
  }

  onSubmit(){
    this.bill.recurringDate = this.selection.getDate(); //this makes it so that it can only give the date chosen
    const id = this.activatedRoute.snapshot.params['billId'];
    console.log(this.bill); 
    this.billService.updateBill(id, this.bill).subscribe(
      response => {
        this.bill = response.data;
       }
    );
    this.router.navigate([`accounts/` + this.bill.accountId + `/bills`]);
  }

  getBillInformation(){
    const id = this.activatedRoute.snapshot.params['billId'];
    this.billService.getBillById(id).subscribe(
      response => {
        console.log(response.data)
        this.bill = response.data;
      }
    )
  }

}