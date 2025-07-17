import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'product/:id', component: DetailsComponent},
    { path: 'cart', component: CartComponent},
    { path: 'checkout', component: CheckoutComponent},
    { path: 'success', component: SuccessComponent},
];
