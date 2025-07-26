import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { MenComponent } from './men/men.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ItemsComponent } from './items/items.component';
import { RegisterComponent } from './register/register.component';
import { WomenComponent } from './women/women.component';
import { ItemComponent } from './item/item.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
  },

  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },

  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },

  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',
  },

  {
    path: 'items',
    component: ItemsComponent,
    title: 'Items',
  },

  {
    path: 'men',
    component: MenComponent,
    title: 'Men',
  },

  {
    path: "women",
    component: WomenComponent,
    title: 'Women',
  },

  {
    path: "item",
    component: ItemComponent,
    title: "item",
  },

  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
  }
  
  ,];