import { Component, inject, OnInit } from '@angular/core';
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
  products = [
    { id: 1, name: 'Product 1', price: 100, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 200, image: 'product2.jpg' },
    { id: 3, name: 'Product 3', price: 300, image: 'product3.jpg' },
    { id: 4, name: 'Product 4', price: 400, image: 'product4.jpg' }
  ];

  ngOnInit(): void {
    const subscription = this.httpClient.get<Product[]>('https://fakestoreapi.com/products').subscribe({
      next : (data:any) =>{
        console.log(data);
        this.products = data
      }
    })

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
      
    })
  }

}
