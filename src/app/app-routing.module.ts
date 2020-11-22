import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent} from './account-create/account.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AccountViewComponent } from './account-view/account-view.component';
import {AccountListComponent} from './account-list/account-list.component';
import { ViewAllCustomersComponent } from './view-all-customers/view-all-customers.component';
import { ViewBillsByAccountComponent } from './view-bills-by-account/view-bills-by-account.component';
import { BillComponent } from './component/bill/bill.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { EditBillComponent } from './edit-bill/edit-bill.component';


const routes: Routes = [
  {path: 'accounts/editAccount/:id', component: EditAccountComponent},
  {path: 'account/:accountId/bills/post', component: CreateBillComponent},
  {path: 'accounts/:Id/create-transaction', component: CreateTransactionComponent},
  {path: 'home', component: HomeComponent},
  {path: 'accounts/:accountId/post', component: CreateTransactionComponent},
  {path: 'transactions/:transactionId', component: ViewTransactionComponent},
  {path: 'transactions', component: AllTransactionsComponent},
  {path: 'customers/new', component: CreateCustomerComponent},
  {path: 'customers/:id/create-accounts', component: AccountComponent},
  {path: 'customers/:id/editCustomer', component: EditCustomerComponent},
  {path: 'customers/:id', component: ViewCustomerComponent},
  {path: 'accounts/:id', component: AccountViewComponent},
  {path: 'bills/:billId/edit-bill', component: EditBillComponent},
  {path: 'bills/:billId', component: ViewBillComponent},
  {path: 'accounts/:accountId/bills', component: ViewBillsByAccountComponent},
  {path: 'bills', component: BillComponent},
  {path: 'customers', component: ViewAllCustomersComponent},
  {path: 'accounts', component: AccountListComponent},
  {path: "", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
imports: [CommonModule, [RouterModule.forRoot(routes)]],
  exports: [RouterModule]
})
export class AppRoutingModule { }
