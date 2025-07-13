import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Items } from '../models/Items.model';
import { ProductsService } from '../core/services/products.service';

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

  product = signal<Items | null>(null);
  quantity = signal<number>(1);

  onQuantityIncrease() {
    this.quantity.update(value => value + 1);
  }

  onQuantityDecrease() {
    if (this.quantity() > 1) {
      this.quantity.update(value => value - 1);
    }
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id !== null) {
      this.productService.getById(id).subscribe({
        next: (data: Items) => {
          this.product.set(data);
          console.log('Product details fetched:', data);
        },
        error: (err) => {
          console.error('Failed to fetch product details', err);
        }
      });
    }
  }
}
