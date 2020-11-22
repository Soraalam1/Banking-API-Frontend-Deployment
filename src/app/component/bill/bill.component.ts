import { Component, OnInit } from '@angular/core';
import { BillService } from '../../service/bill.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Bill } from '../../models/bill';
import { DataResponse } from 'src/app/models/data-response';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  bills: Bill[];
  filteredBills: Bill[];
  private _listFilter: string;

  constructor(private billService: BillService) { 
    this.filteredBills = this.bills;
    this._listFilter
  }

  ngOnInit(): void {
    this.showAllBills();
  }

  showAllBills(){
    this.billService.getAllBills().subscribe(
      response => {
        this.bills = response.data;
      },
      error => console.log(error)
    );
  }

  refreshBillList(){
    this.billService.getAllBills().subscribe(
      data => {
        this.bills = data.data;
        console.log(data)
      }
    );
  }

  performFilter(filterBy: string){

    filterBy = filterBy.toLocaleLowerCase();

    return this.bills.filter((bill: Bill) =>
    bill.nickname.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string){
    this._listFilter = value;
    if(this._listFilter === ''){
      this.refreshBillList();
    }
    this.bills = this.listFilter ? this.performFilter(this.listFilter): this.bills;
  }
}
