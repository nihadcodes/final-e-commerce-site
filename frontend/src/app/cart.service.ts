
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:4000/products';
  private cartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cart$: Observable<any[]> = this.cartSubject.asObservable();

  constructor(private productService: ProductService, private http: HttpClient) {}

  getCartItems(): Observable<any[]> {
    return this.cart$;
  }

  addToCart(productId: string): void {
    try {
  
      this.productService.getProductQuantity(productId).subscribe(
        (quantityFromDatabase: number) => {
  
          const currentCart = this.cartSubject.value;
          const existingItem = currentCart.find((item) => item.product._id === productId);
  
          if (existingItem) {
            this.changeQuantity(productId, existingItem.quantity + 1);
          } else {
            this.cartSubject.next([...currentCart, { product: { _id: productId }, quantity: 1 }]);
          }
          this.updateQuantityInDatabase(productId, quantityFromDatabase - 1);
        },
        (error) => {
          console.error('Error fetching product quantity:', error);
        }
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
  
  
  removeFromCart(productId: string): void {
    const currentCart = this.cartSubject.value;
    const removedItem = currentCart.find((item) => item.product._id === productId);

    if (removedItem) {
      this.productService.getProductQuantity(productId).subscribe(
        (quantityFromDatabase: number) => {
          const newQuantity = Math.max(0, quantityFromDatabase + removedItem.quantity);
          this.updateQuantityInDatabase(productId, newQuantity);

          const updatedCart = currentCart.filter((item) => item.product._id !== productId);
          this.cartSubject.next([...updatedCart]);
        },
        (error) => {
          console.error('Error fetching product quantity:', error);
        }
      );
    }
  }

  removeOneItem(productId: string): void {
    try {

    this.productService.getProductQuantity(productId).subscribe(
        (quantityFromDatabase: number) => {
  
          const currentCart = this.cartSubject.value;
          const existingItem = currentCart.find((item) => item.product._id === productId);

     if (existingItem) {
   
            this.changeQuantity(productId, existingItem.quantity - 1);
          } else {

            this.cartSubject.next([...currentCart, { product: { _id: productId }, quantity: 1 }]);
          }
  
          this.updateQuantityInDatabase(productId, quantityFromDatabase + 1);
        },
        (error) => {
          console.error('Error fetching product quantity:', error);
        }
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  changeQuantity(productId: string, newQuantity: number): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.map((item) => {
      if (item.product._id === productId) {
        item.quantity = newQuantity;
      }
      return item;
    });

    this.cartSubject.next([...updatedCart]);
  }


  getTotalQuantity(): number {
    return this.cartSubject.value.reduce((total, item) => total + item.quantity, 0);
  }

  updateQuantityInDatabase(productId: string, quantity: number): void {
    this.productService.updateQuantityInDatabase(productId, quantity).subscribe(
      () => {
      },
      (error) => console.error('Error updating quantity in the database:', error)
    );
  }

}
