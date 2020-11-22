import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AccountComponent } from './account-create/account.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { HttpClientModule } from '@angular/common/http';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccountViewComponent } from './account-view/account-view.component';
import { AccountListComponent } from './account-list/account-list.component';
import { HomeComponent } from './home/home.component';
import {ViewBillComponent} from './view-bill/view-bill.component';
import {BillComponent} from './component/bill/bill.component';
import { ViewAllCustomersComponent } from './view-all-customers/view-all-customers.component';
import { ViewBillsByAccountComponent } from './view-bills-by-account/view-bills-by-account.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { EditBillComponent } from './edit-bill/edit-bill.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    BillComponent,
    CreateTransactionComponent,
    ViewTransactionComponent,
    ViewBillComponent,
    ViewBillsByAccountComponent,
    AccountViewComponent,
    EditCustomerComponent,
    ViewCustomerComponent,
    AccountListComponent,
    HomeComponent,
    TransactionListComponent,
    CustomerListComponent,
    ViewBillsByAccountComponent,
    AllTransactionsComponent,
    ViewAllCustomersComponent,
    CreateCustomerComponent,
    CreateBillComponent,
    AllTransactionsComponent,
    EditAccountComponent,
    EditBillComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
