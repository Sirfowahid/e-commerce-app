import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Items} from '../../models/Items.model';

interface CartItem {
  product: Items;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  
  // Public observables
  cartItems$ = this.cartItems.asObservable();
  subtotal$ = this.cartItems$.pipe(
    map(items => items.reduce(
      (total, item) => total + (item.product.price * item.quantity), 0
    ))
  );
  totalItems$ = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + item.quantity, 0))
  );

  // Add item to cart
  addToCart(product: Items, quantity: number = 1): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }

    this.cartItems.next([...currentItems]);
  }

  // Remove item from cart
  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems);
  }

  // Update item quantity
  updateQuantity(productId: number, newQuantity: number): void {
    if (newQuantity < 1) return;

    const currentItems = this.cartItems.getValue();
    const itemToUpdate = currentItems.find(item => item.product.id === productId);

    if (itemToUpdate) {
      itemToUpdate.quantity = newQuantity;
      this.cartItems.next([...currentItems]);
    }
  }

  // Clear cart
  clearCart(): void {
    this.cartItems.next([]);
  }
}