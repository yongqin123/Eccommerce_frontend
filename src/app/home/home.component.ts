import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../http_service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ],
  templateUrl: './home.component.html',
  providers: [HttpService] ,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public service: HttpService )  {

  }
  

  


  
}