import { Component } from '@angular/core';
import { HttpService } from '../http_service';
import { Item } from '../Item';
import { CommonModule } from '@angular/common';
import { Cart } from '../cart';


@Component({
  selector: 'app-item',
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  item : Item | undefined;

  ngOnInit(): void {
    this.getItem();
  }
  constructor(public service: HttpService )  {}
  getItem() {
    this.service.getItem(parseInt(localStorage.getItem("itemId")??"")).subscribe(( data :  Item) => {
          this.item = data;
          console.log(data);
        })
          
        ;
  }
  minusQuantity() {
    var quantity = document.getElementById("quantity") as HTMLButtonElement
    if (parseInt(quantity.value) > 1) {
      quantity.value = (parseInt(quantity.value) - 1).toString();
    }
    
  }

  addQuantity() {
    var quantity = document.getElementById("quantity") as HTMLButtonElement
    if (parseInt(quantity.value) < 10) {
      quantity.value = (parseInt(quantity.value) + 1).toString();
    }
    
  }

  addToCart(event: Event) {
      var button = event.target as HTMLButtonElement
      var name = document.getElementById("name")?.innerHTML;
      var price = document.getElementById("price")?.innerHTML;
      var size = (document.getElementById("size") as HTMLSelectElement).value;
      var quantity = (document.getElementById("quantity") as HTMLInputElement).value;
      price = price?.replace(/[^0-9.-]+/g, "");
      
      console.log(name);
      console.log(parseFloat(price ?? ""));
      console.log(parseInt(quantity));
      console.log(size);
      console.log(localStorage.getItem("email"));
      var cart = new Cart(undefined,parseInt(button.id),localStorage.getItem("email")??"",parseInt(quantity),size);
      this.service.addCart(cart).subscribe();
      
    }
}
