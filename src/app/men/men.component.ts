import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http_service';
import { Item } from '../Item';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { NgFor } from '@angular/common';
import { Cart } from '../cart';

@Component({
  selector: 'app-men',
  imports: [CommonModule],
  templateUrl: './men.component.html',
  styleUrl: './men.component.css'
})
export class MenComponent implements OnInit{

  items : Item[] = [];
  

  constructor(public service: HttpService )  {}
    ngOnInit(): void {
      this.getMen();
      
  }
  public getMen() {
    this.service.getAllMenItems().subscribe(( data : Item[] ) => {
      this.items = data;
      console.log(data);
    })
      
    ;
  }

  addToCart(event: Event) {
    var button = event.target as HTMLButtonElement
    var name = document.getElementById(button.id + "_name")?.innerHTML;
    var price = document.getElementById(button.id + "_price")?.innerHTML;
    var gender = document.getElementById(button.id + "_gender")?.innerHTML;
    var quantity = (document.getElementById(button.id + "_quantity") as HTMLInputElement).value;
    price = price?.replace(/[^0-9.-]+/g, "");
    console.log(name);
    console.log(parseFloat(price ?? ""));
    console.log(parseInt(quantity));
    console.log(localStorage.getItem("email"));
    //var cart = new Cart(undefined,parseInt(button.id),localStorage.getItem("email")??"",parseInt(quantity));
    //this.service.addCart(cart).subscribe();
  }

  goToItem(event: Event) {
    var div = event.currentTarget as HTMLDivElement;
   
    localStorage.setItem("itemId", div.id);
    //console.log(div.id)
    //console.log(localStorage.getItem("itemId"));
    window.location.href = "/item";
  }

}
