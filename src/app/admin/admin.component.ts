import {ChangeDetectionStrategy, Component, signal, inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { HttpService } from '../http_service';
import { Item } from '../Item';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin',
  imports: [CommonModule,ReactiveFormsModule, MatButtonModule, MatFormField, MatInputModule, MatIconModule, MatSelectModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  


  selectedOption = 'Gender';
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  private formBuilder = inject(FormBuilder);
  private itemService = inject(HttpService);
  private route = inject(Router);
  imageBase64?:string;

  form = this.formBuilder.group({
    Id : [0],
    name : ['', {validators: [Validators.required]}],
    path : new FormControl<null | File>(null, {validators: [Validators.required]}),
    gender : ['', {validators: [Validators.required]}],
    price : [0, {validators: [Validators.required]}],


  })

  imageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      this.form.patchValue({path: file});

      this.toBase64(file).then((value: string) => this.imageBase64 = value).catch(error=> console.log(error));
    }
  }

  toBase64(file: File) : Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    })
  }

  saveChanges() {
    const item = this.form.value as Item;
    
    const formData = new FormData();
    formData.append('Name', item.name);
    formData.append('Gender', item.gender);
    formData.append('path', item.path);
    formData.append('Price', item.price.toString());
    
    this.itemService.addItem(formData).subscribe();
    localStorage.setItem("add", "add");
    window.location.href = "/admin";
    
  }

  viewItem() {
    window.location.href = "/items";
  }

  total : number = 0;

  items : Item[] = [];
  

  constructor(public service: HttpService )  {}
   ngOnInit(): void {
  this.getItems();

  
    if (localStorage.getItem("add") == "add") {
      const alert = document.getElementById("alert") as HTMLDivElement;
      if (alert) {
        alert.style.display = "";
        alert.classList.add("disappearing");
        setTimeout(() => {
          alert.classList.remove("disappearing");
          alert.style.display = "none";
        }, 4000);
      }
      localStorage.setItem("add", "");
    }
}

  
  getItems() {
  this.service.getAllItems().subscribe((data: Item[]) => {
    this.items = data;
    console.log(this.items);

    for (let i = 0; i < this.items.length; i++) {
      this.total += 1;
      console.log("1");
    }
  });
}

}
