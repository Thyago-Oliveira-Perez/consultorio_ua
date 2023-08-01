import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  handleUserName(event: any) {
    this.username = event.target?.value;
  }

  handlePassword(event: any) {
    this.password = event.target?.value;
  }

  login() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}
