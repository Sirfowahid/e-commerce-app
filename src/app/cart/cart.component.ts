import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../core/services/cart.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private cartService = inject(CartService);
  cartItems$ = this.cartService.cartItems$;
  subtotal$ = this.cartService.subtotal$;
  private router = inject(Router);

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  gotoCheckout() {
    this.router.navigate(['/checkout']);
  }

  gotoShopping(){
    this.router.navigate(['/']);
  }
}