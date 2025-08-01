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
    path : new FormControl<null | File>(null, {validators: [Validators.required]}),
    gender : ['', {validators: [Validators.required]}],
    price : [0, {validators: [Validators.required]}],


  })

  editItem(item: any) {
  this.form.patchValue({
    id: item.id,
    name: item.name,
    gender: item.gender,
    price: item.price
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
    const item = this.form.value as Item;
    
    const formData = new FormData();
    formData.append('Id', item.id.toString());

    formData.append('Name', item.name);
    formData.append('Gender', item.gender);
    formData.append('path', item.path as File);
    formData.append('Price', item.price.toString());
    
    this.itemService.updateItem(formData, item.id).subscribe({
  next: (response) => {
    console.log('✅ Success:', response);
  },
  error: (err) => {
    console.error('❌ Error:', err);
  },
  complete: () => {
    console.log('🔁 Request completed.');
  }
});
    
    //window.location.href = "/items";
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
