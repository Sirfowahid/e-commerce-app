import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']  
})
export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`https://fakestoreapi.com/products/${id}`).subscribe({
        next: (data) => {
          console.log('Product details:', data);
        },
        error: (err) => {
          console.error('Failed to fetch product details', err);
        }
      });
    }
  }
}
