import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/users.api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private apiService: ApiService,) { }
  login(loginForm: NgForm) {
    if (loginForm.valid) {
      const payload = {
        email: loginForm.value.email,
        password: loginForm.value.password
      };
      this.apiService.post("auth/login", payload).subscribe(() => {
        loginForm.reset();
      });
    }
  }
}
