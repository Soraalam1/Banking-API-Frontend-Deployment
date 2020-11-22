import { Component, OnInit } from '@angular/core';
import { BillService } from '../service/bill.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Bill } from '../models/bill';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css']
})
export class ViewBillComponent implements OnInit {

  bill = new Bill;
  bills: Bill[];

  constructor(private billService: BillService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.setBillInfo();
    this.refreshBillComponent();
  }

  setBillInfo(){
    const billId = this.activatedRoute.snapshot.params[`billId`];
    this.billService.getBillById(billId).subscribe(
      response => {
        this.bill = response.data;
      }
    );
  }
  refreshBillComponent(){
    this.billService.getAllBills().subscribe(
      response => {
        this.bills = response.data;
      },
      error => console.log(error)
    );
  }
  cancelBillButton(){
    const billId = this.activatedRoute.snapshot.params[`billId`];
    this.billService.cancelBill(billId).subscribe(
      data => {
        this.bill = data;
      }
    );
    this.refreshBillComponent();
    this.router.navigate(['accounts/' + this.bill.accountId + '/bills']);
  
  }

  goToEditBill(){
    const billId = this.activatedRoute.snapshot.params[`billId`];
    this.router.navigate([`bills/`, billId, `edit-bill`])
  }

  goToAllBills(){
    this.router.navigate([`bills`]);
  }

}
