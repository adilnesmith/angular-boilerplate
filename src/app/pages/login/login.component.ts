import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { ApiService } from 'src/app/services/users.api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private apiService: ApiService, private localStorageService: LocalStorageService, private router: Router) { }
  login(loginForm: NgForm) {

    if (loginForm.valid) {
      const payload = {
        email: loginForm.value.email,
        password: loginForm.value.password
      };
      this.apiService.post("auth/login", payload).subscribe((response: any) => {
        if (response?.access_token) {
          let user = {
            loggedIn: true,
            access_token: response?.access_token,
            refresh_token: response?.refresh_token
          }
          this.localStorageService.set("user", JSON.stringify(user))
        }
        this.router.navigate(['/dashboard']);
        loginForm.reset();
      });
    }
  }
}
