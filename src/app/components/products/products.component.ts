import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products = [
    { id: 1, name: 'Product 1', price: 100, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 200, image: 'product2.jpg' },
    { id: 3, name: 'Product 3', price: 300, image: 'product3.jpg' },
    { id: 4, name: 'Product 4', price: 400, image: 'product4.jpg' }
  ];
  
}
