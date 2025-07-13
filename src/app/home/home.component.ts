import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'eccommerce';

  


  item_name :string[] = ["Green Shirt", "Long Sleeve Shirt", "jacket"];

  item_pic :string[] = ["item0.png", "item1.png", "item2.png"];
  item_price : string[] = ["$15.00", "$20.00", "$30.00"]
  one: string = '';
  two: string = '';
  three: string = '';
  quantities = [0, 0, 0];

  oneArray: string[] = [];
  twoArray: string[] = [];
  threeArray: string[] = [];

  addToCart(index: number) {
    const item = {
      name: this.item_name[index],
      price: this.item_price[index],
      quantity: this.quantities[index]
    };

    

     
  }

  
  
}