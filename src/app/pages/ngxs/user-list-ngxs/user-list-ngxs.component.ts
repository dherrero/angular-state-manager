import { Component, OnInit } from '@angular/core';
import { User } from '@models/user.state';
import { UserStoreNgxsService } from '@services/ngxs/user-store-ngxs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list-ngxs',
  templateUrl: './user-list-ngxs.component.html',
  styleUrls: ['./user-list-ngxs.component.scss']
})
export class UserListNgxsComponent implements OnInit {
  users$!: Observable<User[]>;
  /**
   * Class constructor
   */
  constructor(private storage: UserStoreNgxsService) {}

  ngOnInit(): void {
    this.users$ = this.storage.getUsers;
  }

  userId(_: number, user: User) {
    return user.userId;
  }
}
