import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  router = inject(Router);
  private cartService = inject(CartService);

  constructor(private fb: FormBuilder) {}

  clearCart() {
    this.cartService.clearCart();
  }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],

      presentAddress: this.fb.group({
        district: ['', Validators.required],
        upazila: ['', Validators.required],
        postOffice: ['', Validators.required],
        villageTown: ['', Validators.required],
        roadNo: [''],
        houseNo: ['']
      }),

      sameAsPresent: [false],

      permanentAddress: this.fb.group({
        district: ['', Validators.required],
        upazila: ['', Validators.required],
        postOffice: ['', Validators.required],
        villageTown: ['', Validators.required],
        roadNo: [''],
        houseNo: ['']
      })
    });

    this.checkoutForm.get('sameAsPresent')?.valueChanges.subscribe((isSame: boolean) => {
      const present = this.checkoutForm.get('presentAddress')?.value;
      if (isSame) {
        this.checkoutForm.get('permanentAddress')?.patchValue(present);
      } else {
        this.checkoutForm.get('permanentAddress')?.reset();
      }
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Form Data:', this.checkoutForm.value);
      this.checkoutForm.reset();
      this.clearCart();
      this.router.navigate(['/success']);
    } else {
      console.log('Form is invalid!');
    }
  }
}
