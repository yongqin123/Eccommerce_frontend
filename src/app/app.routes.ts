import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    title: 'Home page',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
  }
  
  ,];