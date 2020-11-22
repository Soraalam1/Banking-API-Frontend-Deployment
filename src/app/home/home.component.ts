import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  goToAccountListPage(){
    this.router.navigate(['/accounts']);
  }

  goToTransactionListPage(){
    this.router.navigate(['/transactions']);
  }

  goToCustomersListPage(){
    this.router.navigate(['/customers']);
  }

  goToBillsListPage(){
    this.router.navigate(['/bills']);
  }
}
