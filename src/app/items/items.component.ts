import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, signal, inject} from '@angular/core';
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
import { ItemStringPath } from '../itemStringPath';
//import { ItemStringPath } from '../ItemStringPath.ts';

@Component({
  selector: 'app-items',
  imports: [CommonModule,ReactiveFormsModule, MatButtonModule, MatFormField, MatInputModule, MatIconModule, MatSelectModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  items : Item[] = [];
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
    id : [0],
    name : ['', {validators: [Validators.required]}],
    path : new FormControl<null | File | string>(null, {validators: [Validators.required]}),
    gender : ['', {validators: [Validators.required]}],
    price : [0, {validators: [Validators.required]}],


  })

  editItem(item: any) {
  this.form.patchValue({
    id: item.id,
    name: item.name,
    gender: item.gender,
    price: item.price,
    path: item.path
  });

  // Optional: If you want to show the existing image
  this.imageBase64 = 'https://localhost:7277/' + item.gender + '/' + item.path;
}

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
  const id = this.form.get('id')?.value ?? 0;
  const name = this.form.get('name')?.value ?? "";
  const gender = this.form.get('gender')?.value ?? "";
  const price = this.form.get('price')?.value ?? 0;

  const pathControlValue = this.form.get('path')?.value;
  console.log("id " +id);
  console.log("n " +name);
  console.log("g " +gender);
  console.log("p " +price);
  const isFile = pathControlValue instanceof File;
  const path = isFile ? "" : pathControlValue ?? ""; // only use path if it's a string

  const itemWithNoChangeInImage = new ItemStringPath(id, name, gender, path, price);
  console.log("id " +id);
  console.log("n " +name);
  console.log("g " +gender);
  console.log("p " +price);
  if (isFile) {
    const formDataWithChangeInImage = new FormData();
    formDataWithChangeInImage.append('Id', id.toString());
    formDataWithChangeInImage.append('Name', name);
    formDataWithChangeInImage.append('Gender', gender);
    formDataWithChangeInImage.append('Path', pathControlValue); // this is the File
    formDataWithChangeInImage.append('Price', price.toString());

    this.itemService.updateItem(formDataWithChangeInImage, id).subscribe({
      
    });
  } else {
    this.itemService.updateItemWithNoChangeInImage(itemWithNoChangeInImage, id).subscribe({
      
    });
  }

  window.location.href = "/items";
}
  
    constructor(public service: HttpService )  {}
      ngOnInit(): void {
        this.getMen();
        
    }
    public getMen() {
      this.service.getAllItems().subscribe(( data : Item[] ) => {
        this.items = data;
        console.log(data);
      })
        
      ;
    }

    deleteItem(event: Event) {
      const button = event.target as HTMLButtonElement;
      var id :number = + button.id;
      console.log(id);
      this.service.deleteItem(id).subscribe();
      window.location.href = "/items";
    }

    
    
}
