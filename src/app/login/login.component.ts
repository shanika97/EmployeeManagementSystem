import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  cleardata() {
    this.username = '';
    this.password = '';
  }

  Login() {
    let bodyData = {
      username: this.username,
      password: this.password,
    };

    this.http
      .post('http://localhost:8080/api/v1/employee/login', bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);

        if (resultData.msg == 'Username not found') {
          alert('username not found ');
        } else if (resultData.msg == 'Login Success') {
          this.router.navigateByUrl('/employee');
        }
        else {
          alert('Incorrect username or Password not match');
        }
      });
  }

  show(){

    this.router.navigateByUrl('/register');

}
}
