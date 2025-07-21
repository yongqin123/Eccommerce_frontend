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
  selector: 'app-admin',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormField, MatInputModule, MatIconModule, MatSelectModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

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
    window.location.href = "/admin";
  }

  viewItem() {
    window.location.href = "/items";
  }


}
