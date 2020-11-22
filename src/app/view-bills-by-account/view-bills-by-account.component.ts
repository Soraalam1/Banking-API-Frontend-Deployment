import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from '../models/bill';
import { BillService } from '../service/bill.service';
import { AccountService } from '../service/account.service';
import { Account } from '../models/account';
import { filter } from 'minimatch';

@Component({
  selector: 'app-view-bills-by-account',
  templateUrl: './view-bills-by-account.component.html',
  styleUrls: ['./view-bills-by-account.component.css']
})
export class ViewBillsByAccountComponent implements OnInit {

  bills: Bill[];
  account= new Account;
  accountId = this.activatedRoute.snapshot.params[`accountId`];
  filteredBills: Bill[];
  private _listFilter: string;

  constructor(private billService: BillService, private router:Router, private activatedRoute: ActivatedRoute, private accountService: AccountService) {
    this.filteredBills = this.bills;
    this._listFilter
  }

  ngOnInit(): void {
    this.getAllBillsByAccount();
    this.getAccountInfo();
    this.calculateMonthlyTotal();
    this.refreshBillList();
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
     this._listFilter = value ;
     if(this._listFilter === ''){
       this.refreshBillList();
     }
     this.bills = this.listFilter ? this.performFilter(this.listFilter): this.bills;
   }

  refreshBillList(){
    this.billService.getAllBillsByAccount(this.accountId).subscribe(
      data => {
        this.bills = data.data;
        console.log(data)
      }
    );
  }

  getAllBillsByAccount(){
    const id = this.activatedRoute.snapshot.params[`accountId`];
    this.billService.getAllBillsByAccount(id).subscribe(
      response =>{
        this.bills = response.data;
      }
    );
  }

  goToCreateBill(){
    const id = this.activatedRoute.snapshot.params[`accountId`];
      this.router.navigate(['account/' + id + '/bills/post']);
    }

    getAccountInfo(){
      const id = this.activatedRoute.snapshot.params[`accountId`];
      this.accountService.getAccountById(id).subscribe(
        response =>{
          this.account = response.data;
        },
      error => console.log(error)
      );
    }
    calculateMonthlyTotal(){
      let totalMonthly = 0;
      for(let currentBill of this.bills){
       totalMonthly += currentBill.paymentAmount;
      }
      return totalMonthly;
    }

  }

