import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/users.api.service';
import { User } from 'src/app/lib/types/user';
import { LocalStorageService } from 'src/app/services/localStorage.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  users!: User[];
  selectedUser: any;
  editMode = false;
  showChangePasswordButton: boolean = false;
  showChangePasswordFields: boolean = false;
  constructor(private apiService: ApiService, private localStorageService: LocalStorageService) { }
  ngOnInit() {
    this.fetchUserList();
  }
  addUser(userForm: NgForm) {
    this.editMode = false;
    if (userForm.valid) {
      const payload = {
        fullName: userForm.value.fullName,
        email: userForm.value.email,
        age: userForm.value.age,
        password: userForm.value.password
      };

      this.apiService.post("users", payload).subscribe(() => {
        userForm.reset();
        this.fetchUserList();
      });
    }
  }
  fetchUserList() {
    this.apiService.get("users?sort=fullName&order=asc&page=1&limit=10").subscribe(
      (response: any) => {
        this.users = response.data.items;
      },
      (error: any) => {
        if (error.status === 401) {
          const userJson = this.localStorageService.get("user");
          const userObj = userJson !== null ? JSON.parse(userJson) : null;
          let refresh_token = userObj.refresh_token
          let payload = {
            refresh_token: refresh_token
          }
          this.apiService.post("auth/refresh-token", payload).subscribe((response: any) => {
            if (response?.success) {
              let a = userObj.access_token = response?.access_token
              this.localStorageService.set("user", JSON.stringify(userObj))
              this.fetchUserList()
            }
          });
        }
      }
    );
  }

  populateFields(user: User, userForm: NgForm) {
    this.editMode = true;
    this.selectedUser = user;
    userForm.setValue({
      fullName: user.fullName,
      email: user.email,
      age: user.age,
      password: user.password
    });
    userForm.controls['password']?.disable();
    this.showChangePasswordButton = true
    this.editUser(userForm);
  }
  editUser(userForm: NgForm) {
    if (userForm.valid) {
      const payload = {
        fullName: userForm.value.fullName,
        email: userForm.value.email,
        age: userForm.value.age,
        password: userForm.value.password
      };
      if (userForm.touched) {
        this.apiService.put("users/" + this.selectedUser?._id, payload).subscribe(() => {
          this.fetchUserList();
        });
      }
    }
  }
  deleteUser(id: User["_id"]) {
    let confirmAction = confirm("Are you sure to delete this user?");
    if (confirmAction) {
      this.apiService.delete("users/" + id).subscribe(() => {
        this.fetchUserList();
        alert("user removed");
      });
    }
  }
  changePassword(userForm: NgForm) {
    const payload = {
      userId: this.selectedUser?._id,
      currentPassword: userForm.value.currentPassword,
      newPassword: userForm.value.newPassword
    };
    this.apiService.post("users/change-password", payload).subscribe((response) => {
      if (response) {
        console.log(response);
      }
    });
  }
}
