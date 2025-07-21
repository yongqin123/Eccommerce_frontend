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
import { User } from '../User';
@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule, MatButtonModule, MatFormField, MatInputModule, MatIconModule, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private userService = inject(HttpService);
  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    id : [0],
    name : ['', {validators: [Validators.required]}],
    email : ['', {validators: [Validators.required]}],
    password : ['', {validators: [Validators.required]}],
    phone : ['', {validators: [Validators.required]}],
    address : ['', {validators: [Validators.required]}],
    city : ['', {validators: [Validators.required]}],
    accountType : ['', {validators: [Validators.required]}],
  })

  saveChanges() {
    const user = this.form.value as User;
    
    const formData = new FormData();

    formData.append('Name', user.name);
    formData.append('Email', user.email);
    formData.append('Password', user.password);
    formData.append('Phone', user.phone);
    formData.append('Address', user.address);
    formData.append('City', user.city);
    formData.append('AccountType', 'customer');
    
    this.userService.addUser(formData).subscribe({
  next: res => {
    console.log("User added", res);
    window.location.href = "/";
  },
  error: err => {
    console.error("Error adding user", err);
  }
});
    
    
  }
}
