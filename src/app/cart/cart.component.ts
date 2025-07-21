import { RouterOutlet } from '@angular/router';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http_service';
import { Item } from '../Item';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { NgFor } from '@angular/common';
import { Cart } from '../cart';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  carts : Cart[] = [];
  item : Item | undefined;
  itemMap: { [key: number]: Item } = {};
  totalPrice: number = 0;
  constructor(public service: HttpService )  {}
    ngOnInit(): void {
      console.log(localStorage.getItem("email")??"");
      this.getCartsEmail();
      
      
      
  }
  public getCartsEmail() {
    this.service.getAllCartsEmail(localStorage.getItem("email")??"").subscribe(( data : Cart[] ) => {
      this.carts = data;
      this.carts.forEach(cart => {
      this.service.getItem(cart.itemId).subscribe((item: Item) => {
        this.itemMap[cart.itemId] = item;
        this.totalPrice += item.price * cart.quantity;
      });
    });
    })
  }

  public getItemById(id: number) {
    this.service.getItem(id).subscribe((data: Item) => {
      this.item = data;
    } )
  }

  public deleteCart() {
    console.log("test");  }
  
  public updateCart(event: Event) {
    var input = event.target as HTMLInputElement;
    console.log("Update by" + input.value);
    var id = parseInt(input.id.split("_")[0]);
    var itemId = parseInt(input.id.split("_")[1]);
    var quantity = parseInt(input.value);
    var cart = new Cart(id,itemId,localStorage.getItem("email")??"",quantity);
    this.service.updateCart(cart,id).subscribe();
    window.location.href = "/cart";
  }
}
