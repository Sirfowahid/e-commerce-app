import { Component, Input } from '@angular/core';
import { Product } from '../products/products.component';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor() {
    
  }
}
