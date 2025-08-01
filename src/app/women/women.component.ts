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
  templateUrl: './women.component.html',
  styleUrl: './women.component.css'
})
export class WomenComponent implements OnInit{

  items : Item[] = [];
  

  constructor(public service: HttpService )  {}
    ngOnInit(): void {
      this.getWomen();
      
  }
  public getWomen() {
    this.service.getAllWomanItems().subscribe(( data : Item[] ) => {
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

}
