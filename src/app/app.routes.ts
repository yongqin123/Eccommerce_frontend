import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { MenComponent } from './men/men.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },

  {
    path: 'men',
    component: MenComponent,
    title: 'Men',
  },


  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
  }
  
  ,];