import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
    
  }

  getCartItems(): void {
    this.cartService.getCartItems().subscribe(
      (data: any[]) => {
        this.cart = data;
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product.product._id);

  }


  removeOneItem(cartItem: any): void {
    this.cartService.removeOneItem(cartItem.product._id);

  }

  getTotalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }
  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

 
  
}