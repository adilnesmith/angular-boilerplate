import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../users.api.service';
import { User } from '../../lib/types/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  users!: User[];
  selectedUser: any;
  editMode = false;
  constructor(private apiService: ApiService,) { }
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
    this.apiService.get("users").subscribe((_users: any) => {
      this.users = _users;
    });
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
}
