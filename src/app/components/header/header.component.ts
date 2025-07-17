import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartService = inject(CartService);

  showSearch = signal(false);

  searchControl = new FormControl('');
  
  openSearch() {
    this.showSearch.set(true);
  }

  closeSearch() {
    this.showSearch.set(false);
  }

  submitSearch() {
    const query = this.searchControl.value?.trim();
    if (query) {
      console.log('Searching for:', query);
      this.searchControl.setValue('');
      this.showSearch.set(false);
    }
  }
}
