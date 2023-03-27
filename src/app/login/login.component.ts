import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { USER_DATA } from '../users/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  valid = true;
  isLoggedIn = false;
  users = [];
  login = new User('', '');
  constructor(private routers: Router, private apiService: ApiService) { }

  ngOnInit() {
    sessionStorage.removeItem("isLoggedIn");
    this.getUsers();
  }

  getUsers() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      this.routers.navigateByUrl("/my-task");
      return;
    }
    this.users = USER_DATA;
  }

  onSubmit(e) {
    this.valid = true;
    var name = this.login.username;
    var password = this.login.password;
    sessionStorage.setItem("username", this.login.username);
    var user = this.users.filter(
      user => user.userName === name && user.password === password
    )[0];
    if (user) {
      this.isLoggedIn = true;
      sessionStorage.setItem("isLoggedIn", JSON.stringify(this.isLoggedIn));
      this.routers.navigateByUrl("/my-task");
    } else {
      this.isLoggedIn = false;
      sessionStorage.setItem("isLoggedIn", JSON.stringify(this.isLoggedIn));
      this.valid = false;
    }
    e.preventDefault();
  }

}


export class User {

  constructor(public username: string, public password: string) {

  }
}
