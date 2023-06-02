import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localStorage.service';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  canActivate(): boolean {
    const userJson = this.localStorageService.get("user");
    const userObj = userJson !== null ? JSON.parse(userJson) : null;

    if (userObj?.loggedIn) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
