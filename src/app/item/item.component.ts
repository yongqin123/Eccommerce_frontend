import { Component } from '@angular/core';
import { HttpService } from '../http_service';
import { Item } from '../Item';

@Component({
  selector: 'app-item',
  imports: [],
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
}
