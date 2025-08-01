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

  minusQuantity(event: Event) {
    //var quantity = document.getElementById("quantity") as HTMLButtonElement
    var minus = event.target as HTMLButtonElement;
    var id = parseInt(minus.id.split("_")[0]);
    var itemId = parseInt(minus.id.split("_")[1]);
    var input = document.getElementById(id.toString() + "_" + itemId.toString()) as HTMLInputElement;
    var quantity = parseInt(input.value);
    console.log(quantity);
    if (quantity > 1) {
      input.value = (quantity - 1).toString();
      
      var cart = new Cart(id,itemId,localStorage.getItem("email")??"",parseInt(input.value),"xs");
      this.service.updateCart(cart,id).subscribe();
      window.location.href = "/cart";
    }
    
  }

  addQuantity() {
    var quantity = document.getElementById("quantity") as HTMLButtonElement
    if (parseInt(quantity.value) < 10) {
      quantity.value = (parseInt(quantity.value) + 1).toString();
    }
    
  } 

  public getCartsEmail() {
    this.service.getAllCartsEmail(localStorage.getItem("email")??"").subscribe(( data : Cart[] ) => {
      this.carts = data;
      this.carts.forEach(cart => {
      this.service.getItem(cart.itemId).subscribe((item: Item) => {
        this.itemMap[cart.itemId] = item;
        this.totalPrice += item.price * cart.quantity;
        (document.getElementById("size") as HTMLSelectElement). value = cart.size;
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
  
  public updateCartThroughInput(event: Event) {
    var input = event.target as HTMLInputElement;
    console.log("Update by" + input.value);
    var id = parseInt(input.id.split("_")[0]);
    var itemId = parseInt(input.id.split("_")[1]);
    var quantity = parseInt(input.value);
    var cart = new Cart(id,itemId,localStorage.getItem("email")??"",quantity,"xs");
    this.service.updateCart(cart,id).subscribe();
    window.location.href = "/cart";
  }
}
