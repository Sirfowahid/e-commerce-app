import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Items } from '../models/Items.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  public quantity = signal<number>(1);

  product = signal<Items | null>(null);

  onQuantityIncrease(){
    this.quantity.update(value => value + 1);
  }

  onQuantityDecrease(){
    if (this.quantity() > 1) {
      this.quantity.update(value => value - 1);
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<Items>(`https://fakestoreapi.com/products/${id}`).subscribe({
        next: (data) => {
          
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
