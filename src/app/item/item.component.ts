import { Component } from '@angular/core';
import { HttpService } from '../http_service';
import { Item } from '../Item';
import { CommonModule } from '@angular/common';

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
}
