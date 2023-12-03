import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private authService: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.authService.authStatus.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.cartService.cart$.subscribe((cart) => {
      this.totalQuantity = this.cartService.getTotalQuantity();
      
    });
  }

  onLogout(): void {
    this.authService.logout().subscribe(
      () => {
        this.authService.setAuthStatus(false);
      },
      (error) => {
        console.error('Logout error', error);
      }
    );
  }
}
