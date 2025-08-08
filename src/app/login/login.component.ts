import { Component } from '@angular/core';
import { User } from '../User';
import { HttpService } from '../http_service';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  users : User[] = [];
  
  constructor(public service: HttpService )  {}
  timer() {}
  login(email: string, password: string) {
  this.service.getUserByEmailAndPassword(email, password).subscribe((data: User[]) => {
    this.users = data;
    if (this.users.length == 1) {
      localStorage.setItem("email", this.users[0].email);
      console.log(localStorage.getItem("email"));
      if (this.users[0].accountType == "customer") {
        window.location.href = "/home";
      } else if (this.users[0].accountType == "admin") {
        window.location.href = "/admin";
      }
    } else {
      const alert = document.getElementById("alert") as HTMLDivElement;
      alert.style.display = "";
      alert.classList.add("disappearing");
      setTimeout(function () {
        alert.classList.remove("disappearing");
        alert.style.display = "none";
      }, 3000); // 2000ms = 2 seconds

      
     // alert.style.animation = "myAnimation 2s"
      console.log("Invalid login.");
    }
  });
}

  Register() {
    window.location.href = "/register";
  }
}
