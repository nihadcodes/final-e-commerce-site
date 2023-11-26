import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) {}
  ngOnInit(): void {
    
    this.seller.reloadSeller()

  }

  signUp(data:SignUp): void {
    this.seller.userSignUp(data)
  }


}
