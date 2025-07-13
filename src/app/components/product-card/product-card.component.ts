import { Component, Input } from '@angular/core';
import { Items } from '../../models/Items.model';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Items;

  constructor() {
    
  }
}
