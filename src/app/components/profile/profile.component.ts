import { Component } from '@angular/core';
import { ApiService } from '../../users.api.service';
import { User } from '../../lib/types/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  users!: User[];
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    const url = 'users';
    this.apiService.get(url).subscribe((_users: any) => {
      this.users = _users;
    });
  }

}
