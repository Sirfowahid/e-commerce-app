import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Items } from '../../models/Items.model';

import { ProductsService } from '../../core/services/products.service'; 

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private productService = inject(ProductsService); 

  items = signal<Items[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    const subscription = this.productService.getAll().subscribe({
      next: (data: Items[]) => {
        this.items.set(data);
        this.loading.set(false);
        console.log(data);
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading.set(false);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
