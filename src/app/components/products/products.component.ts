import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HttpClient } from '@angular/common/http';
import { DestroyRef } from '@angular/core';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  
  items = signal<Product[]>([]); // Will store fetched products

  ngOnInit(): void {
    const subscription = this.httpClient.get<Product[]>('https://fakestoreapi.com/products').subscribe({
      next: (data: Product[]) => {
        this.items.set(data); // Store fetched data
        console.log(data);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
