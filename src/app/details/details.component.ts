import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Items } from '../models/Items.model';
import { ProductsService } from '../core/services/products.service';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  private cartService = inject(CartService);
  private router = inject(Router);

  product = signal<Items | null>(null);
  quantity = signal<number>(1);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id !== null) {
      this.productService.getById(id).subscribe({
        next: (data: Items) => this.product.set(data),
        error: (err) => console.error('Failed to fetch product details', err)
      });
    }
  }

  onQuantityIncrease() {
    this.quantity.update(value => value + 1);
  }

  onQuantityDecrease() {
    if (this.quantity() > 1) {
      this.quantity.update(value => value - 1);
    }
  }

  addToCart() {
    if (this.product()) {
      this.cartService.addToCart(this.product()!, this.quantity());
    }
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
